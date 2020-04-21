import { rainbowInit } from "./modules/rainbowWebHelpers.js";
import { customError, loginInfo } from "./modules/socketEventsClient.js";
import { initialPrompt, connected, textInput } from "./modules/botUIHelpers.js";

/* Wait for the page to load */
$(function () {
    rainbowInit();

    const botui = new BotUI("allocablPrompt");

    const socket = io({ autoConnect: false });

    var msgCount = 0;
    let warningCount = 0;
    let next = true;

    setInterval(resetMessageCount, 5000);

    function resetMessageCount() {
        msgCount = 0;
    }

    const reprompt = async () => {
        let dept = await initialPrompt(botui);
        if (dept) socket.emit("loginGuest", dept);
    };

    const forceDisconnect = async (conversation) => {
        next = false;
        socket.disconnect(true);
        await rainbowSDK.im.sendMessageToConversation(
            conversation,
            "Successfully disconnected."
        );
        await rainbowSDK.connection.signout();
        await botui.message.add({ content: "Multiple Spam Attacks detected! You have been disconnected." });
        await botui.action.hide();
    };

    const processInput = async (input, conversation) => {
        msgCount++;
        if (msgCount < 10) {
            console.log(input);
            rainbowSDK.im.sendMessageToConversation(conversation, input);
        } else {
            await botui.message.add({
                content:
                    "Spam attempt detected! Please send only 10 messages every 5 seconds.",
            });
            if (msgCount === 10) {
                warningCount++;
                if (warningCount === 3) {
                    await forceDisconnect(conversation);
                }
            }
        }
    };
    
    socket.on("loginInfo", async (info) => {
        let conversation = await loginInfo(rainbowSDK, info);
        await connected(botui);
        while (next) {
            let input = await textInput(botui);
            await processInput(input.value, conversation);
        }
    });

    socket.on("customError", async (msg) => {
        customError(msg);
        await botui.message.add({ content: msg });
        reprompt();
    });
    socket.on("waitList", async (msg) => {
        await botui.message.add({ content: msg });
    });
    socket.on("agentAvailable", async (msg) => {
        await botui.message.add({ content: msg });
    });

    /* Listen to the SDK event RAINBOW_ONREADY */
    document.addEventListener(rainbowSDK.RAINBOW_ONREADY, async () => {
        console.log("[DEMO] :: On Rainbow Ready!");
        let dept = await initialPrompt(botui);
        if (dept) {
            socket.connect();
            socket.emit("loginGuest", dept);
        }
    });

    document.addEventListener(
        rainbowSDK.im.RAINBOW_ONNEWIMMESSAGERECEIVED,
        (event) => {
            let msg = event.detail.message.data;
            let conversation = event.detail.conversation;
            if (msg === "/endchat") {
                forceDisconnect(conversation);
            } else {
                botui.message.add({ content: msg });
            }
        }
    );
});