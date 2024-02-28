import express from "express";
import { readDataFromFile, writeDataToFile } from "../lib/utils.js";

const router = express.Router();

const DATA_PATH = "../backend/src/data/data.json";

// Route to fetch data
router.get("/fetchdata", (req, res) => {
  readDataFromFile(DATA_PATH, (err, jsonData) => {
    if (err) {
      return res.status(500).json({ error: "Internal server error" });
    }
    res.status(200).json(jsonData);
  });
});

// Route to update data
router.put("/updateData/:id", (req, res) => {
  const { id } = req.params;
  const { propertyName, value } = req.body;

  readDataFromFile(DATA_PATH, (readErr, jsonData) => {
    if (readErr) {
      return res.status(500).json({ error: "Internal server error" });
    }

    const cardIndex = jsonData.findIndex((card) => card.id === parseInt(id));
    if (cardIndex === -1) {
      return res.status(404).json({ error: "Card not found" });
    }

    // Update the property value in the selected data
    const updatedCard = {
      ...jsonData[cardIndex],
      properties: jsonData[cardIndex].properties.map((property) => {
        if (property.pumps && propertyName.startsWith("pumps")) {
          const pumpKey = propertyName.split(".")[1];
          return {
            ...property,
            pumps: {
              ...property.pumps,
              [pumpKey]: value,
            },
          };
        } else if (
          propertyName === "enabled" &&
          property.name.endsWith("Sensor")
        ) {
          return {
            ...property,
            enabled: value,
          };
        } else if (property.mvps && propertyName.startsWith("mvps")) {
          const mvpKey = propertyName.split(".")[1];
          return {
            ...property,
            mvps: {
              ...property.mvps,
              [mvpKey]: value,
            },
          };
        }
        return property;
      }),
    };

    // Update the data in the JSON data
    jsonData[cardIndex] = updatedCard;
    console.log(updatedCard);

    // Write the updated JSON data back to the file
    writeDataToFile(DATA_PATH, jsonData, (writeErr) => {
      if (writeErr) {
        return res.status(500).json({ error: "Internal server error" });
      }
      res.status(200).json({ message: "Data updated successfully" });
    });
  });
});

export default router;
