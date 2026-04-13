document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('weatherForm');
  const input = document.getElementById('cityInput');
  const button = document.getElementById('searchBtn');
  const status = document.getElementById('formStatus');
  const loadingCard = document.getElementById('loadingCard');

  if (!form || !input || !button || !status || !loadingCard) {
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
    loadingCard.hidden = false;
  });
});
