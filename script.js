// Wait for DOM to be fully loaded before executing scripts
document.addEventListener("DOMContentLoaded", function () {
  // Initialize the JFK quotes functionality
  initializeQuotes();

  // Initialize the quiz if we're on a page with a quiz
  if (document.getElementById("quiz-container")) {
    initializeQuiz();
  }
});

// Displays random JFK quotes when the quote button is clicked
function initializeQuotes() {
  // Get the quote button and quote element
  const quoteBtn = document.getElementById("quote-btn");
  const quoteElement = document.getElementById("jfk-quote");

  // If these elements don't exist on the current page, exit the function
  if (!quoteBtn || !quoteElement) return;

  // Array of JFK quotes
  const quotes = [
    "Ask not what your country can do for you — ask what you can do for your country.",
    "Those who dare to fail miserably can achieve greatly.",
    "The greater our knowledge increases, the greater our ignorance unfolds.",
    "We choose to go to the moon in this decade and do the other things, not because they are easy, but because they are hard.",
    "Conformity is the jailer of freedom and the enemy of growth.",
    "Let us never negotiate out of fear. But let us never fear to negotiate.",
    "Change is the law of life. And those who look only to the past or present are certain to miss the future.",
    "The time to repair the roof is when the sun is shining.",
    "Forgive your enemies, but never forget their names.",
    "A nation reveals itself not only by the men it produces but also by the men it honors, the men it remembers.",
  ];

  // Add click event listener to the quote button
  quoteBtn.addEventListener("click", function () {
    // Get a random quote
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];

    // Update the quote text with a fade effect
    quoteElement.style.opacity = "0";

    setTimeout(function () {
      quoteElement.textContent = randomQuote;
      quoteElement.style.opacity = "1";
    }, 500);
  });
}
