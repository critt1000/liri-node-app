import { pseudoRandomBytes } from "crypto";

//Setting up and grabbing required data
require("dotenv").config();

var fs = require("fs");
var request = require("request");
var keys = require("./keys.js");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");

//Saving userInputs to a variable
var liriSelector = process.argv[2];
var userInput = process.argv;
var input = [];

//getting user search criteria after the selector
for (var i = 3; i < userInput.length; i++) {
    input.push(userInput[i]);
}

//switch case for user inputs selector
switch (liriSelector) {
    case "my-tweets":
        displayTwitter();
        break;

    case "spotify-this-song":
        displaySpotify();
        break;

    case "movie-this":
        displayMovie();
        break;

    case "do-what-it-says":
        dowhat();
        break;

    default:
        console.log("Please use a command: my-tweets, spitify-this-song, movie-this, or do-what-it-says")
        break;
}

function displayTwitter() {
    //Get and display latest 20 tweets
    
    //getting twitter api keys
    var client = new Twitter(keys.twitter);

    //setting parameters
    var param = {
        screen_name: 'critt1000',
        count: 20
    };

    //Getting the 20 tweets
    client.get('statuses/user_timeline', param, function(error, tweets, response){

        if (error) {
            return console.log("error: " + error)
        }
        else {
            for (var i = 0; i<tweets.length; i++) {
                var created = "";
                var message = "";
                created = tweets[i].created_at;
                console.log("Created at: " + created);
                message = tweets[i].text;
                console.log("Tweet's message: " + message);
                console.log("------ Next Tweet ------")
            }
        }
    })
}
//returned JSON object having issues
//need to go thru the returned data set and print artists, title, preview link and album data to terminal
function displaySpotify() {
    //Shows artists, song's name, preview link of song from spotify, and album
    //If no song provided then default to 'The Sign' by Ace of Base
    var spotify = new Spotify(keys.spotify);

    var songSearch = input;
    if (!process.argv[3]) {
        songSearch = "The Sign";
    }

    spotify.search({ type: "track", query: songSearch, limit: 20 }, function (error, data) {
        if (error) {
            return console.log("Error: " + error);
        }
        else {
            console.log(data);
        }
    });

}

function displayMovie() {
    //Will return Title of Movie, Year of release, IMDB rating, Rotten Tomatoes Rating, Country produced, Language, Plot, Actors
    //If no movie provided defaults to 'Mr. Nobody'
    var movieName = input
    if (!process.argv[3]) {
        movieName = "Mr.+Nobody"
    }
    request("http://www.omdbapi.com/?t=" + movieName + "&y=plot=short&tomatoes=true&apikey=trilogy", function (error, response, body) {

        //If no errors and a 200 response code, successful request
        if (!error && response.statusCode === 200) {
            console.log("The title is: " + JSON.parse(body).Title);
            console.log("The year released was: " + JSON.parse(body).Year);
            console.log("The IMDB rating is: " + JSON.parse(body).imdbRating);
            console.log("The Rotten Tomatoes Rating is: " + JSON.parse(body).tomatoRating);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot:" + JSON.parse(body).Plot);
            console.log("Actors:" + JSON.parse(body).Actors);
        }
        else {
            return console.log("Error: " + error);
        }
    })

}

//needs to be reworked when spotify function is completed
function doWhat() {
    //will use the text from random.txt file for a spotify-this-song command
    fs.readFile("random.txt", "utf-8", function(error, data){

        //Check for errors and log if error is encountered
        if (error) {
            return console.log(error);
        }
        
        var random = data;
        displaySpotify(random);
    });
}