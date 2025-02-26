import express from 'express';
import {Book} from '../models/bookModel.js'
const router =express.Router();
//Route for Save a new Book

app.post('/books',async(req,res)=>{
     try {
        if(!req.body.title || !req.body.author||!req.body.publishYear)
        {
            return res.status(400).send({
                message: `send all reuqired fields: title,author,publisher`,
            });
        }
        const newBook={
            title:req.body.title,
            author:req.body.author,
            publishYear:req.body.publishYear,
        };

        const book = await Book.create(newBook);

        return res.status(201).send(book);
     } catch (error) {
        console.log(error.message);
       return res.status(500).send({message: error.message});
     }
});


// Route for Get All Books from database 
app.get('/databook',async (req,res)=>{
    try {
        const books = await Book.find({author: "kabir dharshaan"});

        return res.status (200).json({
            count: books.length,
            data:books
        })
      
     
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message:error.message});
    }
})

// Route for Get One Book from database by id
app.get('/databook/:id',async(req,res)=>{
     try{
        const book=await Book.findById(req.params.id);
    
        return res.status(200).json(book)
     }catch(error){
        console.log(error.message);
        res.status(500).send({message: error.message});
     }
})

//Route for Update a Book

app.put('/databook/:id',async(req,res)=>{
    try {
        if(!req.body.title || !req.body.author || !req.body.publishYear)
        {
            return res.status(400).send({
                message:`send all required fields: title,author,publishYear`
            })
        }

        const {id}=req.params;

        const result=await Book.findByIdAndUpdate(id,req.body);

        if(!result){
            return res.status(404).json({message:'Book not found'});
        }
        return res.status(200).send({message: 'Book updated successfuly'});
    } catch (error) {
         console.log(error.message)
         res.status(500).send({message:error.message})
    }
});

// Route for Delete a book
app.delete('/databook/:id',async(req,res)=>{
    try {
        const {id}=req.params;
   
        const result =await Book.findByIdAndDelete(id);

        if(!result)
        {
            return res.status(404).json({message:'Book not found'});
        }
        return res.status(200).send({message: 'Book deleted successfully'});
    } catch (error) {
        
    }
        
    
});

export default router;