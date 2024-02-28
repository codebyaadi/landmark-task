import fs from "fs";

// Function to read data from file
export const readDataFromFile = (filePath, callback) => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading data file: ", err);
      callback(err, null);
      return;
    }
    try {
      const jsonData = JSON.parse(data);
      callback(null, jsonData);
    } catch (parseError) {
      console.error("Error parsing JSON data:", parseError);
      callback(parseError, null);
    }
  });
};

// Function to write data to file
export const writeDataToFile = (filePath, jsonData, callback) => {
  fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
    if (err) {
      console.error("Error writing data to file: ", err);
      callback(err);
      return;
    }
    callback(null);
  });
};
