let search = document.getElementById("search-bar")
let searchBtn = document.getElementById("search-button")
let message = document.getElementById("movie-section")
const apiKey = "f2bd1f9f"
let imdbIdArray = []
let allMovies = []
let storedMovieArray = []
let storeMovie = document.querySelector(".store-movies")

function showMessage() {
    message.innerHTML = 
        `<img id="movie-film" src="img/movie.svg">
        <h3 id="movie-list-start">Start exploring</h3>`
}

showMessage()

function hideMessageDisplayed() {
    message.innerHTML = ""
}

function searchForMovies() {
    if(search.value.length < 3) {
        message.innerHTML = 
            `<h2>Unable to locate your film.</h2>
            <h2>Please input at least three characters in the search box above.</h2>`
    } else  {
        searchBtn.disabled = false
        hideMessageDisplayed()
        renderMovies()
        }
}

function renderMovies() {
    fetch(`https://www.omdbapi.com/?s=${search.value}&t=&type=movie&page=1&apikey=${apiKey}`)
        .then(response =>  response.json())
        .then(data => {
            for (let movie of data.Search) {
                fetch(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=${apiKey}`)
                .then((response) => response.json())
                .then(data => {
                    console.log(movie)
                    // for (let movie of data.Search) {
                    //     console.log(data.Search) 
                    const movieListing = 
                        `<div class="movie-results" id="minus"         data-show="true">
                            <div class="movie-col-1">
                                <img src="${data.Poster}" class="movie-size">
                            </div>
                            <div>
                                <div class="movie-title-rating">
                                    <h3 class="movie-info">${data.Title}</h3>
                                    <p><img src="img/star.png" class="icons">${data.imdbRating}</p>
                                </div>
                                <div class="movie-runtime">
                                    <p>${data.Runtime}  ${data.Genre}  
                                    <img  onclick="getID('${movie.imdbID}')" src="img/plus.png" class="icons" data-show="${movie.ID}">Watchlist</p>
                                </div>
                                <div class="para-plot">
                                    <p>${data.Plot}</p>
                                </div>
                            </div>
                        </div>
                        <hr>`
                    message.innerHTML += movieListing
                })
            }
        })
}

function getID(id){
    fetch(`https://www.omdbapi.com/?i=${id}&apikey=${apiKey}`)
        .then((res) => res.json())
        .then(data => {
            btnAddToWatchlist(id)
            getFromLocalStorage(id)
            addedChange(id)
        })
}

// function addedChange(id) {
//     return 
//     `<img onclick="getID('movie.imdbID')" src="img/plus.png" class="icons" data-show="undefined"></img>`
// }

function btnAddToWatchlist(id) {
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i)
        imdbIdArray.push(id)
    }
    localStorage.setItem("movies", JSON.stringify(imdbIdArray))
    getFromLocalStorage(id)
}

function getFromLocalStorage(id) {
    storedMovieArray = localStorage.getItem("movies")
    movieArray = JSON.parse(storedMovieArray)
}

searchBtn.addEventListener("click", searchForMovies)