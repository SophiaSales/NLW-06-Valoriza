import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import { router } from "./routes";

import "./database";

const app = express();

app.use(express.json());

app.use(router);

app.use((err: Error, request: Request, response: Response, next: NextFunction) =>{//tratamento de erros
    if(err instanceof Error){// se for estiver voltando uma instacia de erro, ira exibir a mensagem 
        return response.status(400).json({
            error: err.message
        })
    }
    return response.status(500).json({//se for outro tipo de erro interno vai ser tratado com status 500
        status: "error",
        message: "Internal Server Error"
    })
})

app.listen(9090, () => console.log("Server is running"));