const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');
//const { it } = require('test');
//const { hasUncaughtExceptionCaptureCallback } = require('process');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  it("constructor sets position and default values for mode and generatorWatts", function() {
    const rover = new Rover(98382);
    expect(rover.position).toBe(98382);
    expect(rover.mode).toBe('NORMAL');
    expect(rover.generatorWatts).toBe(110);
  });

  it("response returned by receiveMessage contains the name of the message", function() {
    const commands = [new Command('STATUS_CHECK')];
    const message = new Message('Test Message', commands);
    const rover = new Rover(98382);
    const response = rover.receiveMessage(message);
    expect(response.message).toBe('Test Message');
  });

  it("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    const commands = [
      new Command('MODE_CHANGE', 'LOW POWER'),
      new Command('STATUS_CHECK')
    ];
    const message = new Message('Test Message', commands);
    const rover = new Rover(98382);
    const response = rover.receiveMessage(message);
    expect(response.results.length).toBe(2);
  });

  it("responds correctly to the status check command", function() {
    const commands = [new Command('STATUS_CHECK')];
    const message = new Message('Test Message', commands);
    const rover = new Rover(98382);
    const response = rover.receiveMessage(message);
    expect(response.results[0].completed).toBe(true);
    expect(response.results[0].roverStatus).toEqual({
      mode: 'NORMAL',
      generatorWatts: 110,
      position: 98382
    });
  });

  it("responds correctly to the mode change command", function() {
    const commands = [new Command('MODE_CHANGE', 'LOW_POWER')];
    const message = new Message('Test Message', commands);
    const rover = new Rover(98382);
    const response = rover.receiveMessage(message);
    expect(response.results[0].completed).toBe(true);
    expect(rover.mode).toBe('LOW_POWER');
  });

  it("responds with a false completed value when attempting to move in LOW_POWER mode", function() {
    const rover = new Rover(98382);
    rover.mode = 'LOW_POWER';
    const commands = [new Command('MOVE', 10000)];
    const message = new Message('Test Message', commands);
    const response = rover.receiveMessage(message);
    expect(response.results[0].completed).toBe(false);
    expect(rover.position).toBe(98382);
  });

  it("responds with the position for the move command", function() {
    const commands = [new Command('MOVE', 10000)];
    const message = new Message('Test Message', commands);
    const rover = new Rover(98382);
    const response = rover.receiveMessage(message);
    expect(response.results[0].completed).toBe(true);
    expect(rover.position).toBe(10000);
  });

});  


