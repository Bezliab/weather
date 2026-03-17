Weather Dashboard Split Structure

Files are separated so editing is easier:
- index.html = page structure only
- css/base.css = resets, root vars, global styles
- css/layout.css = page and section layout
- css/components.css = buttons, cards, forecast items, small UI parts
- css/animations.css = keyframes only
- css/themes.css = weather sky themes and text overrides
- js/weather-map.js = weather code mappings and labels
- js/helpers.js = utility functions
- js/particles.js = particle canvas and lightning logic
- js/weather-api.js = Open-Meteo fetch logic
- js/ui.js = DOM rendering and theme application
- js/main.js = search flow and event listeners

To run:
1. Open index.html in a browser.
2. Or serve the folder with a simple local server.
