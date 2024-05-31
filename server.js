import express from "express";
import http from "http";
import connectDB from "./database/db.js";


const app = express();
const port = 5000;
const httpServer = http.createServer(app); 


connectDB();




httpServer.listen(port,() => {
	console.log()
})
