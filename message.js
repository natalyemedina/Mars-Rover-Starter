class Message {
   constructor(name, commands) {
      if (!name) {
         throw new Error("Name is required.");
      }
      if (!Array.isArray(commands)) {
         throw new Error("Commands should be an array.");
      }
      this.name = name;
      this.commands = commands;
   }
}

module.exports = Message;