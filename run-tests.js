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
    const command = `npm run jest -- --testPathPattern=${pattern} --forceExit --verbose`;
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
  const failedTestsMessages = [];
  for (const pattern of testPatterns) {
    try {
      const stdout = await runTests(pattern);
      // show the colorized output of the tests in the terminal
      // console.log(chalk.green(stdout));
      console.log(chalk.green(`Tests for pattern ${pattern} passed.`));
    } catch (error) {
      console.error(`Tests for pattern ${pattern} failed.`);

      failedTestsMessages.push('Tests for pattern ' + pattern + ' failed.');
    }
  }
  if (failedTestsMessages.length === 0) {
    console.log(
      chalk.green(
        `
        --------------------------------------------
        All tests passed. ${testPatterns.length} tests passed.
        --------------------------------------------
        
        `,
      ),
    );
  } else {
    console.log(
      chalk.red(
        `
        --------------------------------------------
        ${failedTestsMessages.length} tests failed. ${
          testPatterns.length - failedTestsMessages.length
        } tests passed. 
        --------------------------------------------
        
        `,
      ),
      chalk.red(failedTestsMessages.join('\n')),
    );
  }
})();
