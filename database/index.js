const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = new mongoose.Schema({
  // TODO: your schema here!
  repoId: {
    type: Number,
    required: true,
    unique: true
  },
  repoName: String,
  stars: Number,
  repoURL: String,
  githubId: Number,
  githubUserName: String
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (data) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  return Repo.insertMany(data, {
    ordered: false
  })
  .catch(err =>
  console.log(err))
}

let get25 = () => {
  return Repo.find().sort({stars: -1}).limit(25)
  .catch (err =>
  console.log(err))
}


module.exports.save = save;
module.exports.get25 = get25;