// server.js
const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./src/rail-madad-backend/routes/auth');
const router = require('./src/rail-madad-backend/routes/route');
const session = require("express-session");
const passport = require("passport");
const OAuth2Strategy = require("passport-google-oauth2").Strategy;
const User = require('./src/rail-madad-backend/models/User');

dotenv.config();
const app = express();


const clientId = process.env.GOOGLE_CLIENT_ID;
const clientsecret = process.env.GOOGLE_CLIENT_SECRET;
// Connect to the database
connectDB();
app.use(cors({
  origin: "http://localhost:3000",
  methods:"GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials:true,
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));

app.use(express.json({ limit: '10mb' })); // Increase limit for JSON payloads
app.use(express.urlencoded({ limit: '10mb', extended: true })); // Increase limit for URL-encoded payloads

app.use('/api/auth', authRoutes);
app.use('/api/auth', router);

// Middleware

app.options('*', cors());

app.use(session({
  secret:process.env.HELLO,
  resave:false,
  saveUninitialized:true
}))

app.use((req, res, next) => {
  console.log('Request body:', req.body);
  next();
});

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  });
  
  // Add this in your server.js to log errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

//setup passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new OAuth2Strategy({
    clientID:clientId,
    clientSecret:clientsecret,
    callbackURL:"/auth/google/callback",
    scope:["profile", "email"]
  },
async(accessToken,refreshToken,profile,done)=>{
  console.log("profile",profile)
  try {
    let user = await User.findOne({googleId: profile.id});

    if(!user) {

      let existingUser = await User.findOne({ email: profile.emails[0].value });
      
      if (existingUser) {
        existingUser.googleId = profile.id;
        user = await existingUser.save();
      } else {
      user = new User({
        googleId: profile.id,
        username: profile.displayName,
        email: profile.emails[0].value,
        image: profile.photos[0].value
      });

      await user.save();
    }
  }

    return done(null,user)
  } catch (error) {
    return done(error,null)
  }
})
);

passport.serializeUser((user,done)=>{
  done(null,user);
});

passport.deserializeUser((user,done)=>{
  done(null,user);
});

//initial google oauth login
app.get("/auth/google",passport.authenticate("google",{scope:["profile","email"]}));

app.get("/auth/google/callback",passport.authenticate("google",{
  successRedirect:"http://localhost:3000",
  failureRedirect:"http://localhost:3000/api/auth/register"
}))

app.get("/login/success", async(req,res)=>{
  console.log("reqqq",req.user);

  if(req.user){
    res.status(200).json({message:"user Login", user:req.user})
  }else{
    res.status(400).json({message:"Not Authorized"})
  }
})

app.get("/auth/logout", (req, res) => {
  req.logout(err => {
    if (err) { return next(err); }
    res.redirect("http://localhost:3000");
  });
});



// Routes

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});