import express from "express";
import dotenv from "dotenv";
import leetcodeRoutes from "./routes/leetcode.js"; 

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', leetcodeRoutes); 

// app.get("/", (req, res) => {
//   res.send("Lund Ke Padh Ley");
//   console.log("Lund Ke Padh Ley");
// });

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
