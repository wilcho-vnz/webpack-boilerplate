import $ from 'jquery';

(() => {
  const message =
    new Date(Date.now()).getDay() > 5
      ? 'Working on weekend?'
      : 'All set and running';
  const greeting = `Hi developer!\ntest.js file: jquery testing\n${message}`;
  // eslint-disable-next-line no-console
  console.log(greeting);
})($);
