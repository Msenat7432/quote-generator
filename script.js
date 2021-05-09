const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newquoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = []

// Show Loading
function loading(){
    loader.hidden = false ;
    quoteContainer.hidden = true;

}

// hide loading
function complete(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}

function newQuote(){
    loading();
    // pick random quote
   const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
   authorText.textContent = quote.author;
    // check if author field is blank 
    if (!quote.author){
        authorText.textContent = 'Unknown'
    }else{
        authorText.textContent = quote.author;
    }
    // check font size for smaller quotes
    if  (quote.text.length > 100){
        quoteText.classList.add('long-quote')
    }else{
        quoteText.classList.remove('long-quote')
    }
    // set quote, hide loader
   quoteText.textContent = quote.text;
   complete();
}

// Get quotes from API
async function getQuotes(){

const apiUrl = 'https://type.fit/api/quotes';
try{
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
}catch(error){

}
}

// tweet quote
function tweetQuote(){
    const twitterURl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterURl, '_blank')
}

// event Listeners
newquoteBtn.addEventListener('click',newQuote);
twitterBtn.addEventListener('click',tweetQuote);
// on Load
getQuotes();
