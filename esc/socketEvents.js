const disconnect = async socket => {
    console.log(`a user with socket id ${socket.id} disconnected`);
    try {
        let rows = await databaseManager.getDepartment(socket.id);
        let result = await databaseManager.removeSocketAgent(socket.id);
        console.log(
            `customerSocket ${socket.id} removed successfully from database`
        );
        if (rows.length != 0) {
            // Talking to agent, get the next person in queue
            checkWaitlist(rows[0].department);
        } else {
            // Not talking to agent, remove from queue if queueing
            databaseManager.removeFromAllWaitlistsById(socket.id);
        }
    } catch (err) {
        console.log(err);
    }
};

const loginGuest = async (socket, department) => {
    if (rainbowInit.getRainbowReady()) {
        try {
            let online = await databaseManager.checkDepartmentOnline(
                department
            );
            if (online.length != 0) {
                let rows = await databaseManager.getAgent(department);
                if (rows.length != 0) {
                    let result = await databaseManager.setAgentUnavailable(
                        rows[0].id
                    );
                    result = await databaseManager.incrementCustomersServed(
                        rows[0].id
                    );
                    result = await databaseManager.addSocketAgent(
                        rows[0].id,
                        socket.id
                    );
                    console.log(
                        `AgentID ${rows[0].id} retrieved from database and assigned`
                    );
                    try {
                        let user = await rainbowInit
                            .getRainbowSDK()
                            .admin.createAnonymousGuestUser();
                        let json = await rainbowInit
                            .getRainbowSDK()
                            .admin.askTokenOnBehalf(
                                user.loginEmail,
                                user.password
                            );
                        socket.emit("loginInfo", {
                            token: json.token,
                            agentID: rows[0].id
                        });
                        console.log(
                            `AgentID ${rows[0].id} and guest token sent to client`
                        );
                    } catch (err) {
                        console.log(err);
                        socket.emit("customError", "SDK error");
                    }
                } else {
                    console.log("All agents busy");
                    result = await databaseManager.addWaitList(
                        department,
                        socket.id
                    );
                    socket.emit(
                        "waitList",
                        "All agents busy! Added to waitlist!"
                    );
                }
            } else {
                console.log("No agent online");
                socket.emit("customError", "no agent online");
            }
        } catch (err) {
            console.log(err);
            socket.emit("customError", "databaseError");
        }
    }
     else {
        console.log("server not ready");
        socket.emit("customError", "server not ready");
    }
};

const checkWaitlist = async department => {
    let nextInList = await databaseManager.getFromWaitList(department);
    //console.log(nextInList);
    if (nextInList.length != 0) {
        await databaseManager.removeFromWaitList(department);
        console.log(global.io.sockets.connnected)
        let socket = global.io.sockets.connected[nextInList[0].socket_id];
        
        //console.log(socket);
        // socket.emit(
        //     "agentAvailable",
        //     `An agent is now available! Connecting you to a ${department} agent...`
        // );
        loginGuest(socket, department);
    }
};

module.exports = { disconnect, loginGuest, checkWaitlist };

const rainbowInit = require("./init");
const databaseManager = require("./dbmanager");
