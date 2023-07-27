let count = 0;

// Function to fetch the current count from the server
async function fetchCount() {
  try {
    const response = await fetch('/count');
    const data = await response.json();
    count = data.count;
    updateCount();
  } catch (error) {
    console.error('Error fetching count:', error);
  }
}

// Function to increment the count on the server
async function increment() {
  try {
    const response = await fetch('/count/increment', { method: 'POST' });
    const data = await response.json();
    if (data.success) {
      count++;
      updateCount();

      if (count === 100000) {
        document.getElementById('message').innerText = "Congratulations! You've reached 100000!";
        document.getElementById('message').style.color = "green";
      }
    }
  } catch (error) {
    console.error('Error incrementing count:', error);
  }
}

function updateCount() {
  document.getElementById('count').innerText = count;
}

// Fetch the current count when the page loads
window.addEventListener('load', fetchCount);
