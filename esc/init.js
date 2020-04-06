let rainbowReady = false;
let agentCount = 0;

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
        appID: "b61d1e604d9c11ea819a43cb4a9dae9b",
        appSecret:
            "t9EcSl9Df3qUGJBhdVMhS9UVavSwd6mttfT2hHW8A1310V6b6gy7FOzav3gWcpUC"
    },
    // Logs options
    logs: {
        enableConsoleLogs: false,
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
    initAgentStatusAll();
});

rainbowSDK.events.on("rainbow_onstopped", () => {
    console.log("RAINBOW STOPPED");
    rainbowReady = false;
});

rainbowSDK.events.on("rainbow_oncontactpresencechanged", contact => {
    onAgentStatusChange(contact.id, contact.presence);
});

const getRainbowReady = () => {
    return rainbowReady;
};

const getRainbowSDK = () => {
    return rainbowSDK;
};

const initAgentStatusAll = async () => {
    let contacts = await rainbowSDK.contacts.getAll();
    agentCount = contacts.length - 1;
    for (contact of contacts) {
        if (!contact.adminType) {
            initAgentStatus(contact.id, contact.presence);
        }
    }
};

const initAgentStatus = async (id, presence) => {
    // if (presence === "online") {
        await databaseManager.setAgentOnline(id);
        await databaseManager.setAgentAvailable(id);
        console.log(`Agent ${id} set to online`);
    // } else {
    //     await databaseManager.setAgentUnavailable(id);
    //     await databaseManager.setAgentOffline(id);
    //     console.log(`Agent ${id} set to offline`);
    // }
    agentCount -= 1;
    if (agentCount === 0) {
        rainbowReady = true;
        console.log("All agent statuses set, Allocabl is ready");
    }
};

const onAgentStatusChange = async (id, presence) => {
    if (presence === "online") {
        await databaseManager.setAgentOnline(id);
        await databaseManager.setAgentAvailable(id);
        console.log(`Agent ${id} set to online`);
        let rows = await databaseManager.getAgentDepartment(id);
        socketEvents.checkWaitlist(rows[0].department);
    } else {
        await databaseManager.setAgentUnavailable(id);
        await databaseManager.setAgentOffline(id);
        console.log(`Agent ${id} set to offline`);
        let rows = await databaseManager.getAgentDepartment(id);
        let waiters = await databaseManager.getDepartmentWaitlist(
            rows[0].department
        );
        databaseManager.clearDepartmentWaitlist(rows[0].department);
        for (waiting of waiters) {
            let socket = global.io.sockets.connected[waiting.socket_id];
            socket.emit("customError", "all agents have gone offline");
        }
    }
};

module.exports = { getRainbowReady, getRainbowSDK };

const databaseManager = require("./dbmanager");
const socketEvents = require("./socketEvents");
