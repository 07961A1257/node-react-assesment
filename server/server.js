const express = require("express");
const dotenv = require("dotenv").config({ path: ".env-local" });
//If port mentioned in env is not available then it will run on 3001
const PORT = process.env.PORT || "3001";
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
var cors = require("cors");

const userRouter = require("./routes/user");
const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Assignment",
      version: "1.0.0",
      description:
        "A simple express API for connecting React, MariaDB with NodeJs",
    },
    servers: [
      {
        url: "http://localhost:8000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJSDoc(options);

const app = express();

app.use(cors());

// Adding headers in order to perform operations on API - CORS
app.use((req, res, next) => {
  // res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  // res.header(
  //   "Access-Control-Allow-Headers",
  //   "Origin, X-Requested-With, Content-Type, Accept"
  // );

  next();
});

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

/** Middlewares*/
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/**Routes */
// app.get("/", (req, res) => {
//   res.status(200).json({ name: "Chaitanya" });
// });

app.use("/users", userRouter);

app.listen(PORT, () => {
  console.log(`Listening for request(s) on port ${PORT}`);
});
