const http = require("http")
const fs = require("fs")

const server = http.createServer((req,res)=>{
    let file = ""
    switch(req.url){
        case "/":
        file = "home.html"
        break;

         case "/about":
        file = "about.html"
        break;

         case "/contact":
        file = "contact.html"
        break;

        default:
            break;
    }

 fs.readFile(file,(err,data)=>{
    if(!err){
        res.end(data)
    }
 })
})


server.listen(9090,(err)=>{
  if(err){
    console.log("server is not running",err)
    return;
  }
  console.log("server is running")
})