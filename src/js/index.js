// Import JQuery
import $ from 'jquery'
// Import Bootstrap JS
import 'bootstrap/dist/js/bootstrap'
(() => {
  const message =
    new Date(Date.now()).getDay() > 5
      ? 'Working on weekend?'
      : 'All set and running'
  const greeting = `Hi developer!\ntest.js file: jquery testing\n${message}`
  console.clear()
  // eslint-disable-next-line no-console
  console.log(greeting)
})($)
