async function search() {
  const city = document.getElementById('city-input').value.trim();
  if (!city) {
    return;
  }

  document.getElementById('error-msg').style.display = 'none';
  document.getElementById('weather-card').style.display = 'none';
  document.getElementById('loader').style.display = 'flex';

  try {
    const data = await fetchWeather(city);
    document.getElementById('loader').style.display = 'none';
    render(data);
  } catch (error) {
    document.getElementById('loader').style.display = 'none';
    const errorElement = document.getElementById('error-msg');

    errorElement.textContent = error.message === 'City not found'
      ? '↳ City not found — try another name.'
      : '↳ Could not fetch weather. Please retry.';

    errorElement.style.display = 'block';
  }
}

document.getElementById('search-btn').addEventListener('click', search);
document.getElementById('city-input').addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    search();
  }
});

applySky('clear', true);
