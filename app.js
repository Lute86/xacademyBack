require("dotenv").config();

//Database connection
const { connection } = require('./config/files/sequelize.config');

// Express Dependencies:
const express = require("express");
// Sanitizacion XSS
const xss = require("xss-clean");
// Custom Dependencies:
const helmet = require("helmet");
const session = require("express-session");
// Winston logger Dependencies
const cors = require("cors");
const logger = require("./utils/winston.logger");

// Models:
const models = require("./models");

// Routes:
const routes = require("./routes");

const config = require("./config/config");
const validateEnv = require("./utils/validateEnv");

const app = express();
validateEnv.validate();
app.use(helmet());
app.use(helmet.ieNoOpen());
// Sets "Strict-Transport-Security: max-age=5184000; includeSubDomains".
const sixtyDaysInSeconds = 5184000;
app.use(
  helmet.hsts({
    maxAge: sixtyDaysInSeconds,
  })
);
// Sets "X-Content-Type-Options: nosniff".
app.use(helmet.noSniff());
app.use(helmet.frameguard({ action: "deny" }));

app.use(xss());
// Sets cookies security settings
const sess = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    sameSite: "strict",
    secure: true,
  },
};
if (config.environment === "production") {
  app.set("trust proxy", 1); // trust first proxy
}
app.use(session(sess));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
    limit: "10kb",
    parameterLimit: 10,
  })
);

// Cors configuration
const whitelist = process.env.CORS.split(" ");

const corsOptions = {
  origin(origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      logger.api.error("Not allowed by CORS", { origin });
      callback(new Error("Not allowed by CORS"));
    }
  },
};
app.use(cors(corsOptions));

if (config.environment === "production") {
  app.set("trust proxy", 1); // trust first proxy
}

models.sequelize
  .authenticate()
  .then(() => {
    logger.api.debug("Conexión con la Base de Datos: EXITOSA");
  })
  .catch((err) => {
    logger.api.error("Conexión con la Base de Datos: FALLIDA");
    logger.api.error(err);
  });

app.use("/", routes);


//Initialize db
connection
  .authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');

    // Start the server
    const PORT = process.env.PORT;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    });
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = app;
