//This class builds an object with two properties: constructor(commandType, value)
//commandType is a string that represents the type of command. 
// a command type will be one of the following: MODE_CHANGE, MOVE, or STATUS_CHECK.

class Command {
   constructor(commandType, value) {
     this.commandType = commandType;
     if (!commandType) {
       throw Error("Command type required.");
     }
     this.value = value;
   }
 
 }
 
 module.exports = Command;