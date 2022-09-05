const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path:'./config.env'});

//   Router
const userRoutes = require('./router/userRoutes');
const categoryRoutes = require('./router/categoryRoutes');
const tagRoutes = require('./router/tagRouter');
const postRoutes = require('./router/postRoutes')

const app = express()
dotenv.config({path:'./config.env'});
app.use(express.json());


app.use('/api/v1/user',userRoutes);
app.use('/api/v1/category',categoryRoutes);
app.use('/api/v1/tags',tagRoutes);
app.use('/api/v1/posts',postRoutes);


app.get('/',(req,res)=>{
    res.send('hello')
})


app.all('*',(req,res,next)=>{
    res.status(404).json({
        status:'fail',
        message:`Can't find ${req.originalUrl} on this server`
    })
});
mongoose.connect(`mongodb+srv://lokman:pass12345@cluster0.oroe6kh.mongodb.net/?retryWrites=true&w=majority`,
{ useNewUrlParser: true }
)
.then(con =>{
    console.log('DB Connection successfull')
});

const PORT = 8080;
app.listen(PORT,()=>{
    console.log(`app is running in ${PORT}`);
});