const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const signupRoute = require('./signup.route');
const appointmentRoute = require('./appointment.route');
const issueRoute = require('./issue.route');
const feedbackRoute = require('./feedback.route');
const perscriptionRoute = require('./perscription.route');
const conversationRoute = require('./conversation.route');
const messageRoute = require('./message.route');
const paymentRoute = require('./payment.route');
const callRoute = require('./call.route');
const statsRoute = require('./stats.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/user',
    route: userRoute,
  },
  {
    path: '/signup',
    route: signupRoute,
  },
  {
    path: '/appointment',
    route: appointmentRoute,
  },
  {
    path: '/issue',
    route: issueRoute,
  },
  {
    path: '/feedback',
    route: feedbackRoute,
  },
  {
    path: '/perscription',
    route: perscriptionRoute,
  },
  {
    path: '/conversation',
    route: conversationRoute
  },
  {
    path: '/message',
    route: messageRoute
  },
  {
    path: '/payment',
    route: paymentRoute
  },
  {
    path: '/call',
    route: callRoute
  },
  {
    path: '/stats',
    route: statsRoute
  }
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
