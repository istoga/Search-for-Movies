const search = document.getElementById("search-bar")
const searchBtn = document.getElementById("search-button")
let message = document.getElementById("movie-section")
const apiKey = "f2bd1f9f"
let imdbIdArray = []
let allMovies = []
let storedMovieArray = []
let storeMovie = document.querySelector(".store-movies")

function showMessage() {
    message.innerHTML = 
        `
            <img id="movie-film" src="img/movie.svg">
            <h3 id="movie-list-start">Start exploring</h3>
        `
}

showMessage()

function hideMessageDisplayed() {
    message.innerHTML = ""
}

function searchForMovies() {
    if(search.value.length < 3) {
        message.innerHTML = 
            `
            <h2>Unable to locate your film.</h2>
            <h2>Please input at least three characters in the search box above.</h2>
            `
    } else if (search.value !== "") {
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
                .then((res) => res.json())
                .then(data => {
                    allMovies.push(data)
                    const movieListing = 
                        `
                        <div class="movie-results" id="minus" data-show="true">
                            <div class="movie-col-1">
                                <img src="${data.Poster}" class="movie-size">
                            </div>
                            <div class="movie-col-2">
                                <div class="movie-title-rating">
                                    <h3 class="movie-info">${data.Title}</h3>
                                    <p><img src="img/star.png" class="icons">${data.Rated}</p>
                                </div>
                                <div class="movie-runtime">
                                    <p>${data.Runtime}  ${data.Genre}  <button class="store-movies"><img  onclick="getID('${data.imdbID}')" src="img/plus.png" class="icons" data-show="${data.ID}"></button class="add-movie"> Watchlist</p>
                                </div>
                                <div class="para-plot">
                                    <p>${data.Plot}</p>
                                </div>
                            </div>
                        </div>
                        <hr>
                        `
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
        })
}

function btnAddToWatchlist(id) {
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i)
        console.log(key)
        imdbIdArray.push(id)
    }
    localStorage.setItem("movies", JSON.stringify(imdbIdArray))
    console.log(imdbIdArray)
}
    // function getFromLocalStorage() {
//     let storedMovieArray = []
//     storedMovieArray = localStorage.getItem("movies")
//     movieArray = JSON.parse(storedMovieArray)
//     // console.log(storedMovieArray)
// }

searchBtn.addEventListener("click", searchForMovies)
