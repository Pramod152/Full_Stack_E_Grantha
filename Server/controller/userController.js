const express = require("express");
const userController = express();
const User = require("../model/user");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const Contact = require("../model/contact");
const Video = require("../model/video");
userController.use(express.json());
userController.use(express.urlencoded({ extended: false }));
userController.use(cookieParser());

////------------------------signUp------------------------////

exports.signup = async (req, res) => {
  try {
    const data = await new User(req.body);
    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      return res.status(400).json({ error: "Email address already in use" });
    }
    await data.save();
    const token = await data.generateAuthToken();
    res.cookie("jwt", token, {
      expires: new Date((Date.now() / +60) * 60 * 90 * 24),
      httpOnly: true,
    });
    res.json({ status: "ok", data: data });
  } catch (err) {
    console.log(err);
  }
};

//// ------------------------home------------------------////
exports.home = async (req, res) => {
  try {
    res.status(200).json({ status: "ok", message: "home" });
  } catch (err) {
    console.log(err);
  }
};
////------------------------login------------------------////
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isPassword = await bcrypt.compare(password, user.password);

    if (!isPassword) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // generate token
    const token = await user.generateAuthToken();

    // create cookie
    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 60 * 60 * 90 * 24),
      // httpOnly: true,
    });

    console.log("Login successful"); // Debug statement

    res.status(200).json({ status: "success", token, email, password, user });
  } catch (err) {
    console.error("Error:", err); // Debug statement
    res.status(400).json({ status: "fail from catch", err });
  }
};

////------------------------secure------------------------////
exports.secure = async (req, res) => {
  try {
    const name = req.user.name;
    // const email = req.user.email;
    res.status(200).json({ status: "ok", data: name });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: "try again ",
    });
    // res.status(404).send("password or email not match!");
  }
};
////------------------------logout------------------------////
exports.logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({
      status: "success",
      message: "logout successful",
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: "try again ",
    });
    // res.status(404).send("password or email not match!");
  }
};
////////////////////////////////////////////////////////////////////////////////////////
// subscription
////------------------------subscribe------------------------////
exports.subscribe = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming you have middleware to extract the user from the request
    const videoId = req.params.videoId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the video is already subscribed
    if (user.subscribedVideos.includes(videoId)) {
      return res
        .status(400)
        .json({ error: "Already subscribed to this video" });
    }

    // Add the video to the user's subscribed videos
    user.subscribedVideos.push(videoId);
    
    await user.save();

    res.status(200).json({ message: "Subscribed successfully" });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

////------------------------unsubscribe------------------------////
// Assuming you have your User model imported as User

