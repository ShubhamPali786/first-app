/** named require import */
// const logger = require("./logger");

// logger.log("test message");

// inbuild module

const fs = require("fs");

fs.readdir("./",function(err,files){
    if(err)
        console.log(`${err}`);
    console.log(files);
})

// events

const Logger = require("./logger");
const logger = new Logger();
//register a listener
logger.addListener('messagelogging',(args)=>{
    console.log(`message logged`,args);
})

logger.log("testing");


// http module

const http = require('http');

const server = http.createServer((req,res)=>{

    if(req.url === '/'){
        res.write('hello world');
        res.end();
    }

    if(req.url === '/api/courses'){
        res.write(JSON.stringify([1,2,3]));
        res.end();
    }
})

server.listen(3000);

