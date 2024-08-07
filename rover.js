class Rover {
   constructor(position, mode, generatorWatts){
      // constructor sets position to provided argument
      this.position = position; // position is a number
      // constructor sets mode to fixed default "NORMAL"
      this.mode = "NORMAL";
      // constructor sets generatorWatts to fixed default 110
      this.generatorWatts = 110; // default watts = 100
   }
   receiveMessage(message){
    // create response object with values message.name and an empty array for results
      let response = {
         message: message.name,
         results: []
      }

      const commands = message.commands;

      // let roverStatus={
      //    mode: this.mode,
      //    generatorWatts: this.generatorWatts,
      //    position: this.position
      //  }
    
      // iterate each command in message
   for(let i=0; i<message.commands.length; i++) {
    // respond to commandType STATUS_CHECK
      if(commands[i].commandType === "STATUS_CHECK"){
        // push results object with rover status
        response.results.push({completed:true, roverStatus:{mode: this.mode, generatorWatts: this.generatorWatts, position: this.position}})
      }
      // respond to commandType MODE_CHANGE
      else if (commands[i].commandType === "MODE_CHANGE") {
        this.mode = commands[i].value; // updating rover's mode to a new value specified in command
        response.results.push({completed:true})
      }
      // respond to commandType MOVE
      else if (commands[i].commandType === "MOVE"){
        if(this.mode === "LOW_POWER") {
          response.results.push({completed:false});
        } else {
         this.position = commands[i].value;
         response.results.push({completed:true})
        }
      }
    }
    return response; 
   }   
}


module.exports = Rover;