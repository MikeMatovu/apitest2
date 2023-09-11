const http = require("http");
const url = require("url");

// Create an HTTP server
const server = http.createServer((req, res) => {
  // Parse the URL to get query parameters
  const queryData = url.parse(req.url, true).query;

  // Get query parameters
  const slack_name = queryData.slack_name || "example_name";
  const track = queryData.track || "backend";

  // Get the current day of the week
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const currentDayIndex = new Date().getDay();
  const currentDay = daysOfWeek[currentDayIndex];

  // Get the current UTC time
  const utcTime = new Date().toISOString();

  // Construct GitHub URLs
  const githubRepoUrl = "https://github.com/username/repo";
  const githubFileUrl = `${githubRepoUrl}/blob/main/file_name.ext`;

  // Create the JSON response
  const response = {
    slack_name,
    current_day: currentDay,
    utc_time: utcTime,
    track,
    github_file_url: githubFileUrl,
    github_repo_url: githubRepoUrl,
    status_code: 200,
  };

  // Set the response headers
  res.writeHead(200, { "Content-Type": "application/json" });

  // Send the response as JSON
  res.end(JSON.stringify(response));
});

// Define the port to listen on
const port = 3000; // Change to your desired port

// Start the server
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
