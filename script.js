// ===== 1. DEFAULT TO DARK MODE =====
// Check if there's already a theme set
if (!document.documentElement.getAttribute('data-theme')) {
  // If not, set it to 'dark' by default
  document.documentElement.setAttribute('data-theme', 'dark');
}
// ===== 2. TOGGLE THEME FUNCTION =====
function toggleTheme() {
  // Get the current theme from the <html> tag
  const current = document.documentElement.getAttribute('data-theme');

  // Toggle to the opposite theme
  const newTheme = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
}
// ===== 3. LOAD PROJECT DATA FROM JSON =====
// Fetch 'projects.json' from the root of your project
fetch('projects.json')
  .then(res => res.json())  // Parse JSON if successful
  .then(data => {
    // Load each section using a helper function
    renderSection('games', data.games);
    renderSection('educational', data.educational);
  })
  .catch(err => {
    console.error("❌ Failed to load projects.json:", err);
  });
// ===== 4. RENDER A SECTION OF PROJECTS =====
function renderSection(sectionId, projects) {
  // Select the section container based on ID
  const section = document.querySelector(`#${sectionId} .grid`);

  // If the section or data is missing, exit early
  if (!section || !projects) return;

  // Clear the "Loading..." message or any previous content
  section.innerHTML = "";

  // Loop through each project in the array
  projects.forEach(project => {
    // Create the outer link card
    const card = document.createElement("a");
    card.className = "card";
    card.href = project.link;
    card.target = "_blank";  // Open in a new tab

    // Add the inner HTML: icon + title
    card.innerHTML = `
      <img src="${project.icon}" alt="${project.title}" />
      <div>${project.title}</div>
    `;

    // Add the card to the section
    section.appendChild(card);
  });
}
