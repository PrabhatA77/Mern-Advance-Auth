import express from 'express';
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import { connectDB } from './config/connectDB.js';
import cors from "cors";
// import path from "path";
// import { fileURLToPath } from 'url';

import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

app.use(cors({
    origin: process.env.NODE_ENV === "production" 
        ? ["https://auth-tutorial-mfhbcpg1k-prabhat-singh-rathores-projects.vercel.app"]
        : ["http://localhost:5173"],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth',authRoutes);

// if (process.env.NODE_ENV === "production") {
//   // Serve frontend static files
//   app.use(express.static(path.join(__dirname, "../Frontend/dist")));
  
//   // Serve index.html for all remaining routes (React router support)
//   app.use((req, res) => {
//     res.sendFile(path.resolve(__dirname, "Frontend", "dist", "index.html"));
//   });
// }

app.get('/',(req,res)=>{
    res.send('Api working fine noob');
});

app.listen(PORT,()=>{
    connectDB();
    console.log("Server is ruuning on port : ",PORT);
})