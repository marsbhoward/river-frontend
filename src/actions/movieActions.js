const PROXY = "https://cors-anywhere-dd.herokuapp.com/";
const streamsAPI = 'https://river-api.herokuapp.com/streams'
const URL = PROXY + streamsAPI


//	fetch(`http://www.omdbapi.com/?t=${movie}+&apikey=6b46131b`).then(response => {

export function fetchMovies (id) {
    let listOfMovieIds = []
    let listOfMovies = []
    let listOfMoviesNotFound = []
    let notFoundCount = 0
    return (dispatch) => {
        dispatch({ type: 'LOADING_MOVIES'})
        
        fetch(`${streamsAPI}/${id}/movies`).then(response => {
            return response.json()
        }).then(responseJSON => {
            Promise.all(
            responseJSON.map((movie, index) => {
                    let movie_id = movie.id
                    

                    let title
                    let year = 0
                    let poster = null
                    let newSlug = ''
                    if (movie.poster !== "null" && movie.poster !== "N/A"){
                        poster = movie.poster
                    }
                    if(responseJSON[index].title === 'undefined' || responseJSON[index].poster === null){   
                        if (movie.slug=== 'skylin3s'){
                            newSlug = "skylines"
                        }
                        else if(movie.slug=== 'the-sputnik'){
                            newSlug = "Sputnik"
                        }
                        else if(movie.slug=== 'charlies-angels'){
                            newSlug = "charlie's-angels"
                        }
                        else if (movie.slug=== 'spy-kids-2-the-island-of-lost-dreams'){
                            newSlug = "spy-kids-2"
                        }
                        else if (movie.slug=== 'cher-the-loneliest-elephant'){
                            newSlug = "cher"
                        }
                        else if (movie.slug=== 'lemony-snickets-a-series-of-unfortunate-events'){
                            newSlug = "a-series-of-unfortunate-events"
                        }
                        else if (movie.slug=== 'shes-out-of-my-league'){
                            newSlug = "she's-out-of-my-league"
                        }
                        else if (movie.slug=== 'shes-out-of-my-league'){
                            newSlug = "she's-out-of-my-league"
                        }
                        else if (movie.slug=== 'the-wild-thornberrys-movie'){
                            newSlug = "the-wild-thornberrys"
                        }
                        else if (movie.slug=== 'jackass-25'){
                            newSlug = "jackass 2.5"
                        }
                        else if (movie.slug=== 'jackass-35'){
                            newSlug = "jackass 3.5"
                        }
                        else if (movie.slug=== 'the-wild-thornberrys-movie'){
                            newSlug = "the-wild-thornberrys"
                        }
                        else if (movie.slug=== 'the-naked-gun-212-the-smell-of-fear'){
                            newSlug = "the-naked-gun"
                        }
                        else if (movie.slug=== 'police-story-3-supercop'){
                            newSlug = "supercop"
                        }
                        else if (movie.slug=== 'new-gods-nezha-reborn'){
                            newSlug = "nezha-reborn"
                        }
                        else if (movie.slug=== 'w-lesie-dzis-nie-zasnie-nikt'){
                            newSlug = "Nobody-Sleeps-in-the-Woods-Tonight"
                        }
                        else if (movie.slug=== 'strange-dastanas'){
                            newSlug = "Ajeeb Daastaans"
                        }
                        else if (movie.slug=== 'trolls-2'){
                            newSlug = "trolls-world-tour"
                        }
                        else if (movie.slug=== 'journey-to-china-the-iron-mask-mystery'){
                            newSlug = "iron-mask"
                        }
                        else if (movie.slug=== 'limited-partners'){
                            newSlug = "like-a-boss"
                        }
                        else if (movie.slug=== 'dorys-reef-cam'){
                            newSlug = "dory's-reef-cam"
                        }
                        else if (movie.slug=== 'zack-snyders-justice-league'){
                            newSlug = "zack-snyder's-justice-league"
                        }
                        else if (movie.slug=== 'danger-close-the-battle-of-long-tan'){
                            newSlug = "danger-close"
                        }
                        else if (movie.slug=== 'mortal-kombat-legends-scorpions-revenge'){
                            newSlug = "mortal-kombat-legends-scorpion's-revenge"
                        }
                        else if (movie.slug=== 'birds-of-prey-and-the-fantabulous-emancipation-of-one-harley-quinn'){
                            newSlug = "birds-of-prey"
                        }
                        else if (movie.slug=== 'el-robo-del-siglo'){
                            newSlug = "The-Heist-of-the-Century"
                        }
                        else if (movie.slug=== 'x-men-the-new-mutants'){
                            newSlug = "the-new-mutants"
                        }
                        else if (movie.slug=== 'oceans-eight'){
                            newSlug = "ocean's-eight"
                        }
                        else if (movie.slug=== 'upsidedown-magic'){
                            newSlug = "upside-down-magic"
                        }
                        else if (movie.slug=== 'supermanshazam-the-return-of-black-adam'){
                            newSlug = "superman/shazam-the-return-of-black-adam"
                        }
                        else if (movie.slug=== 'billie-eilish-the-worlds-a-little-blurry'){
                            newSlug = "billie-eilish-the-world's-a-little-blurry"
                        } 
                        else if (movie.slug=== 'its-the-great-pumpkin-charlie-brown'){
                            newSlug = "it's-the-great-pumpkin-charlie-brown"
                        } 
                        else if (movie.slug=== 'bruce-springsteens-letter-to-you'){
                            newSlug = "bruce-springsteen's-letter-to-you"
                        } 
                        else if (movie.slug=== 'its-the-easter-beagle-charlie-brown'){
                            newSlug = "it's-the-easter-beagle-charlie-brown"
                        } 
                        else if (movie.slug=== 'mariah-careys-magical-christmas-special'){
                            newSlug = "mariah-carey's-magical-christmas-special"
                        } 
                        else if (movie.slug=== 'my-hero-academia-heroesrising'){
                            newSlug = "my-hero-academia-heroes-rising"
                        } 
                        else if (movie.slug=== 'jennifers-body'){
                            newSlug = "jennifer's-body"
                        } 
                        else if (movie.slug=== 'love-weddings-and-other-disasters'){
                            newSlug = "Love-Weddings-Other-Disasters"
                        } 
                        else if (movie.slug=== 'war-room-2'){
                            newSlug = "war-room"
                        } 
                        else if (movie.slug=== 'a-dogs-journey'){
                            newSlug = "a-dog's-journey"
                        }                          
                        else if (movie.slug=== 'a-serial-killers-guide-to-life'){
                            newSlug = "a-serial-killer's-guide-to-life"
                        } 
                        else if (movie.slug=== 'han-solo-a-star-wars-story'){
                            newSlug = "solo-a-star-wars-story"
                        } 
                        else if (movie.slug=== 'isnt-it-romantic'){
                            newSlug = "isn't-it-romantic"
                        } 
                        else if (movie.slug=== 'the-lego-movie-sequel'){
                            newSlug = "the-lego-movie-2"
                        } 
                        else if (movie.slug=== 'dont-leave-home'){
                            newSlug = "don't-leave-home"
                        } 
                        else if (movie.slug=== ''){
                            newSlug = ""
                        } 
                        else if (movie.slug=== 'why-hide'){
                            newSlug = "christmas-presence"
                        } 
                        else if (movie.slug=== 'the-trollenberg-terror'){
                            newSlug = "the-crawling-eye"
                        } 
                        else if (movie.slug=== 'grandmas-boy'){
                            newSlug = "grandma's-boy"
                        } 
                        else if (movie.slug=== 'childs-play-2'){
                            newSlug = "child's-play-2"
                        } 
                        else if (movie.slug=== 'childs-play-3'){
                            newSlug = "child's-play-3"
                        } 
                        else if (movie.slug=== 'jeepers-creepers-3'){
                            newSlug = "jeepers-creepers-iii"
                        } 
                        else if (movie.slug=== 'saw-legacy'){
                            newSlug = "jigsaw"
                        } 
                        else if (movie.slug=== '6headed-shark-attack'){
                            newSlug = "6-headed-shark-attack"
                        } 
                        else if (movie.slug=== 'spongebob-squarepants-3'){
                            newSlug = "the-spongeBob-Movie:-sponge on the run"
                        } 
                        else if (movie.slug=== 'the-godfather-coda-the-death-of-michael-corleone'){
                            newSlug = "the-godfather-part-iii"
                        } 
                        else if (movie.slug=== 'texas-chainsaw-3d'){
                            newSlug = "Texas-Chainsaw"
                        }
                        else if(movie.slug==="soul"){
                            year = 2020
                        } 
                        /*
                        else if (movie.slug=== ''){
                            movie.slug = ""
                        }
                        */
                        
                        if (newSlug === ''){
                            newSlug = movie.slug 
                        }
                        if (year === 0){
                            year = movie.year
                        } 
                         
                        
                        fetch(`https://www.omdbapi.com/?t=${newSlug}&y=${year}&type=movie+&apikey=6b46131b`).then(response=>{return response.json()}).then(moreInfo =>{
                            //mars fixed year movies cause error when rendered
                            //should be writting fixed year to backend
                            //might be fixed on reset
                            //error also cause when clicking a movie that can not be found on ombdapi
                            if (movie.slug=== "100-wolf"){
                                title = "100 Percent Wolf"
                            }
                            else{
                                title = moreInfo.Title
                            }
                            poster = moreInfo.Poster
                            return moreInfo
                        }).then(movieInfo=>{
                            if (movieInfo.Response !== "False"){
                                return movieInfo
                            }
                            else{
                                let newReturn = Promise.resolve(getNewData(movieInfo,movie))
                                
                                return newReturn 
                            }
                            }).then(newmovieInfo=>{
                            year = newmovieInfo.Year
                            if (movie.slug=== "100-wolf"){
                                title = "100 Percent Wolf"
                            }
                            else{    
                                title = newmovieInfo.Title
                            }
                            poster = newmovieInfo.Poster


                            if (title !== undefined){
                                fetch(`${URL}/${id}/movies/${movie_id}?poster=${poster}&title=${title}&year=${year}&slug=${newSlug}`, {
                                    method: 'PATCH',
                                    headers: { "Content-Type": "application/json" },
                                })
                            }
                            else {

                            }                           
                        })
                    }
                    listOfMovieIds.push(movie_id)
                    if(movie.title!== "undefined" && movie.poster !== "undefined"){
                        listOfMovies.push(movie)
                    }
                    else{
                        listOfMoviesNotFound.push(movie)
                        notFoundCount++
                    }
                })
                ).then(response => {
                    if (listOfMoviesNotFound.length>0){
                        //console.log('id ' +id)
                        //console.log(listOfMoviesNotFound)
                        //console.log('count '+ notFoundCount)
                    }
                    try {
                        sessionStorage.setItem ('currentMovieList', JSON.stringify(listOfMovies))
                        sessionStorage.setItem ('listOfMovieIds', JSON.stringify(listOfMovieIds))
                        dispatch({ type: 'ADD_MOVIES', movies: listOfMovies, currentMovieList: listOfMovies,ids: listOfMovieIds})
                    }
                    catch(error){
                        console.log(error)
                    }
                })
            })
        }
}

