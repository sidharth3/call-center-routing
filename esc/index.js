// let RainbowSDK = require("rainbow-node-sdk");
// let rainbowReady = false;
// // Define your configuration
// let options = {
//     rainbow: {
//         host: "sandbox"
//     },
//     credentials: {
//         login: "praveenkumar@mymail.sutd.edu.sg", // To replace by your developer credendials
//         password: "nkVo'vS7Jp\"7" // To replace by your developer credentials
//     },
//     // Application identifier
//     application: {
//         appID: "9fcbc0605a2d11eabf7e77d14e87b936",
//         appSecret: "dN3PH9XbCrxRe39OeJdYBkhrEKt8om7jm0iAvnHTwhVT40Hc1tUmdSaalUM5C3d9"
//     },
//     // Logs options
//     logs: {
//         enableConsoleLogs: true,
//         enableFileLogs: false,
//         "color": true,
//         "level": 'debug',
//         "customLabel": "vincent01",
//         "system-dev": {
//             "internals": false,
//             "http": false,
//         }, 
//         file: {
//             path: "/var/tmp/rainbowsdk/",
//             customFileName: "R-nSDK-Node-Sample2",
//             level: "debug",
//             zippedArchive : false/*,
//             maxSize : '10m',
//             maxFiles : 10 // */
//         }
//     },
//     // IM options
//     im: {
//         sendReadReceipt: true
//     }
// };

// // Instantiate the SDK
// let rainbowSDK = new RainbowSDK(options);

// // Start the SDK
// rainbowSDK.start();

// rainbowSDK.events.on('rainbow_onready', function() {
//     // do something when the SDK is connected to Rainbow
//     console.log("Everything works!");
//     // rainbowReady = true;
//     // if (rainbowReady) {
//     //     rainbowSDK.admin
//     //         .createAnonymousGuestUser()
//     //         .then(user => {
//     //             rainbowSDK.admin
//     //                 .askTokenOnBehalf(user.loginEmail, user.password)
//     //                 .then(json => {
//     //                     console.log(json);
//     //                     res.send(json.token);
//     //                 })
//     //                 .catch(err => {
//     //                     console.log(err);
//     //                 });
//     //         })
//     //         .catch(err => {
//     //             console.log(err);
//     //         });
//     // } else {
//     //     res.status(400).send("server not ready");
//     // }

// });
// rainbowSDK.events.on("rainbow_onmessagereceived", (message) => {
//     // Check if the message is not from you
//     if(!message.fromJid.includes(rainbowSDK.connectedUser.jid_im)) {
//         // Check that the message is from a user and not a bot
//         if( message.type === "chat") {
//             // Answer to this user
//             rainbowSDK.im.sendMessageToJid("hello! How may I help you?", message.fromJid);
//             // Do something with the message sent
            
//         }
//     }
// });

// rainbowSDK.events.on('rainbow_onerror', function(err) {
//     // do something when something goes wrong
//     console.log("Oops!")
// });

let RainbowSDK = require("rainbow-node-sdk");
var userList = [{name: "Josiah C" ,email: "josiah@gmail.com" , "ID" :"5e317abbb4528bf4a00c92ad" , "JID": "aa9dff18ce52460489d44b4b6c80bd16@sandbox-all-in-one-rbx-prod-1.rainbow.sbg" , "busy":false , "skill":3}
             ,  {name: "Teck Leck" ,email: "teckleck@gmail.com" , "ID" : "5e5recc7rc332176648fcec4" , "JID":"2e809a000f564159br3cad98341f426a@sandbox-all-in-one-rbx-prod-1.rainbow.sbg" , "busy":false , "skill":4 }];
var index = 0;
function createOptions(){

    let newopt = {
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
    return newopt;
}
var options = createOptions();

// Instantiate the SDK
let rainbowSDK = new RainbowSDK(options);

// Start the SDK
rainbowSDK.events.on("rainbow_onready", () => {
    
    // Get your network's list of contacts
    let contacts = rainbowSDK.contacts.getAll();
    //Josiah is  '5e5b88c36c332176648fdd51'
    rainbowSDK.contacts.getContactById("5e58fb496c332176648fd559").then((contact) => {
        if(contact) {
            // Do something with the contact found
            console.log("SUPFROMTHEOTHERSIDE");
           // console.log(contact);
        }
        else {
            // Do something if the contact has not been found (id should be incorrect)
            console.log("not foudn sia");
        }
    }).catch((err) => {
        // Do something in case of failure
        console.log("error lorh");
    });
    
    // Do something with this list
    console.log("HELLOFROMTHEOTHERSIDE");
    //console.log(contacts);
    
});

rainbowSDK.start();
rainbowSDK.events.on('rainbow_onready', function() {
    // do something when the SDK is connected to Rainbow
    console.log("Everything works!");
    rainbowReady = true;
});

rainbowSDK.events.on('rainbow_onmessagereceived', (message) => {
    
    // Check if the message comes from a user

    let msg =message.conversation.lastMessageText;
    console.log(message.fromJid);

    switch(msg){
case "hi":
rainbowSDK.im.sendMessageToJid("hello! How may I help you?", message.fromJid);
break
case "my shopping cart is always empty":
rainbowSDK.im.sendMessageToJid("hit refresh on the top right should fix, if not call hotline 83838333", message.fromJid);
break;
case "broken product arrived":
rainbowSDK.im.sendMessageToJid("refund will be provided. send pics to help@sutdlols.com", message.fromJid);
break;
case "contact details":
rainbowSDK.im.sendMessageToJid("contact: 38383838, email : sutdldlld@mamam.com", message.fromJid);
break;
case "thank you":
rainbowSDK.im.sendMessageToJid("hope you have a great day!", message.fromJid);
break;
default:
rainbowSDK.im.sendMessageToJid("invalid question", message.fromJid);
   break; }
   
    

//rainbowSDK.im.sendMessageToJid("I AM BUSY", message.fromJid);
    //console.log(message.conversation.Conversation.contact.lastMessageText);
});
