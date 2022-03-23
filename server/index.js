const express = require('express');
let app = express();
const {getReposByUsername} = require('../helpers/github.js');
const {save} = require('../database/index.js');
const {get25} = require('../database/index.js');

app.use(express.static(__dirname + '/../client/dist'));
app.use(express.json());

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  getReposByUsername(req.body.term)
  // save the repo information in the database
  .then (data =>
    data.map(element =>  (
      {
        repoId : element.id,
        repoName: element.name,
        stars : element.stargazers_count,
        repoURL : element.html_url,
        githubId : element.owner.id,
        githubUserName : element.owner.login
      }
    )))
  .then (repos =>
    save(repos))
  .then (() =>
    res.status(201).end()
  )
  .catch (err =>
    console.log(err))
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  get25()
  .then(data =>
    res.json(data))
  .catch(err =>
    console.log(err))
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

