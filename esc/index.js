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
    if (rainbowReady) {
        rainbowSDK.admin
            .createAnonymousGuestUser()
            .then(user => {
                rainbowSDK.admin
                    .askTokenOnBehalf(user.loginEmail, user.password)
                    .then(json => {
                        console.log(json);
                        res.send(json.token);
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
rainbowSDK.events.on("rainbow_onmessagereceived", (message) => {
    // Check if the message is not from you
    if(!message.fromJid.includes(rainbowSDK.connectedUser.jid_im)) {
        // Check that the message is from a user and not a bot
        if( message.type === "chat") {
            // Answer to this user
            rainbowSDK.im.sendMessageToJid("hello! How may I help you?", message.fromJid);
            // Do something with the message sent
            
        }
    }
});

rainbowSDK.events.on('rainbow_onerror', function(err) {
    // do something when something goes wrong
    console.log("Oops!")
});