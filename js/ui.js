function applySky(sky, isDay) {
  const scene = document.getElementById('scene');
  scene.className = '';

  const className = sky === 'clear' && isDay ? 'sky-clear-day' : `sky-${sky}`;
  scene.classList.add(className);

  document.body.className = '';
  document.body.classList.add(className);

  setParticles(sky);
}

function renderForecast(daily) {
  const strip = document.getElementById('forecast-strip');
  strip.innerHTML = '';

  for (let i = 0; i < (daily.time?.length || 0); i += 1) {
    const date = new Date(`${daily.time[i]}T12:00:00`);
    const dayName = i === 0 ? 'Today' : DAY_NAMES[date.getDay()];
    const forecastWeather = WMO[daily.weathercode[i]] || { icon: '🌡' };
    const high = Math.round(daily.temperature_2m_max[i]);
    const low = Math.round(daily.temperature_2m_min[i]);

    strip.innerHTML += `
      <div class="fc-item">
        <div class="fc-day">${dayName}</div>
        <div class="fc-icon">${forecastWeather.icon}</div>
        <div class="fc-temp">${high}°</div>
        <div class="fc-lo">${low}°</div>
      </div>`;
  }
}

function renderCondition(sky) {
  document.getElementById('cond-dot').style.background = {
    clear: '#fde68a',
    clouds: '#94a3b8',
    rain: '#60a5fa',
    snow: '#e0f2fe',
    thunder: '#c084fc',
    fog: '#d1d5db',
    wind: '#6ee7b7',
  }[sky] || '#fff';

  document.getElementById('cond-text').textContent = SKY_DESCRIPTIONS[sky] || '';
}

function render(data) {
  const { name, country, timezone, current, daily } = data;
  const code = current.weathercode;
  const weather = WMO[code] || { label: 'Unknown', icon: '🌡', sky: 'clear' };
  const isDay = isDayTime(timezone);

  document.getElementById('wc-city').textContent = name;
  document.getElementById('wc-country').textContent = country;
  document.getElementById('wc-icon').textContent = weather.icon;
  document.getElementById('wc-temp').textContent = roundValue(current.temperature_2m);
  document.getElementById('wc-feels').textContent = `Feels like ${roundValue(current.apparent_temperature, 0)}°C`;
  document.getElementById('wc-cond').textContent = weather.label;
  document.getElementById('wc-hum').textContent = current.relativehumidity_2m ?? '—';
  document.getElementById('wc-wind').textContent = roundValue(current.windspeed_10m, 0);
  document.getElementById('wc-vis').textContent = (current.visibility ?? 0).toFixed(1);
  document.getElementById('wc-time').textContent = `${formatLocalTime(timezone)} local`;

  renderForecast(daily);
  renderCondition(weather.sky);
  applySky(weather.sky, isDay);

  document.getElementById('weather-card').style.display = 'block';
}
