var request = require('request');
var secrets = require('./secrets');
var fs = require('fs');


console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
    // ...
    var options = {
        url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
        headers: {
          'User-Agent': 'request',
           
        },
        'auth': {'bearer': secrets.GITHUB_TOKEN }
      };
    
      request(options, function(err, res, body) {
        var data = JSON.parse(body);
        cb(err, data);
      });
    
  }

  getRepoContributors("jquery", "jquery", function(err, result) {

    for(var i = 0; i < result.length; i++) {
        downloadImageByURL(result[i].avatar_url,'./avatars/'+result[i].login+'.jpg');
    }
    // console.log("Errors:", err);
     console.log("Result:", result);
  });

function downloadImageByURL(url, filePath) {
    // ...
    request.get(url)        
       .on('error', function (err) {                                   
         throw err; 
       })
       .on('response', function (response) {  
        console.log("Downloading Image..")                         
         console.log('Response Status Message: ', response.statusMessage, 'Response Content Type: ', response.headers['content-type']);
       })
       .pipe(fs.createWriteStream(filePath));
  }

//downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", './avatars/kvirani.jpg'); 

