const axios = require('axios');
const config = require('../config.js');

let getReposByUsername = (user) => {
  // TODO - Use the axios module to request repos for a specific
  // user from the github API

  return axios.get(`https://api.github.com/users/${user}/repos`, {
    headers: {
      'Authorization': `token ${config.TOKEN}`
    }
  })
  .then (res =>
    res.data.sort(function (a,b) {
      //sorta lowest to highest stargazer count
        return a.stargazers_count - b.stargazers_count;
    })
  )
  .then (data =>
    //grabs the last 25 (aka top 25)
    data.slice(-25))
  .catch (err =>
    console.log(err)
  )
  // The options object has been provided to help you out,
  // but you'll have to fill in the URL

};

module.exports.getReposByUsername = getReposByUsername;