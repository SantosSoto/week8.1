// Find the form controls after the deferred script's HTML has been parsed.
const customerForm = document.getElementById('api-customer-form');
const nameInput = document.getElementById('customer-name');
const emailInput = document.getElementById('customer-email');
const submitButton = document.getElementById('customer-submit');
const result = document.getElementById('customer-result');

// Handle both a button click and submitting the form with the Enter key.
customerForm.addEventListener('submit', async function(event) {
  // Prevent the browser's usual form submission and page navigation.
  event.preventDefault();
  submitButton.disabled = true;
  result.textContent = 'Sending...';

  try {
    // Send the field values as JSON to the Express endpoint on the same server.
    const response = await fetch('/api/customer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: nameInput.value,
        email: emailInput.value
      })
    });

    // fetch does not throw automatically for HTTP error statuses such as 500.
    if (!response.ok) {
      throw new Error('Customer request failed: ' + response.status);
    }

    // Parse the JSON response into a JavaScript object.
    const data = await response.json();

    // Update this page. textContent displays submitted values as text, not HTML.
    result.textContent = data.message + '\nWe will reach you at: ' + data.email;
  } catch (error) {
    // Give feedback for a server error, network failure, or invalid JSON response.
    result.textContent = 'Unable to send your request. Please try again.';
  } finally {
    submitButton.disabled = false;
  }
});
