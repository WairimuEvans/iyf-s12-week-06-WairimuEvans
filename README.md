Week 6: Asynchronous JavaScript

Student: Evans Wairimu
GitHub: "@WairimuEvans" (https://github.com/WairimuEvans)

Overview

This repository contains my Week 6 work for IYF Season 12. The focus is asynchronous JavaScript and working with APIs.

The exercises cover callbacks, Promises, async/await, Fetch API, DOM manipulation, error handling and browser storage.

Tasks and Projects

Lesson 11: Callbacks, Promises and Async/Await

- Understanding synchronous and asynchronous JavaScript.
- Creating and using Promises.
- Promise chaining.
- Using Promise.all and Promise.race.
- Converting callback-based functions to async/await.
- Handling errors with try/catch.

Lesson 12: Working with APIs

Fetch API

- Fetching data from external APIs.
- Processing JSON responses.
- Handling unsuccessful requests.

User Directory

- Fetching users from JSONPlaceholder.
- Searching users by name or email.
- Sorting users alphabetically.
- Filtering users by city.

POST Requests

- Submitting new posts using the Fetch API.
- Sending JSON data.
- Displaying the server response.

Mini-Project: Weather Dashboard

The weather dashboard allows users to search for weather information by city.

Features include:

- City search.
- Weather information display.
- Loading and error states.
- Recent search history using localStorage.
- Cloudflare Worker integration for weather API requests.

The weather service requires a valid OpenWeatherMap API key configured securely as a Cloudflare Worker secret.

Daily Challenges

The daily challenges cover:

1. Creating delayed Promises.
2. Chaining asynchronous functions.
3. Handling errors and missing users.
4. Converting callbacks to async/await.
5. Fetching multiple API endpoints using Promise.allSettled.

Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- Fetch API
- JSONPlaceholder API
- OpenWeatherMap API
- Cloudflare Workers
- localStorage

Project Structure

- "task-11-1.js" to "task-11-4.js" — Lesson 11 exercises.
- "task-12-1.js" — Fetch API exercises.
- "user-directory.html", "user-directory.css", "user-directory.js" — User Directory.
- "post-form.html", "post-form.css", "post-form.js" — POST request project.
- "weather-dashboard.html", "weather-dashboard.css", "weather-dashboard.js" — Weather Dashboard.
- "weather-worker.js" — Cloudflare Worker.
- "wrangler.toml" — Worker configuration.
- "daily-challenges.js" — Daily challenges.

How to Run

1. Clone this repository.
2. Open the relevant HTML file in a browser or using VS Code Live Server.
3. The User Directory and POST form require an internet connection.
4. The Weather Dashboard requires its Cloudflare Worker and a valid API key.
5. JavaScript exercises can be run in a browser console or a suitable JavaScript runtime.

Learning Outcomes

Through this week's work, I practised:

- Working with asynchronous JavaScript.
- Creating and chaining Promises.
- Using async/await.
- Fetching and displaying API data.
- Handling loading and error states.
- Sending POST requests.
- Searching, sorting and filtering API data.
- Using localStorage to persist information.

Security

API keys and other private credentials should be stored securely and never committed to the public repository.

Submission

IYF Season 12 — Week 6 Individual Assignment.