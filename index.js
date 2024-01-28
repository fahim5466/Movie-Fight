let leftMovie;
let rightMovie;
const movieAutoCompleteConfig = {
    fetchData: async (searchTerm) => {
        const response = await axios.get('http://www.omdbapi.com/', {
            params: {
                apikey: '',
                s: searchTerm
            }
        });
        return response.data.Error ? [] : response.data.Search;
    },
    renderOption: movie => {
        let imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
        return `
        <img src='${imgSrc}'/>
        ${movie.Title} (${movie.Year})
        `;
    },
    summaryTemplate: movieDetail => {
        const awards = movieDetail.Awards.split(' ').reduce((prev, curr) => {
            let val = parseInt(curr);
            return isNaN(val) ? prev : prev + val;
        }, 0);
        const boxOffice = parseInt(movieDetail.BoxOffice.replace(/\$/g, '').replace(/,/g, ''));
        const metaScore = parseInt(movieDetail.Metascore);
        const imdbRating = parseFloat(movieDetail.imdbRating);
        const imdbVotes = parseInt(movieDetail.imdbVotes.replace(/,/g, ''));

        return `
            <article class="media">
                <figure class="media-left">
                    <p class="image">
                        <img src="${movieDetail.Poster}" />
                    </p>
                </figure>
                <div class="media-content">
                    <div class="content">
                        <h1>${movieDetail.Title}</h1>
                        <h4>${movieDetail.Genre}</h4>
                        <p>${movieDetail.Plot}</p>
                    </div>
                </div>
            </article>
            <article data-value="${awards}" class="notification is-primary">
                <p class="title">${movieDetail.Awards}</p>
                <p class="subtitle">Awards</p>
            </article>
            <article data-value="${boxOffice}" class="notification is-primary">
                <p class="title">${movieDetail.BoxOffice}</p>
                <p class="subtitle">Box Office</p>
            </article>
            <article data-value="${metaScore}" class="notification is-primary">
                <p class="title">${movieDetail.Metascore}</p>
                <p class="subtitle">Metascore</p>
            </article>
            <article data-value="${imdbRating}" class="notification is-primary">
                <p class="title">${movieDetail.imdbRating}</p>
                <p class="subtitle">IMDB Rating</p>
            </article>
            <article data-value="${imdbVotes}" class="notification is-primary">
                <p class="title">${movieDetail.imdbVotes}</p>
                <p class="subtitle">IMDB Votes</p>
            </article>
        `;
    },
    getInputValueAfterSelect: movie => {
        return movie.Title;
    }
};

const onMovieSelect = async (side, movie, movieTemplate, summaryRoot) => {
    document.querySelector('.tutorial').classList.add('is-hidden');
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: '',
            i: movie.imdbID
        }
    });
    summaryRoot.innerHTML = movieTemplate(response.data);
    
    if(side === 'left'){
        leftMovie = response.data;
    }
    else{
        rightMovie = response.data;
    }

    if(leftMovie && rightMovie){
        runComparison();
    }
};

function runComparison(){
    const leftStats = document.querySelectorAll('#left-summary .notification');
    const rightStats = document.querySelectorAll('#right-summary .notification');

    leftStats.forEach((leftStat, index) => {
        let rightStat = rightStats[index];
        let leftVal = parseFloat(leftStat.dataset.value);
        let rightVal = parseFloat(rightStat.dataset.value);

        let betterStat = leftVal > rightVal ? leftStat : rightStat;
        let lesserStat = leftVal < rightVal ? leftStat : rightStat;
        betterStat.classList.remove('is-warning');
        betterStat.classList.add('is-primary');
        lesserStat.classList.remove('is-primary'); 
        lesserStat.classList.add('is-warning');
    });
}

createAutoComplete({
    root: document.querySelector('#left-autocomplete'),
    summaryRoot: document.querySelector('#left-summary'),
    ...movieAutoCompleteConfig,
    onOptionSelect: (movie, movieTemplate, summaryRoot) => {
        onMovieSelect('left', movie, movieTemplate, summaryRoot);
    }
});

createAutoComplete({
    root: document.querySelector('#right-autocomplete'),
    summaryRoot: document.querySelector('#right-summary'),
    ...movieAutoCompleteConfig,
    onOptionSelect: (movie, movieTemplate, summaryRoot) => {
        onMovieSelect('right', movie, movieTemplate, summaryRoot);
    }
});