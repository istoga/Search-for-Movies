let watchList = document.getElementById("watch-list")
const apiKey = "f2bd1f9f"
let storedMovieArray = []
let removeBtn = document.getElementById("remove-movie")
let watchMsg = document.getElementById("watch-message")
let watchMovieArray = JSON.parse(localStorage.getItem("movies"))

function renderArrayToWatchlist() {
    let movieToShow = ""
    for ( let i = 0; i < watchMovieArray.length; i++) {
        // movieToShow += `
        //     <h1>${watchMovieArray[i]}</h1>        
        // `
        // watchList.innerHTML = movieToShow
    fetch(`https://www.omdbapi.com/?i=${watchMovieArray[i]}&apikey=${apiKey}`)
    .then((res) => res.json())
    .then(data => {
        movieToShow += 
            `
            <h2>${data.Title}</h2>
            <img src="${data.Poster}">
            <p>${data.Plot}</p>
            <button id="remove-movie" onclick="removeMovie('clickedMovie')">Remove</button>
            <hr>
            `
            watchList.innerHTML = movieToShow
            watchMsg.innerHTML = ""
    })
}
}

renderArrayToWatchlist()

function removeMovie(clickedMovie) {
    for ( let i = 0; i < watchMovieArray.length; i++) {
        let activeElement = watchMovieArray[i]
        watchMovieArray.splice(activeElement, 1)
        localStorage.setItem("movies", JSON.stringify(watchMovieArray))
        if (watchMovieArray == []) {
            watchList.innerHTML = ``
            window.location.reload()
        } else {
            renderArrayToWatchlist()
            }
    }
}