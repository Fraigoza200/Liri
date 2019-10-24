require('dotenv').config()

let axios = require('axios')
let Spotify = require('node-spotify-api')
let fs = require('fs')
let keys = require('./keys.js')
let spotify = new Spotify(keys.spotify)

const [node,file, ...args] = process.argv


var pick = function(caseData, functionData) {
    switch (caseData) {
    case "concert-this":
      getBands(functionData);
      break;
    case "spotify-this-song":
      getSpotify(functionData);
      break;
    case "movie-this":
      getMovie(functionData);
      break;
    case "do-what-it-says":
      doWhatItSays();
      break;
    default:
      console.log("LIRI doesn't know that");
    }
  }
//   helps get Artist name

  var getArtistNames = function(artist) {
    return artist.name;
   }


    function getSpotify(songName){
        if(songName === undefined){
            console.log(`Couldn't find song`)
        }
        spotify.search(
            {
                type: 'track',
                query: songName
            },
        function(err, data){
            if(err)
            {
                console.log(err)
                return
            }
        let songs = data.tracks.items
        console.log(songs)    
        
        
        for(let i = 0; i< songs.length; i++){
            console.log(i)
            console.log(`Artist(s):` + songs[i].artists.map(getArtistNames))
            console.log('Song Name:'+ songs[i].name)
            console.log('Preview Song:'+ songs[i].preview_url)
            console.log('Album:'+ songs[i].album.name)
        }
        }
        )
    }

    function getMovie(movieNames){
        axios.get("http://www.omdbapi.com/?t=" + movieNames + "&y=&plot=short&apikey=trilogy")
        .then(function(data){
            console.log('...Searching....')
            console.log('Movie Title:' + data.data.Title)
            console.log('It was Rated:' + data.data.Rated)
            console.log('Year Released:' + data.data.Year)
            console.log('Actors:'+ data.data.Actors)
            console.log('Produced in:'+ data.data.Country)
            console.log('-------------')
        })
        .catch(function(error){
            if(error.data){
                console.log(error.data)
            }
        })
    }

    function getBands(bandName){
        let concert = axios.get("https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=codingbootcamp"
        )

        .then(function(data){
            if(data.data === undefined){
                console.log('Sorry, search for another band')
            }
            console.log('....Found Concert!....')
            
            for(let i = 0; i<5; i++){
                if(data.data[i].venue){
                    console.log('The event is at:' + data.data[i].venue.name)
                    console.log('Venue is Located in:' + data.data[i].venue.city)
                    console.log('Country of Performence:' + data.data[i].venue.country)
                    console.log('-------------')
                }
            }

        })

        .catch(function(error){
            if(error.data){
                console.log(error.data)
            }
        })
    }


// taking in command line arguements and executing them directly
var runThis = function(argOne, argTwo) {
    pick(argOne, argTwo);
  }

// Main funciton
  runThis(process.argv[2], process.argv.slice(3).join(" "))