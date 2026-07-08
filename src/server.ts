import express from "express";
import cors from "cors";
import "dotenv/config";
import { router } from "./routes";
import { Request, Response } from "express";

const app = express();
app.use(express.json());
app.use(cors());
app.use(router);
app.use((error: Error, req: Request, res: Response) => {
  if (error instanceof Error) {
    return res.status(400).json({
      error: error.message,
    });
  }
  return res.status(500).json({
    error: "Internal Server error",
  });
});

const PORT = process.env.PORT! || 3333;

app.listen(PORT, () => console.log("Servidor:http://localhost:3333/"));
