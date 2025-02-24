// Generate random fact
const facts = [
    "JFK was the youngest president elected at age 43.",
    "He won a Pulitzer Prize for his book 'Profiles in Courage.'",
    "JFK set the goal to land a man on the moon.",
    "He was the first president to hold a live TV press conference."
  ];
  
  function showRandomFact() {
    document.getElementById('fact-text').textContent = facts[Math.floor(Math.random() * facts.length)];
  }
  