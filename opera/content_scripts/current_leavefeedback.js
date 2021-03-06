/*
 * The JavaScript file for the current eBay layout (late 2017 to present)
 * Runs only when on the list of all transactions page
 */

 /* Retrieves a Promise object from storage
  * Pass in null to get entire contents of storage
  * Pass in callback function that takes storage Objects
  */
 chrome.storage.local.get(null, leaveFeedback);

/**
 * Function called if Promise fulfilled
 * Object has name feedback that corresponds to comment string
 *
 * @param  {Object} contents    - The fulfillment value
 */
function leaveFeedback(contents) {

  /* Get the string by calling object.Name */
  var message = contents.feedback;

  /* Select all buttons for leaving positive feedback and click on them
   * id$ means all HTML ids that end with the specified string
   */
  var positiveRadioButtons = document.querySelectorAll('[id$="-POSITIVE"]');

  for (i = 0; i < positiveRadioButtons.length; i++) {
	  positiveRadioButtons[i].click();
  }

  /* Set the value of each comment box to the message of the text box that was stored
   * Trigger the change event of the TextArea so that leave feedback button is enabled
   * id^ means all HTML ids that start with the specified string
   * Event is written exactly like a jQuery .change() function would run
   */
  var commentTextArea = document.querySelectorAll('[id^="pnnComment"]');
  var event = document.createEvent('HTMLEvents');
  event.initEvent('change', true, false);

  for (i = 0; i < commentTextArea.length; i++) {
	  commentTextArea[i].value = message;
    document.getElementById(commentTextArea[i].id).dispatchEvent(event);

  }

  /* Execute the mouseup event on the feedback button */
  var leaveFeedbackButtons = document.querySelectorAll('[id^="submitFeedbackBtn"]');
  event.initEvent('mouseup', true, false);

  for (i = 0; i < leaveFeedbackButtons.length; i++) {
	  leaveFeedbackButtons[i].click();
  }

  /** If there was feedback left, reload the page for other possible transactions
   * Wait 3 seconds before executing page-reload, allows for feedback buttons to be pressed
   */
  setTimeout(function() {
    if (positiveRadioButtons.length != 0) {
      window.location.assign("https://www.ebay.com/fdbk/leave_feedback");
    }
  }, 3000);
}
