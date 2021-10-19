import express, { request, response } from "express";

const app = express();

app.get("/test", (request, response) =>{
    return response.send("Ola NLW")
});

app.post("/test-post", (request, response) =>{
    return response.send("Ola NLW metodo POST")
})

app.listen(9090, () => console.log("Server is running"));