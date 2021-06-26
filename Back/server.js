"use strict";

/** requirement
 * User Alex should have access (able to see) all 3 resources upon authentication.
 * User Bob should have access (able to see) only resource 2
 * User Matt should have access (able to see) resource 1 and 3 only.
 */
//permissions are set by roles in on Auth0 dashboard Role-Based Access Control (RBAC)
//resources available, assume each resource is mapped to a role
//The content of the messages are NOT stored in Auth0, and a user may have more than one role
//assume this is a redis database
const resources = {
  "read:message1": "Message 1: visible to Alex and Matt",
  "read:message2": "Message 2: visible to Alex and Bob",
  "read:message3": "Message 3: visible to Alex and Matt",
};

require("dotenv").config(); //load additional setting into environment
const express = require("express");
const http = require("http");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const jwtAuthz = require("express-jwt-authz");
const jwt_decode = require("jwt-decode");

const app = express();
const appUrl = `http://localhost:${process.env.PORT}`;

app.use(morgan("common"));
app.use(helmet());

//using cors because request is from a different domain
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

//verify the jwt token
const authorizeAccessToken = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.domain}/.well-known/jwks.json`,
  }),
  audience: "https://quickstarts/api",
  issuer: `https://${process.env.domain}/`,
  algorithms: ["RS256"],
});

//verify the token has sufficient permission to visit this endpoint (at least one from the read messages group)
const checkPermissions = jwtAuthz(
  ["read:message1", "read:message2", "read:message3"],
  {
    customScopeKey: "permissions",
  }
);

//Check the token is valid and has at least one read message permission
app.get(
  "/api/getMessages",
  authorizeAccessToken,
  checkPermissions,
  (req, res) => {
    //use this to check token on jwt.io
    var authToken = req.headers.authorization;
    console.log(authToken);
    var message = getResourceFromAuthenticationHeader(authToken);

    //return response (200) to sender with messages
    res.status(200).json({
      messages: message,
    });
  }
);

/**
 * Get the messages available to this token, no checking is required since its done already
 * @param {JWTToken} token the token in the authentication header
 * @return {string}        string representation of messages available to this token
 */
function getResourceFromAuthenticationHeader(token) {
  const seperator = "|"; //seperator set by frontend
  var longstring = "";

  //decode the jwt
  var decodedJWT = jwt_decode(token)["permissions"];

  longstring = decodedJWT
    .map((x) => resources[x]) //map permission to resource
    .reduce((acc, cur) => acc + seperator + cur); //flatten the list and add in seperator

  return longstring;
}

http.createServer(app).listen(process.env.PORT, () => {
  console.log(`listening on ${appUrl}`);
});
