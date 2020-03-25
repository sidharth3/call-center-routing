var mongoose = require('mongoose');
 var dbUrl = "mongodb+srv://dbSidharth:dbSidharth@cluster0-rhq0q.mongodb.net/test?retryWrites=true&w=majority"
mongoose.connect(dbUrl, { useNewUrlParser: true }, (err) => {
  console.log('mongodb connected', err);
})
var db = mongoose.connection;
//db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connection to database successful");
    // define Schema
    var agentSchema = mongoose.Schema({
      id: Number,
      available: Boolean,
      service: Number,
      online: Boolean,
      department: String
    });
    var agent = mongoose.model('agent', agentSchema, 'agentCollection');
    var agent1 = new agent({  id: 10, available: true, service:0, online: true, department: 'Phone' });
    agent1.save(function (err, agent) {
      if (err) return console.error(err);
      console.log(agent.id + " saved to agent collection.");
    });
});
