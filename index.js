const { log } = require('console');
const express=require('express');
const PORT=8000;

//Routes
const compressRoute=require('./routes/compress');

const app=express();

//Middlewares
app.use(express.json()) //parses incoming JSON requests i.e. Converts the req.body to a JavaScript object
app.use('/compress',compressRoute);

app.listen(PORT,()=>{
    console.log(`Server started at PORT:${PORT}`);
});