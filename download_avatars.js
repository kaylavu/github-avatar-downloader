var request = require('request');
var secrets = require('./secrets')

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
    // ...
    var options = {
        url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
        headers: {
          'User-Agent': 'request', 
        }
      };
    
      request(options, function(err, res, body) {
        var data = JSON.parse(body);
        cb(err, data);
      });
    
  }

  getRepoContributors("jquery", "jquery", function(err, result) {
    var avatarUrls = []; 
    for(var i = 0; i < result.length; i++) {
        console.log('RESULT >>>>', result[i].avatar_url);
    }
    // console.log("Errors:", err);
    // console.log("Result:", result);
  });