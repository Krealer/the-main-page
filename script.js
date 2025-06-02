// ===== 1. DEFAULT THEME SETUP =====
// Check if a theme has already been set on the <html> element
if (!document.documentElement.getAttribute('data-theme')) {
  // If not, set dark mode as the default theme
  document.documentElement.setAttribute('data-theme', 'dark');
}

// ===== 2. TOGGLE DARK/LIGHT THEME =====
function toggleTheme() {
  // Get the current theme value from the <html> element
  const current = document.documentElement.getAttribute('data-theme');

  // Determine the new theme based on current value
  const newTheme = current === 'dark' ? 'light' : 'dark';

  // Apply the new theme
  document.documentElement.setAttribute('data-theme', newTheme);
}
// ===== 3. LOAD PROJECTS FROM JSON FILE =====
// Fetch project data from projects.json
fetch('projects.json')
  .then(res => res.json())       // Convert response to JSON
  .then(data => {
    // Use helper to render both sections
    renderSection('games', data.games);
    renderSection('educational', data.educational);
  })
  .catch(err => {
    // Log an error if JSON loading fails
    console.error("❌ Failed to load projects.json:", err);
  });
// ===== 4. RENDER EACH SECTION DYNAMICALLY =====
function renderSection(sectionId, projects) {
  // Locate the container <div> with class="grid" inside the section
  const section = document.querySelector(`#${sectionId} .grid`);

  // If not found, skip rendering
  if (!section || !projects) return;

  // Clear any existing content (e.g., "Loading...")
  section.innerHTML = "";

  // Loop over each project and create a card for it
  projects.forEach(project => {
    // Create the outer <a> card
    const card = document.createElement("a");
    card.className = "card";
    card.href = project.link;
    card.target = "_blank";  // Open project in a new tab

    // Set the inner content of the card
    card.innerHTML = `
      <img src="${project.icon}" alt="${project.title}" />
      <div>${project.title}</div>
    `;

    // Add the card to the grid
    section.appendChild(card);
  });
}
// ===== 5. UNLOCK BACKGROUND MUSIC ON FIRST CLICK =====
// Modern browsers prevent autoplay with sound until interaction

// Listen for the first click on the page
window.addEventListener('click', () => {
  const bgm = document.getElementById('bgm');

  // If the <audio> element is present and not already playing
  if (bgm && bgm.paused) {
    // Try to play the music
    bgm.play().catch(err => {
      // If the browser blocks it, log the issue
      console.log("🔇 Autoplay blocked:", err);
    });
  }
}, { once: true });  // Only run this event handler once
// ===== 6. TOGGLE MUSIC ON/OFF =====
function toggleMusic() {
  const bgm = document.getElementById('bgm');
  if (!bgm) return;

  if (bgm.paused) {
    // Resume music
    bgm.play().catch(err => console.log("Can't play:", err));
  } else {
    // Pause music
    bgm.pause();
  }
}
