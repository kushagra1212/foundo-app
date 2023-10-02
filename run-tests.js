const chalk = require('chalk');
const { exec } = require('child_process');

const testPatterns = [
  'SelectItemTypeScreen',
  'AddItemDetailsScreen',
  'ItemScreen',
  'ForgotPasswordScreen',
  'FeedSearchScreen',
  'AuthScreen',
  'SignupScreen',
  'SigninScreen',
];

function runTests(pattern) {
  return new Promise((resolve, reject) => {
    const command = `npm run jest -- --testPathPattern=${pattern} --forceExit --runInBand --verbose`;
    console.log(`Running tests for pattern: ${pattern}`);
    const childProcess = exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(stderr);
        reject(error);
      } else {
        resolve(stdout);
      }
    });

    childProcess.stdout.pipe(process.stdout);
    childProcess.stderr.pipe(process.stderr);
  });
}

(async () => {
  let passedTests = 0;
  for (const pattern of testPatterns) {
    try {
      const stdout = await runTests(pattern);
      // show the colorized output of the tests in the terminal
      // console.log(chalk.green(stdout));
      console.log(chalk.green(`Tests for pattern ${pattern} passed.`));
      passedTests++;
    } catch (error) {
      console.error(`Tests for pattern ${pattern} failed.`);
    }
  }
  if (passedTests === testPatterns.length) {
    console.log(
      chalk.green(
        `All tests passed. ${passedTests} out of ${testPatterns.length} tests passed.`,
      ),
    );
  } else {
    console.log(
      chalk.red(
        `Tests failed. ${passedTests} out of ${testPatterns.length} tests passed.`,
      ),
    );
  }
})();
