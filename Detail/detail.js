var sideOption = document.getElementById("side");
function showMenu() {
    sideOption.style.left = "0";
}
function hideMenu() {
    sideOption.style.left = "-300px";
}

var container = document.getElementById('movies');
var search = document.getElementById('searchMovie');

const API_KEY = 'api_key=49e3be45df1c1a483b5eb9560e3c73ab';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

let id = '';
const urlParams = new URLSearchParams(location.search);
for (const [key, value] of urlParams) {
    id = value;
}
let link = `/movie/${id}?language=en-US&append_to_response=videos&`;
let find_url = BASE_URL + link + API_KEY;

apiCall(find_url);

function apiCall(url) {
    console.log(url)
    const x = new XMLHttpRequest();
    x.open('get', url);
    x.send();
    x.onload = function () {
        document.getElementById('movie-display').innerHTML = '';
        var res = x.response;
        var Json = JSON.parse(res);
        getMovies(Json);
    }
    x.onerror = function () {
        window.alert('cannot get')
    }
}


function filterArray(obj) {
    var vtitle = obj.name
    var rg = /Official Trailer/i;
    if (vtitle.match(rg)) {
        return obj;
    }
}

function getMovies(myJson) {
    var MovieTrailer = myJson.videos.results.filter(filterArray);
    var movieDiv = document.createElement('div');
    movieDiv.classList.add('each-movie-page');

    var youtubeURL;
    if (MovieTrailer.length == 0) {
        if (myJson.videos.results.length == 0) {
            youtubeURL = '';
        } else {
            youtubeURL = `https://www.youtube.com/embed/${myJson.videos.results[0].key}`;
        }
    } else {
        youtubeURL = `https://www.youtube.com/embed/${MovieTrailer[0].key}`;
    }

    function convertRuntime(minutes) {
        let hours = Math.floor(minutes / 60);
        let mins = minutes % 60;
        return `${hours}h ${mins}m`;
    }

    let formattedRuntime = convertRuntime(myJson.runtime);
    let formattedVote = myJson.vote_average.toFixed(1);

    movieDiv.innerHTML = `
        <div class="movie-poster">
            <img src=${IMAGE_URL + myJson.poster_path} alt="Poster">
        </div>
        <div class="movie-details">
            <div class="title">
    <span style="margin-right: 15px;">${myJson.title}</span>
    <span style="margin-right: 15px;"><i class="fas fa-clock"></i> ${formattedRuntime}</span>
    <span style="margin-right: 15px;">Released: ${myJson.release_date}</span>
    <span>⭐ ${formattedVote}/10</span>
</div>


            <div class="trailer-div" id="trailer-div-btn">
            </div>
              <span><iframe width="800" height="327" src=${youtubeURL} title="YouTube video player" frameborder="0" allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen ></iframe ></span >
          
            <div class="plot">
            </div>
        </div>
    `;
    document.getElementById('movie-display').appendChild(movieDiv);

    document.body.style.setProperty('--background-url', `url(${IMAGE_URL + myJson.poster_path})`);
}