exports.unsubscribe = async (req, res) => {
  try {
   
    const userId = req.user._id; // Assuming you have middleware to extract the user from the request
   console.log(userId)
    const videoId = req.params.videoId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the video is subscribed
    if (!user.subscribedVideos.includes(videoId)) {
      return res.status(400).json({ error: "Not subscribed to this video" });
    }

    // Remove the video from the user's subscribed videos
    user.subscribedVideos = user.subscribedVideos.filter(
      (id) => id.toString() !== videoId.toString()
    );
    await user.save();

    res.status(200).json({ message: "Unsubscribed successfully" });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

///////////////////////////////////////////////////////////////
//                      Check Subscribed or not 
exports.checkSubscription = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming you have middleware to extract the user from the request
    const videoId = req.params.videoId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the video is subscribed
    const isSubscribed = user.subscribedVideos.includes(videoId);

    res.status(200).json({ subscribed: isSubscribed });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};


//                     Get Subscribed Videos
// =============//////////////////===============
exports.getUserSubscriptions = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const subscribedVideos = user.subscribedVideos;
    console.log(subscribedVideos);

    // Use Video.find() with $in to find videos by their IDs
    const subscribedVideosData = await Video.find({
      _id: { $in: subscribedVideos },
    });

    console.log(subscribedVideosData);

    res.status(200).json({ subscribedVideosData });
  } catch (error) {
    console.error("Error retrieving subscriptions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

////------------------------get Perticular Course by Id------------------------////

exports.getVideo = async (req, res) => {
  try {
    // Extract the videoId from the request parameters
    const videoId = req.params.videoId;

    // Use the Video model to find the video by its ID
    const video = await Video.findById(videoId);

    // Check if the video exists
    if (!video) {
      // If the video is not found, send a 404 Not Found response
      return res.status(404).json({ error: "Video not found" });
    }

    // If the video is found, send a JSON response with the video data
    res.status(200).json({ status: "success", video });
  } catch (error) {
    // If any error occurs, send a 500 Internal Server Error response
    console.error("Error fetching video:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

////------------------------get all courses ------------------------////

exports.allVideos = async (req, res) => {
  const courses = await Video.find();
  try {
    res.status(200).json({
      status: "ok",
      message: courses,
    });
  } catch (err) {
    console.log(err);
  }
};

//                 User Contact Form Handler
// =============//////////////////===============
exports.contact = async (req, res) => {
  try {
    const contact = await new Contact(req.body);
    await contact.save();

    res.status(200).json({ status: "ok", message: contact });
  } catch (err) {
    console.log(err);
  }
};

////------------------------search------------------------////

////------------------------fuzzy search------------------------////
// const Video = require('./models/Video'); // Assuming you have a Video model

// Function to calculate Levenshtein distance
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
exports.fuzzySearch = async function(req, res) {
  const excludedWords = [
      // List of words to be excluded from the search
      "I", "you", "he", "she", "it", "we", "they",
      "me", "you", "him", "her", "it", "us", "them",
      "mine", "yours", "his", "hers", "its", "ours", "theirs",
      "this", "that", "these", "those",
      "myself", "yourself", "himself", "herself", "itself", "ourselves", "yourselves", "themselves",
      "each other", "one another",
      "anyone", "everyone", "someone", "nobody", "everybody", "somebody", "no one", "each", "either", "neither", "anything", "everything", "something", "nothing", "all", "any", "some", "none", "few", "many", "several", "both", "several", "many", "much", "more", "most", "little", "less", "least",
      "who", "whom", "whose", "which", "that",
      "who", "whom", "whose", "which", "what",
      "about", "above", "across", "after", "against", "along", "among", "around", "at", "before", "behind", "below", "beneath", "beside", "between", "beyond", "but", "by", "concerning", "despite", "down", "during", "except", "for", "from", "in", "inside", "into", "like", "near", "of", "off", "on", "onto", "out", "outside", "over", "past", "regarding", "round", "since", "through", "throughout", "till", "to", "toward", "under", "underneath", "until", "unto", "up", "upon", "with", "within", "without",
      "according to", "apart from", "as for", "aside from", "because of", "by means of", "in addition to", "in front of", "in place of", "in spite of", "instead of", "on account of", "out of", "with regard to",
      "for", "and", "nor", "but", "or", "yet", "so",
      "after", "although", "as", "as if", "as long as", "as though", "because", "before", "even if", "even though", "if", "in order that", "lest", "once", "provided that", "since", "so that", "than", "that", "though", "till", "unless", "until", "when", "whenever", "where", "wherever", "while",
      "both...and", "either...or", "neither...nor", "not only...but also", "whether...or"
  ];

  // Function to filter out excluded words
  function filterExcludedWords(words) {
      return words.filter(word => !excludedWords.includes(word));
  }

  // Function to perform fuzzy search
  function fuzzySearch(query, documents, threshold) {
      const results = [];

      for (const doc of documents) {
          const titleWords = filterExcludedWords(doc.title.toLowerCase().split(/\s+/));
          const descriptionWords = filterExcludedWords(doc.description.toLowerCase().split(/\s+/));
          const queryWords = filterExcludedWords(query.toLowerCase().split(/\s+/));

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
                  } else if (levenshteinDistance(descriptionWord, queryWord) <= threshold) {
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

  // Get the query and threshold from the request
  const query = req.query.q;
  const threshold = parseInt(req.query.threshold) || 2;

  if (!query) {
      return res.status(400).json({ error: 'Query parameter "q" is required.' });
  }

  try {
      // Fetch documents from the database
      const documents = await Video.find({}); // Fetch all for example, adjust as needed

      // Perform fuzzy search on fetched documents
      const results = fuzzySearch(query, documents, threshold);

      // Respond with the search results
      res.json({ results });
  } catch (error) {
      res.status(500).json({ error: "An error occurred while fetching documents." });
  }
};




/////////////////////////////////////////////////
//                  Word2Vec
// Sample data stored in the database

// const videos = [
//   {
//     "title": "Introduction to Hindustani Classical Music",
//     "description": "Explore the basics of Hindustani classical music, including ragas, talas, and vocal techniques."
// },
// {
//     "title": "Carnatic Music Fundamentals",
//     "description": "Learn the foundational principles of Carnatic music, covering ragas, swaras, and rhythmic patterns."
// },
// {
//     "title": "Raga Theory and Practice",
//     "description": "Dive deep into the theory and practical application of ragas, the melodic frameworks of Indian classical music."
// },
// {
//     "title": "Tabla Mastery: The Art of Percussion",
//     "description": "Master the intricate rhythms and techniques of the tabla, a fundamental percussion instrument in Indian classical music."
// },
// {
//     "title": "Sitar Techniques and Performance",
//     "description": "Develop your skills in playing the sitar, exploring its unique techniques and performance styles."
// },
// {
//     "title": "Exploring the Veena: South Indian String Instrument",
//     "description": "Discover the rich heritage of the veena, a classical string instrument from South India, and learn to play its mesmerizing melodies."
// },
// {
//     "title": "Dhrupad Vocal Tradition: Ancient Indian Singing Style",
//     "description": "Delve into the ancient tradition of Dhrupad singing, exploring its techniques, compositions, and spiritual significance."
// },
// {
//     "title": "Flute Melodies of Indian Classical Music",
//     "description": "Immerse yourself in the enchanting melodies of the Indian classical flute, learning both traditional compositions and improvisational techniques."
// },
// {
//     "title": "Tanpura Tuning and Accompaniment",
//     "description": "Learn the art of tuning and playing the tanpura, a drone instrument essential for accompaniment in Indian classical music."
// },
// {
//     "title": "Ghatam: The Clay Pot Percussion",
//     "description": "Discover the rhythmic possibilities of the ghatam, a traditional clay pot percussion instrument used in South Indian classical music."
// },
// {
//     "title": "Bharatanatyam: Classical Indian Dance",
//     "description": "Explore the expressive movements and intricate footwork of Bharatanatyam, a classical dance form from South India."
// },
// {
//     "title": "Kathak: The North Indian Classical Dance Form",
//     "description": "Dive into the graceful and dynamic movements of Kathak, a classical dance form known for its storytelling and rhythmic complexity."
// },
// {
//     "title": "Mridangam Mastery: South Indian Percussion",
//     "description": "Master the mridangam, a versatile percussion instrument integral to Carnatic music, and explore its rhythmic intricacies."
// },
// {
//     "title": "Sarod: The Soulful String Instrument",
//     "description": "Learn to play the sarod, a beautiful and soulful string instrument prominent in North Indian classical music, and explore its expressive capabilities."
// },
// {
//     "title": "Dholak Rhythms and Beats",
//     "description": "Develop your skills in playing the dholak, a versatile drum used in various musical genres, focusing on its rhythmic patterns and techniques."
// },
// {
//     "title": "Tarang: The Art of Indian Percussion Ensemble",
//     "description": "Discover the art of playing in an Indian percussion ensemble, exploring the rhythms, compositions, and dynamics of traditional Tarang performances."
// },
// {
//     "title": "Thumri: Expressive Vocal Genre of Hindustani Music",
//     "description": "Explore the emotive and lyrical style of Thumri singing, delving into its repertoire, ornamentation techniques, and expressive nuances."
// },
// {
//     "title": "Carnatic Flute Techniques",
//     "description": "Master the techniques specific to playing the flute in Carnatic music, including breath control, ornamentation, and improvisation."
// },
// {
//     "title": "Khyal Gayaki: Vocal Style of Hindustani Classical Music",
//     "description": "Study the intricate art of Khyal singing, a prominent vocal style in Hindustani classical music, focusing on its improvisational aspects and emotive expression."
// },
// {
//     "title": "Vichitra Veena: Unconventional String Instrument Exploration",
//     "description": "Explore the unique sound and playing techniques of the Vichitra Veena, a rare and mesmerizing string instrument used in Indian classical music."
// },
// {
//     "title": "Sufi Music Traditions of South Asia",
//     "description": "Delve into the mystical and devotional music traditions of Sufism in South Asia, exploring the poetry, melodies, and spiritual significance of Sufi music."
// },
// {
//     "title": "Ghazal Singing: Poetry in Music",
//     "description": "Discover the art of Ghazal singing, a poetic and emotive form of vocal music, exploring its repertoire, lyrical themes, and expressive techniques."
// },
// {
//     "title": "Gat: Composition in Hindustani Classical Music",
//     "description": "Learn about the intricate compositions known as Gat in Hindustani classical music, exploring their structure, rhythm, and melodic intricacies."
// },
// {
//     "title": "Rudra Veena: Ancient Indian Plucked String Instrument",
//     "description": "Explore the rich history and profound sound of the Rudra Veena, an ancient plucked string instrument revered in Indian classical music."
// },
// {
//     "title": "Dholki: Folk Percussion Instrument of South Asia",
//     "description": "Discover the rhythmic versatility of the dholki, a popular folk percussion instrument used in traditional music across South Asia."
// },
// {
//     "title": "Rabab: Traditional Afghan Musical Instrument",
//     "description": "Learn about the history and playing techniques of the Rabab, a traditional musical instrument originating from Afghanistan, and explore its role in Afghan music traditions."
// },
// {
//     "title": "Rasa: Understanding the Emotional Essence in Indian Music",
//     "description": "Explore the concept of Rasa in Indian music, delving into how different musical elements evoke and express emotions in classical and traditional compositions."
// },
// {
//     "title": "Qawwali: Mystical Music of Sufism",
//     "description": "Immerse yourself in the ecstatic and devotional music of Qawwali, a vibrant tradition rooted in Sufi mysticism, exploring its history, poetry, and performance styles."
// },
// {
//     "title": "Indian Classical Music Notation and Theory",
//     "description": "Master the notation and theoretical concepts of Indian classical music, including ragas, talas, and the intricate nuances of traditional compositions."
// },
// {
//     "title": "Tala System: Rhythmic Framework in Indian Music",
//     "description": "Explore the rhythmic framework of Indian music through the study of Talas, intricate rhythmic cycles that form the backbone of classical compositions and improvisation."
// }
  
// ];

// async function fetchVideos() {
//   const courses = await Video.find();
//   let videoTitleDesc =[];
//   courses.map((video) => {
//     return videoTitleDesc = [{
//       "title": video.title,
//       "description": video.description,
//     }
//   ]
//   });
// }

// const Video = require('./models/Video'); // Import your Video model definition

exports.recommendVideos = async function recommendVideos(req, res) {

    const courses = await Video.find();
    const videos = courses.map(video => ({
      "title": video.title,
      "description": video.description,
    }));

// Preprocessing
function preprocessText(text) {
  const tokens = text.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/);
  return tokens;
}

// Build vocabulary and document vectors
const wordEmbeddings = {};

   videos.forEach(video => {
    const titleTokens = preprocessText(video.title);
    const descriptionTokens = preprocessText(video.description);
    const allTokens = [...titleTokens, ...descriptionTokens];
  
    allTokens.forEach(token => {
        if (!wordEmbeddings[token]) {
            wordEmbeddings[token] = Array.from({ length: 100 }, () => Math.random());
        }
    });
  
    // Calculate average word embedding for the document
    const docVector = allTokens.reduce((acc, token) => acc.map((val, i) => val + wordEmbeddings[token][i]), Array.from({ length: 100 }, () => 0));
    video.vector = docVector.map(val => val / allTokens.length);
  });



// Function to calculate cosine similarity between two vectors
function cosineSimilarity(vec1, vec2) {
  const dotProduct = vec1.reduce((acc, val, i) => acc + val * vec2[i], 0);
  const magnitudeVec1 = Math.sqrt(vec1.reduce((acc, val) => acc + val ** 2, 0));
  const magnitudeVec2 = Math.sqrt(vec2.reduce((acc, val) => acc + val ** 2, 0));

  return dotProduct / (magnitudeVec1 * magnitudeVec2);
}

// Recommendation function
function recommendSimilarVideos(clickedVideoVector, topN = 3) {
  const similarities = [];

  videos.forEach(video => {
      const similarityScore = cosineSimilarity(clickedVideoVector, video.vector);
      similarities.push({ video, similarityScore });
  });

  similarities.sort((a, b) => b.similarityScore - a.similarityScore);
  const topVideos = similarities.slice(0, topN);

  return topVideos;
}

// module.exports = async function recommendVideos(req, res) {

  const videoId = req.params.videoId;
  const clickedVideo = videos.find(video => video.title === videoId);

  if (!clickedVideo) {
      return res.status(404).json({ error: "Video not found" });
  }

  const clickedVideoVector = clickedVideo.vector;
  const recommendedVideos = recommendSimilarVideos(clickedVideoVector);

  res.json({ recommendedVideos });
};

