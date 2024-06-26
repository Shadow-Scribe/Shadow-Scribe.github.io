document.addEventListener("DOMContentLoaded", () => {
  const body = document.querySelector("body");
  const quote = document.querySelector(".quote");
  const quote_text = document.querySelector("blockquote p");
  const cite = document.querySelector("blockquote cite");
  const cardBody = document.querySelector('.card-body');
  const content = document.querySelector('.content');
  
  function adjustFontSize() {
        const maxHeight = 121; // Height in pixels
        const contentHeight = content.offsetHeight;
        const scaleFactor = maxHeight / contentHeight;
        const currentFontSize = parseFloat(window.getComputedStyle(content).fontSize);
        const newFontSize = currentFontSize * scaleFactor;
        content.style.fontSize = `${newFontSize}px`;
    }

    adjustFontSize(); // Adjust font size on initial load
  
  async function updateQuote() {
    try {
      const response = await fetch("https://api.quotable.io/random");
      const data = await response.json();
      
      if (response.ok) {
        quote_text.textContent = data.content;
        cite.textContent = data.author;
      } else {
        quote_text.textContent = "An error occured";
        console.log(data);
      }
    } catch (error) {
      quote_text.textContent = "Oops! There is a problem with the quotes server.";
      console.log(error);
    }
  }
  
  async function updateQuoteCustom(f) {
    const response = await fetch(f);
    const data = await response.json();
    if (response.ok && data.length > 0) {
      random_quote = data[Math.floor(Math.random() * data.length - 1) + 1];
      quote_text.textContent = random_quote.content;
      cite.textContent = random_quote.author;
    } else {
      quote_text.textContent = "An error occured";
      console.log(data);
    }
  }
  
  function loadQuote() {
    var url = new URL(window.location);
    var fileUrl = url.searchParams.get("f");
    if (fileUrl == null) {
      updateQuote();
    } else {
      updateQuoteCustom('https://shadow-scribe.github.io/quotes/?f=https://gist.githubusercontent.com/Shadow-Scribe/0a529e630e7fd15f401e59b2d596eba5/raw/75d960087f4a51584754f8376bc5fd8f83ba731e/quotes.json');
    }
  }

  loadQuote();
});
