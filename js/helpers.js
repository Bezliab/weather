function getLocalHour(timezone) {
  const localHour = new Date().toLocaleString('en-US', {
    timeZone: timezone,
    hour: 'numeric',
    hour12: false,
  });

  return parseInt(localHour, 10);
}

function isDayTime(timezone) {
  const hour = getLocalHour(timezone);
  return hour >= 6 && hour < 20;
}

function formatLocalTime(timezone) {
  return new Date().toLocaleTimeString('en-US', {
    timeZone: timezone,
    hour: '2-digit',
    minute: '2-digit',
  });
}

function roundValue(value, fallback = '—') {
  return value === null || value === undefined ? fallback : Math.round(value);
}
