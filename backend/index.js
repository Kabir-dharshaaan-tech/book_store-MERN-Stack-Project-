import express, { request } from "express";
import {PORT,mongoDBURL} from "./config.js";
import mongoose from "mongoose";
import {Book} from './models/bookModel.js'
import booksRoute from "./routes/booksRoute.js"
const app=express();

//Middleware for parsing request body

app.use(express.json());

app.get('/',(req,res)=>{
    console.log(req);
    return res.status(234).send('Welcome to mern stack tutoirial kabir')
});


mongoose.connect(mongoDBURL)
        .then(()=> {
            console.log('APP connected to database');
            app.listen(PORT,()=>{
                console.log(`APP is listeng to port: ${PORT}`);
            });
        })
    
        .catch((error)=>{
             console.log(error);
        });




