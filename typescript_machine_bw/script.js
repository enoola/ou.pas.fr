document.addEventListener("DOMContentLoaded", function() {
  const textElement = document.getElementById("mytext");

  // Wait for the initial text to finish typing (after 4 seconds)
  setTimeout(function() {
    textElement.classList.remove("typewriter"); // Stop the typewriter effect
    textElement.innerHTML = ""; // Clear the current text

    // New text to display: "OU PAS ."
    const newText = "OU PAS .";
    let i = 0;

    // Function to type the new text "OU PAS ."
    function typeOU_PAS() {
      if (i < newText.length) {
        textElement.innerHTML += newText.charAt(i);
        i++;
        setTimeout(typeOU_PAS, 200); // Typing speed for "OU PAS ."
      } else {
        // After "OU PAS ." is fully typed, add the blinking caret effect
        textElement.classList.add("blinking");
      }
    }

    // Start typing the new text
    typeOU_PAS();
  }, 4000); // Change after 4 seconds
});