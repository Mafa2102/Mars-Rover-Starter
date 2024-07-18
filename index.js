const Rover = require('./rover.js');
const Message = require('./message.js');
const Command = require('./command.js');

//// generate Command object
let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
// generate Message object with specified name and move command
let message = new Message('Test message with two commands', commands);
// Passes 98382 as the rover's position.
let rover = new Rover(98382);    
// generate response calling receiveMessage method on Rover object with message
let response = rover.receiveMessage(message);

console.log(response);
console.log(response.results);
console.log(response.results[1].roverStatus);