function returnValue(info,original){
    if (info.Title !== undefined){
        return  info
    }
    else{
        return original
    }
}


async function getNewData(dataResponce,movie){
        let x =Promise.resolve(
            fetch(`https://www.omdbapi.com/?t=${movie.slug}&type=movie+&apikey=6b46131b`).then(response=>{
                return response.json()}).then(passInfo =>{
                    return returnValue(passInfo,dataResponce)
                }))
        return x
}



export function listMovies(){
    if (sessionStorage.AllMovies=== 'not loaded'){
        return (dispatch) => {
            dispatch({ type: 'LOADING_MOVIES'})
            fetch(`https://river-api.herokuapp.com/movies`).then(response => {
                return response.json()
            }).then(responseJSON => {
                sessionStorage.setItem ('AllMovies', JSON.stringify(responseJSON))
                dispatch({ type: 'ADD_MOVIES', movies: responseJSON})
            })
        }
    }
    else return(dispatch) =>{
        dispatch({type: 'ADD_MOVIES', movies: JSON.parse(sessionStorage.AllMovies)})
    }
}

//send specific movie to omdb and retrieve all the data
// for use with movie search
export function fetchTitle (movieInfo){
    return (dispatch) => {
            dispatch({ type: 'LOADING_MOVIES'})
            fetch(`https://www.omdbapi.com/?t=${movieInfo.slug}&y=${movieInfo.year}+&apikey=6b46131b`).then(response => {
                return response.json()
            }).then(responseJSON => {
                            if(responseJSON.Title !== null){ 
                            try {
                                sessionStorage.setItem('selectedMovie',JSON.stringify(responseJSON))
                                dispatch({ type: 'ADD_MOVIES', movies: [], ids: [], currentTitle: responseJSON})
                            }
                            catch(error){
                                console.log(error)
                            }
                        }
                        else{
                        }
                        })
        }
}