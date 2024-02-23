const express = require("express");
const driveUpload = express();
const { google } = require("googleapis");
const path = require("path");
const fs = require("fs");

const CLIENT_ID =
  "607703662588-0vc7r41ofmpebbkr3ubhimpmos6fkffm.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";

const REFRESH_TOKEN =
  "1//04V1Z-YR0L3KwCgYIARAAGAQSNwF-L9IrP8P7jqqlPjQ2VE9EBHAPs2oLkEUrbX6LmgubAToUwau7S0uysd95vk-7t8lJPobGjRs";

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({
  version: "v3",
  auth: oauth2Client,
});

/* 
filepath which needs to be uploaded
Note: Assumes example.jpg file is in root directory, 
though this can be any filePath
*/
const filePath = path.join(__dirname, "Image1.jpg");

async function uploadFile() {
  try {
    const response = await drive.files.create({
      requestBody: {
        name: "Image1.jpg", //This can be name of your choice
        mimeType: "image/jpg",
        parents: ["1vR7FUcu_0rSnuCjv8EKZZU6iYqpUKMXo"],
      },
      media: {
        mimeType: "Image/jpg",
        body: fs.createReadStream(filePath),
      },
    });

    console.log(response.data);
  } catch (error) {
    console.log(error.message);
  }
}

uploadFile();

async function deleteFile() {
  try {
    const response = await drive.files.delete({
      fileId: "1mf9VkUizUnq7TZgOEGK6oM1cHiu4hN18",
    });
    console.log(response.data, response.status);
  } catch (error) {
    console.log(error.message);
  }
}

// deleteFile();

async function generatePublicUrl() {
  try {
    const fileId = "10Nr-IpCt2sDKSLs87-rb2FMs1A19C_Ys";
    await drive.permissions.create({
      fileId: fileId,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });

    /* 
    webViewLink: View the file in browser
    webContentLink: Direct download link 
    */
    const result = await drive.files.get({
      fileId: fileId,
      fields: "webViewLink, webContentLink",
    });
    console.log(result.data);
  } catch (error) {
    console.log(error.message);
  }
}

generatePublicUrl();

module.exports = driveUpload;
