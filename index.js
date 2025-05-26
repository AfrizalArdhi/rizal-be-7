import express from "express";
import cors from "cors";
import router from "./route/Route.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import AuthRoutes from "./route/AuthRoute.js";
import db from "./config/Database.js";

dotenv.config();

// Tes koneksi Sequelize
(async () => {
  try {
    await db.authenticate();
    console.log("✅ Database connected...");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
  }
})();

const app = express();
app.use(cors({
  origin: 'https://fe-static-dot-b-05-450507.uc.r.appspot.com', // ganti ke URL frontend kamu di GCP
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(router);
app.use("/auth", AuthRoutes);

app.get('/', (req, res) => {
  res.send('Backend is running...');
});

app.listen(5000, () => console.log('🚀 Server Up and Running...'));
