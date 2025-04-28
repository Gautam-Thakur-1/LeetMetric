import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import leetcodeRoutes from "./routes/leetcode.js";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = [
  "http://localhost:5173",
  "https://leetmetrix.netlify.app/",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"), false);
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/api", leetcodeRoutes);

app.get("/", (req, res) => {
  res.send({
    Routes: ["/profile/:username", "/profile/:username/streak"],
  });
});

export default app;
