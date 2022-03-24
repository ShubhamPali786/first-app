
const EventEmitter = require("events");

class Logger extends EventEmitter{
   
    log = (message) => {
        console.log(message);
        
        this.emit('messagelogging',{message:"test message"});
    }
    
}


module.exports = Logger;