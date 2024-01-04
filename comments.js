// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');

// Create a new express application
const app = express();

// Add middleware to parse json data in request body
app.use(bodyParser.json());

// Add middleware to enable CORS
app.use(cors());

// Create an empty object to store comments
const commentsByPostId = {};

// Create a route to handle GET requests to /posts/:id/comments
app.get('/posts/:id/comments', (req, res) => {
  // Get the comments for the post with the given id
  const comments = commentsByPostId[req.params.id] || [];
  // Send the comments back to the client
  res.send(comments);
});

// Create a route to handle POST requests to /posts/:id/comments
app.post('/posts/:id/comments', (req, res) => {
  // Generate a random id for the comment
  const commentId = randomBytes(4).toString('hex');
  // Get the content of the comment from the request body
  const { content } = req.body;
  // Get the comments for the post with the given id
  const comments = commentsByPostId[req.params.id] || [];
  // Add the new comment to the comments array
  comments.push({ id: commentId, content });
  // Store the comments array in the comments object
  commentsByPostId[req.params.id] = comments;
  // Send the new comment back to the client
  res.status(201).send(comments);
});

// Listen for incoming requests
app.listen(4001, () => {
  console.log('Listening on 4001');
});


