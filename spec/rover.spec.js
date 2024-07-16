const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {
  
  // generate Rover object with specified position
  let rover = new Rover(98382);
  // generate Command object
  let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
  // generate Message object with specified name and move command
  let message = new Message("Test message with two commands", commands);
  // generate response calling receiveMessage method on Rover object with message
  let response = rover.receiveMessage(message);

  //test 7
  it("constructor sets position and default values for mode and generatorWatts", function(){
    let rover = new Rover(98382);
    expect(rover.position).toEqual(98382);
    expect(rover.mode).toEqual("NORMAL");
    expect(rover.generatorWatts).toEqual(110);
  });

  //test 8
  it("response returned by receiveMessage contains the name of the message", function(){
    expect(response.message).toEqual("Test message with two commands");
  });

  //test 9
  it("response returned by receiveMessage includes two results if two commands are sent in the message", function(){
    expect(response.results.length).toEqual(commands.length);
  });

  //test 10
  it("responds correctly to the status check command", function(){
    let commands = [new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message);
    expect(response.results).toEqual([{completed: true, roverStatus: {mode: 'NORMAL', generatorWatts: 110, position: 98382}}]);
  });

  //test 11
  it("responds correctly to the mode change command", function(){
    expect(response.results[0]).toEqual({completed:true});
    expect(rover.mode).toEqual('LOW_POWER');
  });

  //test 12
  it("responds with a false completed value when attempting to move in LOW_POWER mode", function(){
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 1234)];
    let message = new Message('Test message name', commands);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message);
    expect(response.results[1]).toEqual({completed:false});
     // confirm rover's position is unchanged
     //expect(rover.position).toEqual(98382);
     expect(rover.mode).toEqual("LOW_POWER");
  });

  //test 13
  it("responds with the position for the move command", function(){
    // generate command with commandType 'MOVE' and new position value 12345
    let commands = [new Command("MOVE", 12345)];
    // generate Message object with specified name and move command
    let message = new Message("Test move command", commands);
    // generate Rover object with specified position
    let rover = new Rover(98382); // pass 98382 position parameter value
    // generate response calling receiveMessage method on Rover object with message
    let response = rover.receiveMessage(message);
    // confirm move command completed successfully
    expect(response.results[0].completed).toBe(true);
    // confirm rover's position updated to new position value
    expect(rover.position).toEqual(12345);
  });

});
