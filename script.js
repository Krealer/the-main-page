// This function is triggered when the "Toggle Theme" button is clicked
function toggleTheme() {
  // Get the current theme value from the <html> tag
  const current = document.documentElement.getAttribute('data-theme');

  // If the current theme is dark, switch to light; otherwise switch to dark
  document.documentElement.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
}
// This sets the default theme to dark if no theme has been chosen yet
if (!document.documentElement.getAttribute('data-theme')) {
  document.documentElement.setAttribute('data-theme', 'dark');
}
