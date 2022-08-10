const express = require('express');
const mongoose = require('mongoose');

const userRoutes = require('./router/userRoutes');
const categoryRoutes = require('./router/categoryRoutes');
const tagRoutes = require('./router/tagRouter');

const app = express();
app.use(express.json())


app.use('/api/v1/user',userRoutes);
app.use('/api/v1/category',categoryRoutes);
app.use('/api/v1/tags',tagRoutes)


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
})