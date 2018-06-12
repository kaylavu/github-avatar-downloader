var request = require('request');
var secrets = require('./secrets');
var fs = require('fs');

var owner = process.argv[2];
var reponame = process.argv[3];

//If user does not provide owner and repo name, throws error. 
if (process.argv.length !== Number(4)) {
    throw new Error('Need repo and owner names!');
}

console.log('Welcome to the GitHub Avatar Downloader!');

//Given a repo owner, repo name, requests for the list of contributors.  
function getRepoContributors(repoOwner, repoName, cb) {
    var options = {
        url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
        headers: {
            'User-Agent': 'request',
        },
        'auth': {
            'bearer': secrets.GITHUB_TOKEN
        }
    };
    //requests data received as JSON and parses data into Javascript object. 
    request(options, function (err, res, body) {
        var data = JSON.parse(body);
        cb(err, data);
    });
}

//Downloads an Image given the URL and saves the file 
function downloadImageByURL(url, filePath) {
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

getRepoContributors(owner, reponame, function (err, result) {
    for (var i = 0; i < result.length; i++) {
        downloadImageByURL(result[i].avatar_url, './avatars/' + result[i].login + '.jpg');
    }
    // console.log("Errors:", err);
    //console.log("Result:", result);
});

