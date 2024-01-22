import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors("*"));
app.use(express.json());

const PORT = 3000;

app.listen(PORT, console.log(`server is running in port ${PORT}`));
