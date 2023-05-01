const express = require('express');
const axios = require('axios');
const app = express();
const cors = require('cors');
app.use(cors());


app.use(express.static('public'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});


app.get('/api/items', async (req, res) => {
  try {
   const response = await axios.get('https://raw.githubusercontent.com/WFCD/warframe-items/master/data/json/All.json');
     console.log(response.data); // Add this line to log the response data
	res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching data from GitHub');
  }
});

const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.listen(3000, () => {
  console.log(`Server listening on port ${PORT}`);
});
