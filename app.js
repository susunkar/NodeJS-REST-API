const express = require('express');
const app = express();
const morgan = require('morgan'); //for log the requests
const bodyparser = require('body-parser'); //reading the request body for POST req
const mongoose = require('mongoose')


const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

mongoose.connect(
    'mongodb+srv://ssunkarak:' + process.env.MONGO_ATLAS_PW + '@cluster0.2vrbs.mongodb.net/<dbname>?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);


//log 
app.use(morgan('dev')); 
//request body
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

//CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Header",
        "Origin,X-Requested-With, Contect-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "*");
        return res.status(200).json({});
    }
    next();
})
//Router
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status=404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});
module.exports = app;