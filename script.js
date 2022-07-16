const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

function newQuote() {
    showLoadingSpinner();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

    authorText.textContent = quote.author ? quote.author : 'Unknown';
    quoteText.textContent = quote.text;
    quote.text.length > 120 ? quoteText.classList.add('long-quote') : quoteText.classList.remove('long-quote');

    removeLoadingSpinner();
}

async function getQuotes() {
    showLoadingSpinner();
    const apiUrl = 'https://type.fit/api/quotes';

    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        console.error(error);
    }
}

function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank')
}

newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

getQuotes();
