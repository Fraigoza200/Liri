require('dotenv').config()

let axios = require('axios')
let Spotify = require('node-spotify-app')
let fs = require('fs')
let keys = require('./keys.js')
let spotify = new Spotify(keys.spotify)

const [node,file, ...args] = process.argv


switch (command) {
    case 'Spotify':
    case 'spotify':
        spotifyFunc(searchValue)
    break

    case 'concert':
    case 'Concert':
        concertFunc(searchValue)
    break

    case 'movie':
    case 'Movie':
        movieFunc(searchValue)
    break

    case 'do-what-it-says':
        
        console.log('')
        console.log('This is Liri: Executing your command')
        fs.readFile('./random.txt', 'utf8', function (err, data){
            if(err){
                console.log(err)
            }
                spotifyFunc(data)
        })
        break

    default: 
    console.log(`In the command line, enter 'spotify','movie', or 'concert' followed by the search value`)
    break
}