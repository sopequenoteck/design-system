// Karma configuration file
// https://karma-runner.github.io/latest/config/configuration-file.html
//
// NOTE: If you encounter EPERM errors on macOS, you may need to:
// 1. Check firewall/sandbox restrictions (Little Snitch, macOS sandbox)
// 2. Run tests with dangerouslyDisableSandbox in package.json scripts
// 3. Use alternative port or run without sandbox restrictions
//
// Current config uses port 9877 on 127.0.0.1 to avoid conflicts.

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      jasmine: {
        // you can add configuration options for Jasmine here
        // the possible options are listed at https://jasmine.github.io/api/edge/Configuration.html
        // for example, you can disable the random execution with `random: false`
        // or set a specific seed with `seed: 4321`
      },
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    jasmineHtmlReporter: {
      suppressAll: true // removes the duplicated traces
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/ds-angular'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' },
        { type: 'lcovonly' }
      ]
    },
    reporters: ['progress', 'kjhtml'],
    // Change port and use 127.0.0.1 to avoid EPERM error on macOS
    port: 9999,
    hostname: 'localhost',
    listenAddress: '127.0.0.1',
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    restartOnFileChange: true,
    browserDisconnectTimeout: 300000,
    browserNoActivityTimeout: 300000,
    captureTimeout: 300000,
    browserDisconnectTolerance: 3,
    customLaunchers: {
      ChromeHeadlessCI: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox', '--disable-gpu']
      }
    }
  });
};
