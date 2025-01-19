const dotenv = require("dotenv");
dotenv.config(); // This loads environment variables from the .env file
const express=require("express");
/*
---CORS is used to handle cross-origin requests.
---It allows your React frontend to communicate with your Express backend when they are running on different ports.
---The cors() middleware enables this functionality in your Express server. */

const cors=require("cors");
const app=express();
const cookieParser=require("cookie-parser");
const userRoutes=require("./routes/user.routes");
const captainRoutes=require("./routes/captain.routes");
const mapRoutes=require("./routes/maps.routes");

const rideRoutes=require("./routes/ride.routes");

  
  app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());





app.get('/',(req,res)=>{
    res.send("hello world");
});
app.use("/users",userRoutes);
app.use("/captains",captainRoutes);
app.use("/maps",mapRoutes)
app.use("/rides",rideRoutes)


module.exports=app;