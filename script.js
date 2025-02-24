// Generate random fact
const facts = [
  "JFK was the youngest president elected at age 43.",
  "He won a Pulitzer Prize for his book 'Profiles in Courage.'",
  "JFK set the goal to land a man on the moon.",
  "He was the first president to hold a live TV press conference.",
];

function showRandomFact() {
  document.getElementById("fact-text").textContent =
    facts[Math.floor(Math.random() * facts.length)];
}

// Hide navbar when scrolled
document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
});

let lastScrollTop = 0;
const scrollThreshold = 50;

document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.querySelector(".navbar");
  let lastScrollY = window.scrollY;

  window.addEventListener("scroll", function () {
    if (window.scrollY > lastScrollY) {
      // Scrolling down - hide navbar
      navbar.style.transform = "translateY(-100%)";
    } else {
      // Scrolling up - show navbar
      navbar.style.transform = "translateY(0)";
    }
    lastScrollY = window.scrollY;
  });
});
