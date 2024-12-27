
require("dotenv").config()
const express = require('express')
const app = express();
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const session = require('express-session');
const flash = require('connect-flash');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose')
const passport = require('passport')
const path = require('path')
const { ensureAuthenticated} = require('./config/auth'); 

// Route definitions
const homeRouter = require('./routes/home');
const mediaRouter = require('./routes/media');
const authRouter = require('./routes/auth')

const dashboardPostRouter = require('./routes/dashboardPost')
const dashboardGetRouter = require('./routes/dashboardGet')
////////////database connection////////////


const localDB = "mongodb://127.0.0.1:27017/EngRegulatoryBoard"
const liveDB = "mongodb+srv://Engineering:96EceAsGquKn3aLt@cluster0.cq29s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster096EceAsGquKn3aLt"
mongoose.set('strictQuery', true);


mongoose.connect(liveDB,{useNewUrlParser: true}).then(() => {
  console.log('database is connected')
}).catch((err) => console.log('error connecting to database ', err))
  

// Server setup
// require('./config/passport')(passport);

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views/')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))
app.use(express.urlencoded({ extended: true }))
app.use(express.json());


app.set('trust proxy', 1);

 // Session configuration
const sessionStore = MongoStore.create({ 
mongoUrl: liveDB,
  ttl: 14 * 24 * 60 * 60 // 14 days
});


// app.use(limiter);

app.use(session({
  secret: process.env.SESSION_SECRET || 'mysecret',
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: { secure: process.env.NODE_ENV === 'production' }
}));
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

app.use(flash());
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());


// Routes
app.use('/',homeRouter);
app.use('/media',mediaRouter);
app.use('/auth', authRouter);
app.use('/dashboard',ensureAuthenticated, dashboardPostRouter);
app.use('/dashboard',ensureAuthenticated, dashboardGetRouter);


app.listen(process.env.PORT || 3336, () => console.log('Server is Running on port: 3336'))


