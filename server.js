const express = require("express");
const path = require("path");
const Search = require("./services/Search");

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

app.get("/api/hello", (req, res) => {
  res.json(["hello", "world!"]);
});

app.get("/api/search", (req, res) => {
  console.log("this is a search");
  const aSearch = new Search();
  res.json("search activated");
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Search server listening on ${port}`);
