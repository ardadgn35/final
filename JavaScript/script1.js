var sideOption = document.getElementById("side");
function showMenu() {
    sideOption.style.left = "0";
}
function hideMenu() {
    sideOption.style.left = "-300px";
}


const API_KEY = 'api_key=49e3be45df1c1a483b5eb9560e3c73ab';
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';


var container = document.getElementById('movies');

var search = document.getElementById('searchMovie');
var prevBtn = document.getElementById('prev-page');
var nextBtn = document.getElementById('next-page');

let pageNumber = 1;
const moviesPerPage = 5;
let currentPage = 1;

function callApiByPage(pageNumber) {
    const apiUrl = `https://api.themoviedb.org/3/discover/movie?${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNumber}&with_watch_monetization_types=flatrate`;
    apiCall(apiUrl);
}

callApiByPage(currentPage);

nextBtn.addEventListener('click', () => {
    currentPage++;
    callApiByPage(currentPage);
    nextBtn.disabled = true; 
    disablePrevNextButtons(); 
});

prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        callApiByPage(currentPage);
        nextBtn.disabled = false; 
    }
});

function disablePrevNextButtons() {
    disablePBtn();
    if (currentPage >= 2) nextBtn.disabled = true; 
    else nextBtn.disabled = false;
}

disablePrevNextButtons();

function apiCall(url) {
    const x = new XMLHttpRequest();
    x.open('get', url);
    x.send();
    x.onload = function () {
        container.innerHTML = "";
        var res = x.response;
        var conJson = JSON.parse(res);
        var moviesArray = conJson.results.slice(0, moviesPerPage); 
        moviesArray.forEach(movie => moviesElement(movie));
    }
}

function moviesElement(movie) {
    var movieElement = document.createElement('div');
    movieElement.classList.add('movie-element');
    movieElement.innerHTML = `
    <a href="./Detail/detail.html?id=${movie.id}"><img src=${IMAGE_URL + movie.poster_path} alt="{movie.id}"></a>
    <div class="movie-info">
      <h3>${movie.title}</h3>
      <div class="star-fab">
      <div class="add-movie-to-list" id="${movie.id}" onclick="addMovie(${movie.id})">
      <span class="icon-color"><i class="fas fa-plus"></i></span>
      </div>
        <span class="icon-color"><i class="fa-solid fa-star">&nbsp;</i>${movie.vote_average}</span>
      </div>
    </div>
    `;
    container.appendChild(movieElement);
}

function setLanguage(lang) {
    const secilenDil = dropdown.querySelector(`a[data-lang="${lang}"]`);
    dropdown.querySelector('.dropbtn').textContent = secilenDil.textContent;

    document.documentElement.lang = lang;
}


var favMovies = [];
var oldLocalsMov=[];

function addMovie(btnId){
    document.getElementById(btnId).innerHTML = '<span class="icon-color"><i class="fas fa-check"></i></span>';
    if(!favMovies.includes(btnId.toString())){
        favMovies.push(btnId.toString());
    }
    oldLocalsMov = JSON.parse(localStorage.getItem('MovieArray'));
    if(oldLocalsMov==null){
        localStorage.setItem('MovieArray', JSON.stringify(favMovies));
    }else{
        favMovies.forEach(item=>{
            if(!oldLocalsMov.includes(item)){
                oldLocalsMov.push(item);
            }
        })
        localStorage.setItem('MovieArray', JSON.stringify(oldLocalsMov));
    }
}

search.addEventListener('keyup', function(){
    var input = search.value;
    console.log(input)
    var inputUrl = `https://api.themoviedb.org/3/search/movie?${API_KEY}&query=${input}`;
    if(input.length !=0){
        apiCall(inputUrl);
    }else{
        window.location.reload();
    }
})

prevBtn.disabled = true;
function disablePBtn() {
    if (currentPage == 1) prevBtn.disabled = true;
    else prevBtn.disabled = false;
}

function disablePrevNextButtons() {
    disablePBtn();
}

document.getElementById('lang-tr').addEventListener('click', function() {
    changeLanguage('tr');
});

document.getElementById('lang-en').addEventListener('click', function() {
    changeLanguage('en');
});

function changeLanguage(lang) {
    const elements = [
        'page-title', 'menu-text', 'popup-desc', 'popup-btn', 'watchlist-text',
        'signin', 'top-10-imdb', 'lang-button', 'searchMovie', 'movies-text',
        'tvshows-text', 'watch-text', 'awards-text', 'celebs-text', 'community-text',
        'imdbpro-desc', 'prev-page', 'next-page'
    ];

    elements.forEach(id => {
        let element = document.getElementById(id);
        if (element) {
            element.classList.add('preserve-font');
        } else {
            element = document.querySelector('#signin a');
            if (element) {
                element.classList.add('preserve-font');
            }
        }
    });

    if (lang === 'tr') {
        document.getElementById('page-title').innerText = 'IMDb Arda Dogan';
        document.getElementById('menu-text').innerText = 'Menü';
        document.getElementById('watchlist-text').innerText = 'İzleme Listesi';
        document.getElementById('signin').querySelector('a').innerText = 'Giriş Yap';
        document.getElementById('top-10-imdb').innerText = 'Bu Hafta IMDb\'de En İyi 10';
        document.getElementById('lang-button').innerText = 'Dil';
        document.getElementById('searchMovie').placeholder = 'Ara...';
        document.getElementById('movies-text').innerText = 'Filmler';
        document.getElementById('tvshows-text').innerText = 'Diziler';
        document.getElementById('watch-text').innerText = 'İzle';
        document.getElementById('awards-text').innerText = 'Ödüller ve Etkinlikler';
        document.getElementById('celebs-text').innerText = 'Ünlüler';
        document.getElementById('community-text').innerText = 'Topluluk';
        document.getElementById('imdbpro-desc').innerText = 'Endüstri Profesyonelleri İçin';
        document.getElementById('prev-page').innerText = 'Önceki';
        document.getElementById('next-page').innerText = 'Sonraki';
    } else if (lang === 'en') {
        document.getElementById('page-title').innerText = 'IMDb Arda Dogan';
        document.getElementById('menu-text').innerText = 'Menu';
        document.getElementById('watchlist-text').innerText = 'Watchlist';
        document.getElementById('signin').querySelector('a').innerText = 'Sign In';
        document.getElementById('top-10-imdb').innerText = 'TOP 10 IMDb This Week';
        document.getElementById('lang-button').innerText = 'Language';
        document.getElementById('searchMovie').placeholder = 'Search...';
        document.getElementById('movies-text').innerText = 'Movies';
        document.getElementById('tvshows-text').innerText = 'Tv Shows';
        document.getElementById('watch-text').innerText = 'Watch';
        document.getElementById('awards-text').innerText = 'Awards & Events';
        document.getElementById('celebs-text').innerText = 'Celebs';
        document.getElementById('community-text').innerText = 'Community';
        document.getElementById('imdbpro-desc').innerText = 'For Industrial Professionals';
        document.getElementById('prev-page').innerText = 'Prev';
        document.getElementById('next-page').innerText = 'Next';
    }
}

