const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');
let apiQuotes = [];
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
    //loader1.hidden = false;
}
function complete(){
    quoteContainer.hidden = false;
    loader.hidden = true;
    
    
}
function newQuote(){
    //a random quote
    loading();
    
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    if(!quote.author){
        authorText.textContent = 'unknown';
    }
    else{
    
    authorText.textContent = quote.author;
    }
    if(quote.text.length > 50){
        quoteText.classList.add('long-quote');
    }
    else{
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = quote.text;
   complete();
}
//get quotes from api
async function getQuotes(){
    loading();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    
    try{
      const response = await fetch(apiUrl);
      apiQuotes = await response.json();
      //console.log(apiQuotes[12]);
      newQuote();
    } catch(error){

    }
    
    //on load
    
}
function tweetQuote(){
    const twitterUrl = `
    https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

getQuotes();
