const loadMoreButton = document.querySelector('.comments-comments-list__load-more-comments-button');

function loadAllComments() {
  const loadMoreButton = document.querySelector('.comments-comments-list__load-more-comments-button');

  if (loadMoreButton) {
    loadMoreButton.click();
    setTimeout(loadAllComments, 1000); // Adjust interval as needed
  }
}


loadAllComments()

let replyButtons = document.querySelectorAll('button.artdeco-button.artdeco-button--muted.artdeco-button--4.artdeco-button--tertiary.ember-view.comments-comment-social-bar__reply-action-button.comments-comment-social-bar__action-button.button.reply');

function processComment(index) {
    if (index >= replyButtons.length) {
        console.log("All comments processed.");
        return;
    }

    const replyButton = replyButtons[index];
    replyButton.click();

    // Wait for the reply box to appear
    setTimeout(() => {
        // Get all div elements with the attribute data-placeholder="Add a reply…"
        const divElements = document.querySelectorAll('div[data-placeholder="Add a reply…"]');
        
        if (divElements.length > 0) {
            // Get the div element at the specific index
            const divElement = divElements[index];

            // Extract the name from aria-label
            const ariaLabel = replyButton.getAttribute("aria-label");
            const startIndex = ariaLabel.lastIndexOf("to ") + "to ".length;
            const endIndex = ariaLabel.indexOf("’s comment");
            const extractedName = ariaLabel.substring(startIndex, endIndex);

            // Set the reply message
            divElement.textContent = "Thank you so much, " + extractedName + "! Truly appreciate it!";

            // Wait before submitting
            setTimeout(() => {
                // Find the submit button
                const submitButton = document.querySelector('.comments-comment-box__submit-button');
                
                if (submitButton) {
                    // Click the submit button
                    submitButton.click();

                    // Process the next comment
                    processComment(index + 1);
                } else {
                    console.log("Submit button not found.");
                }
            }, 2000); // Adjust the delay as needed
        } else {
            console.log("Div element not found.");
        }
    }, 2000); // Adjust the delay as needed
}

// Start processing comments from index 0
processComment(0);

