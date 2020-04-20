// var express = require('express');
// var bodyParser = require('body-parser')
// var app = express();
// var http = require('http').Server(app);
// var io = require('socket.io')(http);
// var mongoose = require('mongoose');

// app.use(express.static(__dirname));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }))

// var Message = mongoose.model('Message', {
//     name: String,
//     message: String
// })

// var dbUrl = "mongodb+srv://dbSidharth:dbSidharth@cluster0-rhq0q.mongodb.net/test?retryWrites=true&w=majority"

// app.get('/messages', (req, res) => {
//     Message.find({}, (err, messages) => {
//         res.send(messages);
//     })
// })


// app.get('/messages/:user', (req, res) => {
//     var user = req.params.user
//     Message.find({ name: user }, (err, messages) => {
//         res.send(messages);
//     })
// })


// app.post('/messages', async (req, res) => {
//     try {
//         var message = new Message(req.body);

//         var savedMessage = await message.save()
//         console.log('saved');

//         var censored = await Message.findOne({ message: 'badword' });
//         if (censored)
//             await Message.remove({ _id: censored.id })
//         else
//             io.emit('message', req.body);
//         res.sendStatus(200);
//     }
//     catch (error) {
//         res.sendStatus(500);
//         return console.log('error', error);
//     }
//     finally {
//         console.log('Message Posted')
//     }
// });


// io.on('connection', () => {
//     console.log('a user is connected')
// })

// mongoose.connect(dbUrl, { useMongoClient: true }, (err) => {
//     console.log('mongodb connected', err);
// })

// var server = http.listen(3000, () => {
//     console.log('server is running on port', server.address().port);
// });

// const loginGuest = async() =>{
//     if(init.getRainbowReady()){
//         try{
//             let user = await init.getRainbowSDK().admin.createAnonymousGuestUser();
//             let json = await rainbowInit.getRainbowSDK().admin.askTokenOnBehalf(user.loginEmail, user.password);
//         }
//         catch(err){
//             console.log(err);
//         }

//     }
// }


// const init = require("./init");
const express = require("express");
const app = express();
const port = 3000;
const http = require("http").createServer(app);
global.io = require("socket.io")(http);

const socketEvents = require("./socketEvents");

app.use(express.static("public"));

http.listen(port, () => console.log(`App listening on port ${port}!`));

io.on("connection", socket => {
    console.log(`a user with socket id ${socket.id} connected`);
    socket.on("disconnect", () => socketEvents.disconnect(socket));
    socket.on("loginGuest", department =>
        socketEvents.loginGuest(socket, department)
    );
});