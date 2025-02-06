// Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const commentsPath = path.join(__dirname, 'comments.json');

app.use(express.static('public'));
app.use(bodyParser.json());

// Get comments from file
app.get('/comments', (req, res) => {
  fs.readFile(commentsPath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.sendStatus(500);
    }
    res.send(data);
  });
});

// Post comments to file
app.post('/comments', (req, res) => {
  fs.readFile(commentsPath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.sendStatus(500);
    }
    const comments = JSON.parse(data);
    comments.push(req.body);
    fs.writeFile(commentsPath, JSON.stringify(comments, null, 2), err => {
      if (err) {
        console.error(err);
        return res.sendStatus(500);
      }
      res.sendStatus(200);
    });
  });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});