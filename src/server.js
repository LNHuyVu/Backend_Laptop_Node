// git remote remove origin
import bodyParser from 'body-parser';
import viewEngine from './config/viewEngine';
import initWebRoutes from './route/web';
// import connectDB from './config/connectDB'
// import cors from 'cors'
require ('dotenv').config();
//
const cors = require('cors');
const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
//
const cookieParser=require('cookie-parser')
// const morgan = require('morgan');
const express = require('express');

const app = express();
//Cors
app.use(cors(corsOptions));
// app.use(cors({ credentials: true, origin: true }));
//Orther Use Cors
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', process.env.REACT_APP_FRONTEND_URL);

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  // res.setHeader('Access-Control-Allow-Origin: *' )

  // Pass to next layer of middleware
  next();
});

//HTTP logger
// app.use(morgan('combined'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//Cookie
app.use(cookieParser());
viewEngine(app);
initWebRoutes(app);

// connectDB();


//
let port=process.env.PORT || 6969;
app.listen(port, () => {
  console.log(`Backend nodejs at http://localhost:${port}`)
})