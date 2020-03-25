let rainbowReady = false;
var totalAgents = 0;
// Load the SDK
let RainbowSDK = require("rainbow-node-sdk");

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
        file: {
            path: "/var/tmp/rainbowsdk/",
            level: "debug"
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

rainbowSDK.events.on("rainbow_onready", () => {
    console.log("RAINBOW IS READY");
    rainbowReady = true;
    setAgentsAvailable();
});

rainbowSDK.events.on("rainbow_onstopped", () => {
    console.log("RAINBOW STOPPED");
    rainbowReady = false;
});

// rainbowSDK.events.on("rainbow_oncontactpresencechanged", contact => {
//     onAgentStatusChange(contact.id, contact.presence);
// });

const getRainbowReady = () => {
    return rainbowReady;
};

const getRainbowSDK = () => {
    return rainbowSDK;
};

const setAgentsAvailable = async() =>{
    let agents = await rainbowSDK.contacts.getAll();
    totalAgents = agents.length - 1;
    for (agent in agents){
        initAgent(agent.id, agent.presence);
    }
};
const initAgent = async(id, presence) =>{
    if(presence == 'online'){
        await dbManager.setAgentOnline(id);
        await dbManager.setAgentAvailable(id);
        console.log('Agent${id} set to online');
    }
    else{
        await dbManager.setAgentUnavailable(id);
        await dbManager.setAgentOffline(id);
        console.log(`Agent ${id} set to offline`);
    }
    totalAgents -=1;
    if(totalAgents == 0){
        rainbowReady = true;
        console.log("System is ready! All agents initialized!")
    }
}

const dbManager = require("./dbmanager");
module.exports = {getRainbowReady, getRainbowSDK};


