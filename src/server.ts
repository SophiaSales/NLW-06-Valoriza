import "reflect-metadata";
import express, { request, response } from "express";


import "./database";

const app = express();

app.listen(9090, () => console.log("Server is running"));