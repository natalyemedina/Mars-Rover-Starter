class Rover {
   constructor(position) {
      this.position = position;
      this.mode = 'NORMAL';
      this.generatorWatts = 110;
   }

   receiveMessage(message) {
      const results = message.commands.map(command => {
         switch (command.commandType) {
            case 'MODE_CHANGE':
               this.mode = command.value;
               return { completed: true };
            case 'STATUS_CHECK':
               return {
                  completed: true,
                  roverStatus: {
                     mode: this.mode,
                     generatorWatts: this.generatorWatts,
                     position: this.position
                  }
               };
            case 'MOVE':
               if (this.mode === 'LOW_POWER') {
                  return { completed: false };
               } else {
                  this.position = command.value;
                  return { completed: true };
               }
            default:
               return { completed: false };
         }
      });

      return {
         message: message.name,
         results: results
      };
   }
}


module.exports = Rover;