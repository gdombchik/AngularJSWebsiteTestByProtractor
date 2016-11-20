// An example configuration file.
exports.config = {
  //seleniumAddress: 'http://localhost:4444/wd/hub',
  seleniumServerJar: './selenium_server_standalone/selenium-server-standalone-2.53.1.jar',

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'phantomjs'
  },

  // Framework to use. Jasmine is recommended.
  framework: 'jasmine',

  // Spec patterns are relative to the current working directly when
  // protractor is called.
  specs: ['angularjsSpec.js'],

  // Options to be passed to Jasmine.
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 2500000
  }
};
