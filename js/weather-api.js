async function fetchWeather(city) {
  const geoResponse = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
  );
  const geoData = await geoResponse.json();

  if (!geoData.results || geoData.results.length === 0) {
    throw new Error('City not found');
  }

  const { name, country, latitude, longitude, timezone } = geoData.results[0];

  const weatherResponse = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}` +
    `&current=temperature_2m,apparent_temperature,weathercode,windspeed_10m,relativehumidity_2m,visibility` +
    `&daily=weathercode,temperature_2m_max,temperature_2m_min` +
    `&timezone=${encodeURIComponent(timezone)}&forecast_days=5&windspeed_unit=kmh&visibility_unit=kilometres`
  );
  const weatherData = await weatherResponse.json();

  return {
    name,
    country,
    latitude,
    longitude,
    timezone,
    current: weatherData.current,
    daily: weatherData.daily,
  };
}
