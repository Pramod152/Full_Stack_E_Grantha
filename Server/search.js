const express = require("express");
const bodyParser = require("body-parser");

const search = express();

// Middleware
search.use(bodyParser.json());

// Function to calculate Levenshtein distance between two strings
function levenshteinDistance(s1, s2) {
  const m = s1.length;
  const n = s2.length;
  const dp = Array.from(Array(m + 1), () => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) {
    dp[i][0] = i;
  }

  for (let j = 0; j <= n; j++) {
    dp[0][j] = j;
  }

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost
      );
    }
  }

  return dp[m][n];
}

// Function to perform fuzzy search on documents with misspelling handling
function fuzzySearch(query, documents, threshold) {
  const results = [];

  for (const doc of documents) {
    const titleWords = doc.title.toLowerCase().split(/\s+/);
    const descriptionWords = doc.description.toLowerCase().split(/\s+/);
    const queryWords = query.toLowerCase().split(/\s+/);

    let isMatch = false;

    for (const queryWord of queryWords) {
      let titleMatch = false;
      let descriptionMatch = false;

      for (const titleWord of titleWords) {
        if (titleWord.includes(queryWord)) {
          titleMatch = true;
          break;
        } else if (levenshteinDistance(titleWord, queryWord) <= threshold) {
          titleMatch = true;
          break;
        }
      }

      for (const descriptionWord of descriptionWords) {
        if (descriptionWord.includes(queryWord)) {
          descriptionMatch = true;
          break;
        } else if (
          levenshteinDistance(descriptionWord, queryWord) <= threshold
        ) {
          descriptionMatch = true;
          break;
        }
      }

      if (titleMatch || descriptionMatch) {
        isMatch = true;
        break;
      }
    }

    if (isMatch) {
      results.push({ document: doc });
    }
  }

  return results;
}

// Sample document data
const documents = [
  {
    _id: "65e1d1a8b0f1b205bc914a9e",
    fileType: "video",
    title: "Ranjish Hi Sahi",
    description:
      '"Ranjish Hi Sahi" is a popular ghazal composed by the legendary Pakistani musician...',
    ratings: 0,
    videoId: "TR7Af4mkafg",
    videoLink: "https://www.youtube.com/watch?v=TR7Af4mkafg",
    categoryId: "Education",
    __v: 0,
  },
  {
    _id: "65e1d1a8b0f1b205bc914a9f",
    fileType: "article",
    title: "Vocal Training",
    description:
      "vocal can be improved by long term regular practice and training...",
    ratings: 4,
    categoryId: "Technology",
    __v: 0,
  },
  {
    _id: "65e1d1a8b0f1b205bc914a9g",
    fileType: "book",
    title: "Classical Songs of India",
    description:
      "Classi vocal is the result of a long and continuous process of evolution...",
    ratings: 5,
    categoryId: "Education",
    __v: 0,
  },
  {
    _id: "65e1d1a8b0f1b205bc914a9h",
    fileType: "document",
    title: "Tabala training",
    description:
      "tabala and music is a popular ghazal composed by the legendary Pakistani musician...",
    ratings: 3,
    categoryId: "Engineering",
    __v: 0,
  },
  // Add more documents as needed
];

// Route to handle fuzzy search queries
search.get("/search", (req, res) => {
  const query = req.query.q; // Get query from request parameters
  const threshold = parseInt(req.query.threshold) || 1; // Ensure threshold is a number

  if (!query) {
    return res.status(400).json({ error: 'Query parameter "q" is required.' });
  }

  const results = fuzzySearch(query, documents, threshold);
  console.log("Query:", query);
  console.log(results);

  res.json({ results });
});

// Starting the server
const PORT = process.env.PORT || 3000;
search.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
