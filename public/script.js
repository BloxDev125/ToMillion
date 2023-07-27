let count = 0;

// Function to fetch the current count from the server
async function fetchCount() {
  try {
    const response = await fetch('/count');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    count = data.count;
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
    const data = await response.json();
    if (data.success) {
      count++;
      updateCount();

      if (count === 100000) {
        document.getElementById('message').innerText = "Congratulations! You've reached 100000!";
        document.getElementById('message').style.color = 'green';
      }
    }
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