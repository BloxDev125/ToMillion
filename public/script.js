// Function to fetch the current count from the server
async function fetchCount() {
  try {
    const response = await fetch('/count');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    count = data.count; // Update the client-side count with the value from the server
    updateCount();
  } catch (error) {
    console.error('Error fetching count:', error);
    // Show an error message to the user
    document.getElementById('message').innerText = 'Error fetching count. Please try again later.';
    document.getElementById('message').style.color = 'red';
  }
}

// Function to increment the count on the server
async function increment() {
  try {
    const response = await fetch('/count/increment', { method: 'POST' });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    fetchCount(); // Fetch the updated count from the server
  } catch (error) {
    console.error('Error incrementing count:', error);
    // Show an error message to the user
    document.getElementById('message').innerText = 'Error incrementing count. Please try again later.';
    document.getElementById('message').style.color = 'red';
  }
}

function updateCount() {
  document.getElementById('count').innerText = count;
}

// Fetch the current count when the page loads
window.addEventListener('load', fetchCount);
