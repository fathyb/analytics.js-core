/* eslint-env node */
'use strict';

var baseConfig = require('./karma.conf');

var customLaunchers = {
  sl_edge_latest: {
    base: 'SauceLabs',
    browserName: 'microsoftedge'
  }
};

module.exports = function(config) {
  baseConfig(config);

  if (!process.env.SAUCE_USERNAME || !process.env.SAUCE_ACCESS_KEY) {
    throw new Error('SAUCE_USERNAME and SAUCE_ACCESS_KEY environment variables are required but are missing');
  }

  config.set({
    browserDisconnectTolerance: 1,

    browserDisconnectTimeout: 60000,

    browserNoActivityTimeout: 60000,

    singleRun: true,

    concurrency: 2,

    retryLimit: 5,

    reporters: ['progress', 'junit'],

    browsers: ['PhantomJS'].concat(Object.keys(customLaunchers)),

    customLaunchers: customLaunchers,

    junitReporter: {
      outputDir: process.env.TEST_REPORTS_DIR,
      suite: require('./package.json').name
    },

    sauceLabs: {
      testName: require('./package.json').name
    }

    // Edge and Safari 9 still panic with coverage. Keeping disabled.
    // coverageReporter: {
    //   reporters: [
    //     { type: 'lcov' }
    //   ]
    // }
  });
};
