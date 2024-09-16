import CryptoJS from "crypto-js";
import config from "./config.js";
import fs from "fs/promises";

async function getJSONData() {
  console.log("Reading JSON data from file...");
  try {
    const jsonString = await fs.readFile(config.jsonPath, "utf8");
    const data = JSON.parse(jsonString);
    console.log("Successfully read and parsed JSON data.");
    return data;
  } catch (err) {
    console.error("Error reading or parsing JSON:", err);
    return null;
  }
}

// Fungsi enkripsi
const encrypt = async (value, secret_token) => {
  try {
    console.log("Encrypting data...");
    const encryptedData = CryptoJS.AES.encrypt(
      JSON.stringify(value),
      secret_token
    ).toString();
    const base64Encoded = CryptoJS.enc.Base64.stringify(
      CryptoJS.enc.Utf8.parse(encryptedData)
    );
    console.log("Encryption successful.");
    return base64Encoded;
  } catch (error) {
    console.error("Encryption failed:", error);
    return "failed";
  }
};

// Fungsi dekripsi
const decrypt = async (value, secret_token) => {
  try {
    console.log("Decrypting data...");
    const base64Decoded = CryptoJS.enc.Base64.parse(value).toString(
      CryptoJS.enc.Utf8
    );
    const decryptedData = CryptoJS.AES.decrypt(base64Decoded, secret_token);
    const finalData = JSON.parse(decryptedData.toString(CryptoJS.enc.Utf8));
    console.log("Decryption successful.");
    return finalData;
  } catch (error) {
    console.error("Decryption failed:", error);
    return "failed";
  }
};

const jsonData = await getJSONData();
if (jsonData) {
  console.log("JSON Data Loaded:", jsonData);
} else {
  console.log("No JSON data found.");
}

async function sendData(array) {
  const totalData = array.length;
  
  // Log progress persiapan data
  console.log(`Preparing data for encryption and sending (${totalData} entries).`);

  // Enkripsi seluruh array data
  const encryptedData = await encrypt({ array }, config.secretToken);
  const encryptedUsersData = { data: encryptedData };

  try {
    console.log("Sending encrypted data to server...");
    
    const response = await fetch(config.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(encryptedUsersData),
    });

    const result = await response.json();
    const decryptedData = await decrypt(result.data, config.secretToken);

    if (decryptedData === "failed") {
      console.log("Failed to decrypt data from server.");
    } else {
      console.log("Successfully decrypted server response.");
      console.log("Decrypted Data:", decryptedData);
    }

    // Log hasil akhir
    console.log("Data sending process complete.");
  } catch (error) {
    console.error("Error sending data:", error);
  }
}

if (jsonData) {
  await sendData(jsonData);
}
