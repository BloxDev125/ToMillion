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

app.get('/count', (req, res) => {
  res.json({ count });
});

app.post('/count/increment', (req, res) => {
  count++;
  saveCount();
  res.json({ success: true });
});

app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});