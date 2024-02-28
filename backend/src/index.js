import express from "express";
import cors from "cors";
import systemroute from "./routes/system.route.js"

const DEFAULT_PORT = 8080;
const app = express();

app.use(express.json());
app.use(cors());
app.use("/", systemroute);

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to Backend",
        version: "1.0.0",
    });
});

app.listen(DEFAULT_PORT, () =>
    console.log(`Server is running at http://localhost:${DEFAULT_PORT}`)
);
