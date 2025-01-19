const http=require("http");
const app=require("./app");
const port=process.env.PORT || 3000; // Defaults to 3000 if process.env.PORT is not set
const { initializeSocket } = require('./socket');


const server=http.createServer(app);

initializeSocket(server);

const connectDB=require("./configure/db");
//firstly database connection then server connection
connectDB().then(()=>{
    console.log("connected to db");
    server.listen(port,()=>{
        console.log(`server is running on ${port}`);
    });
})
.catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
