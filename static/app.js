document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('weatherForm');
  const input = document.getElementById('cityInput');
  const button = document.getElementById('searchBtn');
  const status = document.getElementById('formStatus');

  if (!form || !input || !button || !status) {
    return;
  }

  form.addEventListener('submit', (event) => {
    const city = input.value.trim();

    if (!city) {
      event.preventDefault();
      status.textContent = 'Please enter a city to search.';
      input.focus();
      return;
    }

    status.textContent = 'Fetching latest weather...';
    button.disabled = true;
    button.textContent = 'Searching...';
    document.body.classList.add('is-loading');
  });
});
