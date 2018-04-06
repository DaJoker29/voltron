const path = require('path');
const dotenv = require('dotenv');

const env = dotenv.config();

// TODO: Run in a cluster.
// TODO: Add CSRF module (csurf) to secure form submissions
// TODO: Add serve-favicon like the cool kids do.
const express = require('express');
const mongoose = require('mongoose');
const morganDebug = require('morgan-debug');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const helmet = require('helmet');
const passport = require('passport');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const moment = require('moment');
const numeral = require('numeral');
const VError = require('verror');

const debug = require('debug')('voltron:init');
const envDebug = require('debug')('voltron:env');
// const routeDebug = require('debug')('voltron:routes');
const dbDebug = require('debug')('voltron:database');

// TODO: Import Custom TOTP Strategy from Caster

/**
 * Check for envirnment variables
 */

if (env.error) {
  console.error(
    env.error.code === 'ENOENT' ? 'No .env file found' : env.error.message,
  );
  process.exit(1);
} else {
  Object.entries(env.parsed).forEach(rule => {
    envDebug(`${rule[0]} = ${rule[1]}`);
  });
}

/**
 * Variables and Constants
 */

const app = express();

const isProduction = process.env.NODE_ENV === 'production';

const pkg = require('./package.json');

const port = process.env.PORT || 3000;
const db =
  process.env.DB ||
  `mongodb://localhost/${isProduction ? 'test_' : ''}${pkg.name}`;

/**
 * Database Connection Handlers
 */

mongoose.connection.on('error', err => {
  if (err) throw new VError(err, 'Problem connecting to database.');
});

mongoose.connection.on('disconnected', () => {
  dbDebug('Disconnected from database.');
});

mongoose.connection.on('connected', () => {
  dbDebug('Successfully connected to database.');

  const sessionSettings = {
    resave: false,
    secret: process.env.SESSION_SECRET || 'howsekritisit',
    saveUninitialized: false,
    store: new RedisStore({
      host: process.env.REDIS_HOST || 'localhost',
      port: process.env.REDIS_PORT || 6379,
    }),
  };

  /**
   * Express/Passport Configuration
   */

  app.set('view engine', 'pug');
  app.set('views', path.join(__dirname, 'lib/views'));

  app.use(express.static('assets'));
  app.use('/.well-known', express.static('.well-known', { dotfiles: 'allow' }));
  app.use(morganDebug('voltron:morgan', isProduction ? 'combined' : 'dev'));
  app.use(bodyParser.urlencoded({ extended: 'true' }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(helmet());
  app.use(session(sessionSettings));
  app.use(passport.initialize());
  app.use(passport.session());

  app.locals.moment = moment;
  app.locals.numeral = numeral;

  // TODO: Configure TOTP Strategy for Passport
  // TODO: Load express routes

  /**
   * Launch Server
   */

  app.listen(port, err => {
    if (err) throw new VError(err, 'Problem launching express server');
    debug(
      `${pkg.name.toUpperCase()} is spinning UP...And I'll form the head!\n=> http://localhost:${port}`,
    );
  });
});

/**
 * Connect to database
 */

dbDebug(`Connecting to database: ${db}`);
mongoose.connect(db);

/**
 * Termination and Exit handling
 */

process.on('SIGINT', gracefulExit);
process.on('SIGTERM', gracefulExit);
process.on('uncaughtException', err => {
  console.error(err.stack);
  debug(`${pkg.name.toUpperCase()} has CRASHED in a whirl of fire...`);
  gracefulExit();
});

function gracefulExit() {
  debug(`${pkg.name.toUpperCase()} is settling DOWN`);
  if (mongoose.connection.readyState === 1) {
    mongoose.connection.close(() => {
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
}

/*

  Monster misbehaving
  Planet's needing saving
  Situation's grave and 
  I'll form the head
  The enemy is clever
  We're smaller but whatever
  When we put it together
  I'll form the head
  Y'all can do the treading
  Swing energy machete
  If combination's ready
  I'll form the head
  I'll form the head
  I'll form the head
 
  -MC Frontalot

 */
