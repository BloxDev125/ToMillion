const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

let count = 0;

// Load the initial count from the local file (if it exists)
if (fs.existsSync('count.json')) {
  const data = fs.readFileSync('count.json', 'utf8');
  count = JSON.parse(data).count;
}

function saveCount() {
  fs.writeFileSync('count.json', JSON.stringify({ count }), 'utf8');
}

app.use(express.json()); // Parse JSON request bodies

// Enable CORS to allow requests from the client-side script
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/count', (req, res) => {
  res.json({ count });
});

app.post('/count/increment', (req, res) => {
  try {
    count++;
    saveCount();
    res.json({ success: true });
  } catch (error) {
    console.error('Error incrementing count:', error);
    res.status(500).json({ success: false, error: 'Error incrementing count' });
  }
});

app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});