// Set default theme to dark
if (!document.documentElement.getAttribute('data-theme')) {
  document.documentElement.setAttribute('data-theme', 'dark');
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  document.documentElement.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
}

// Dynamically load projects from JSON and render them
fetch('projects.json')
  .then(res => res.json())
  .then(data => {
    renderSection('games', data.games);
    renderSection('educational', data.educational);
  })
  .catch(err => {
    console.error("Failed to load projects.json:", err);
  });

function renderSection(sectionId, projects) {
  const section = document.querySelector(`#${sectionId} .grid`);
  if (!section || !projects) return;

  section.innerHTML = ""; // Clear placeholder content

  projects.forEach(project => {
    const card = document.createElement("a");
    card.className = "card";
    card.href = project.link;
    card.target = "_blank";

    card.innerHTML = `
      <img src="${project.icon}" alt="${project.title}" />
      <div>${project.title}</div>
    `;

    section.appendChild(card);
  });
}
