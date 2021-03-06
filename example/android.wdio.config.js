const path = require('path');

exports.config = {
  runner: 'local',
  port: 4723,
  services: ['appium'],
  specs: ['./e2e/*.spec.js'],
  exclude: [],
  maxInstances: 1,
  capabilities: [
    {
      maxInstances: 1,
      platformName: 'Android',
      platformVersion: '10.0',
      deviceName: 'TestingAVD',
      app: path.join(__dirname, 'android/app/build/outputs/apk/debug/app-debug.apk'),
      automationName: 'UiAutomator2',
    },
  ],
  logLevel: 'error',
  bail: 0,
  baseUrl: 'http://localhost',
  waitforTimeout: 7200000,
  connectionRetryTimeout: 3600000,
  connectionRetryCount: 3,
  framework: 'jasmine',
  reporters: ['spec'],
  jasmineNodeOpts: {
    defaultTimeoutInterval: 1200000,
    expectationResultHandler: function () {
      // NOOP
    },
  },
};
