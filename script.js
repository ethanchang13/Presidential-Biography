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

// Quiz
function initializeQuiz() {
  // Get all the quiz elements
  const questionContainer = document.getElementById("question");
  const answerButtonsContainer = document.getElementById("answer-buttons");
  const nextButton = document.getElementById("next-btn");
  const prevButton = document.getElementById("prev-btn");
  const progressIndicator = document.getElementById("progress-indicator");
  const scoreContainer = document.getElementById("score-container");
  const scoreElement = document.getElementById("score");
  const restartButton = document.getElementById("restart-btn");

  // Quiz questions array
  const questions = [
    {
      question: "When was John F. Kennedy born?",
      answers: [
        { text: "May 29, 1917", correct: true },
        { text: "January 20, 1925", correct: false },
        { text: "July 4, 1918", correct: false },
        { text: "November 22, 1920", correct: false },
      ],
    },
    {
      question: "What was Kennedy's major foreign policy crisis in 1962?",
      answers: [
        { text: "Berlin Wall construction", correct: false },
        { text: "Vietnam War", correct: false },
        { text: "Cuban Missile Crisis", correct: true },
        { text: "Korean War", correct: false },
      ],
    },
    {
      question: "What famous program did Kennedy establish in 1961?",
      answers: [
        { text: "Medicare", correct: false },
        { text: "Peace Corps", correct: true },
        { text: "Head Start", correct: false },
        { text: "Food Stamps", correct: false },
      ],
    },
    {
      question: "What was Kennedy's famous space exploration goal?",
      answers: [
        { text: "Launching the first satellite", correct: false },
        { text: "Building the International Space Station", correct: false },
        {
          text: "Landing a man on the Moon before the end of the 1960s",
          correct: true,
        },
        { text: "Sending a rover to Mars", correct: false },
      ],
    },
    {
      question: "Where was Kennedy assassinated?",
      answers: [
        { text: "New York City", correct: false },
        { text: "Washington D.C.", correct: false },
        { text: "Boston", correct: false },
        { text: "Dallas, Texas", correct: true },
      ],
    },
  ];

  let currentQuestionIndex = 0;
  let score = 0;
  let answeredQuestions = new Array(questions.length).fill(false);

  // Start the quiz
  startQuiz();

  // Start the quiz function
  function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    answeredQuestions = new Array(questions.length).fill(false);
    scoreContainer.classList.add("d-none");
    showQuestion(currentQuestionIndex);
  }

  // Show a question
  function showQuestion(questionIndex) {
    // Update progress indicator
    progressIndicator.textContent = `Question ${questionIndex + 1} of ${
      questions.length
    }`;

    // Update button states
    prevButton.disabled = questionIndex === 0;
    nextButton.textContent =
      questionIndex === questions.length - 1 ? "Finish" : "Next";

    // Set the question text
    const question = questions[questionIndex];
    questionContainer.textContent = question.question;

    // Clear previous answer buttons
    while (answerButtonsContainer.firstChild) {
      answerButtonsContainer.removeChild(answerButtonsContainer.firstChild);
    }

    // Create answer buttons
    question.answers.forEach((answer) => {
      const button = document.createElement("button");
      button.textContent = answer.text;
      button.classList.add("btn");

      // If question has been answered, show correct/incorrect
      if (answeredQuestions[questionIndex]) {
        if (answer.correct) {
          button.classList.add("btn-success");
        } else {
          button.classList.add("btn-outline-secondary");
        }
        button.disabled = true;
      } else {
        button.classList.add("btn-outline-primary");

        // Add click event to check answer
        button.addEventListener("click", () => {
          checkAnswer(answer.correct);

          // Update button styles
          answerButtonsContainer.querySelectorAll("button").forEach((btn) => {
            btn.disabled = true;
            btn.classList.remove("btn-outline-primary");

            // Find the text of this button's answer
            const btnAnswerText = btn.textContent;
            const btnAnswer = question.answers.find(
              (a) => a.text === btnAnswerText
            );

            if (btnAnswer.correct) {
              btn.classList.add("btn-success");
            } else {
              btn.classList.add("btn-outline-secondary");
            }
          });
        });
      }

      answerButtonsContainer.appendChild(button);
    });
  }

  // Check if the answer is correct
  function checkAnswer(isCorrect) {
    if (isCorrect) {
      score++;
    }

    answeredQuestions[currentQuestionIndex] = true;
  }

  // Event listener for next button
  nextButton.addEventListener("click", () => {
    if (currentQuestionIndex === questions.length - 1) {
      // Show the final score
      questionContainer.parentElement.classList.add("d-none");
      nextButton.classList.add("d-none");
      prevButton.classList.add("d-none");
      progressIndicator.classList.add("d-none");

      scoreElement.textContent = score;
      scoreContainer.classList.remove("d-none");
    } else {
      currentQuestionIndex++;
      showQuestion(currentQuestionIndex);
    }
  });

  // Event listener for previous button
  prevButton.addEventListener("click", () => {
    currentQuestionIndex--;
    showQuestion(currentQuestionIndex);
  });

  // Event listener for restart button
  restartButton.addEventListener("click", () => {
    questionContainer.parentElement.classList.remove("d-none");
    nextButton.classList.remove("d-none");
    prevButton.classList.remove("d-none");
    progressIndicator.classList.remove("d-none");

    startQuiz();
  });
}
