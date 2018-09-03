import $ from "jquery";

$(document).ready(function() {
  const message =
    new Date(Date.now()).getDay() > 5
      ? "Working on weekend?"
      : "All set and running";
  let greeting = `Hi developer!\ntest.js file: jquery testing\n${message}`;
  console.log(greeting);
});
