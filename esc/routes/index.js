var express = require('express');
var router = express.Router();
let RainbowSDK = require("rainbow-node-sdk");
let rainbowReady = false;
// Define your configuration
let options = {
    rainbow: {
        host: "sandbox"
    },
    credentials: {
        login: "praveenkumar@mymail.sutd.edu.sg", // To replace by your developer credendials
        password: "nkVo'vS7Jp\"7" // To replace by your developer credentials
    },
    // Application identifier
    application: {
        appID: "9fcbc0605a2d11eabf7e77d14e87b936",
        appSecret: "dN3PH9XbCrxRe39OeJdYBkhrEKt8om7jm0iAvnHTwhVT40Hc1tUmdSaalUM5C3d9"
    },
    // Logs options
    logs: {
        enableConsoleLogs: true,
        enableFileLogs: false,
        "color": true,
        "level": 'debug',
        "customLabel": "vincent01",
        "system-dev": {
            "internals": false,
            "http": false,
        }, 
        file: {
            path: "/var/tmp/rainbowsdk/",
            customFileName: "R-nSDK-Node-Sample2",
            level: "debug",
            zippedArchive : false/*,
            maxSize : '10m',
            maxFiles : 10 // */
        }
    },
    // IM options
    im: {
        sendReadReceipt: true
    }
};

// Instantiate the SDK
let rainbowSDK = new RainbowSDK(options);

// Start the SDK
rainbowSDK.start();
rainbowSDK.events.on('rainbow_onready', function() {
  // do something when the SDK is connected to Rainbow
  console.log("Everything works!");
  rainbowReady = true;
  // if (rainbowReady) {
  //     rainbowSDK.admin
  //         .createAnonymousGuestUser()
  //         .then(user => {
  //             rainbowSDK.admin
  //                 .askTokenOnBehalf(user.loginEmail, user.password)
  //                 .then(json => {
  //                     console.log(json);
  //                     res.send(json.token);
  //                 })
  //                 .catch(err => {
  //                     console.log(err);
  //                 });
  //         })
  //         .catch(err => {
  //             console.log(err);
  //         });
  // } else {
  //     res.status(400).send("server not ready");
  // }

});
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/login', function(req, res, next){
  if(rainbowReady){
    rainbowSDK.admin.createAnonymousGuestUser()
          .then(user => {
              rainbowSDK.admin
                  .askTokenOnBehalf(user.loginEmail, user.password)
                  .then(json => {
                      console.log(json);
                      //res.send(json.token);
                      rainbowSDK.contacts.searchById("5e58fb496c332176648fd55")
                      .then(contact => {
                        console.log(contact)
                        if(contact){
                          rainbowSDK.conversations.openConversationForContact(contact)
                          .then(conversation => {
                            console.log(conversation);
                            rainbowSDK.im.sendMessageToConversation(conversation, "Hello")
                          });
                        }
                      })
                  })
                  .catch(err => {
                      console.log(err);
                  });
          })
          .catch(err => {
              console.log(err);
          });
  } else {
      res.status(400).send("server not ready");
  }
});





module.exports = router;
// agent1@gmail.com Agent 1 Agent1@@##
//daryll@gmail.com Daryll11@@## Daryll Wong