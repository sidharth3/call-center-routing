import { rainbowInit } from "./modules/rainbowWebHelpers.js";
import { customError, loginInfo } from "./modules/socketEventsClient.js";
import { initialPrompt, connected } from "./modules/botUIHelpers.js";

/* Wait for the page to load */
$(function() {
    rainbowInit();

    const botui = new BotUI("allocablPrompt");

    const socket = io({ autoConnect: false });

    socket.on("loginInfo", async info => {
        let conversation = await loginInfo(rainbowSDK, info);
        connected(botui, res =>
            rainbowSDK.im.sendMessageToConversation(conversation, res.value)
        );
    });
    socket.on("customError", async msg => {
        customError(msg);
        await botui.message.add({ content: msg });
        let dept = await initialPrompt(botui);
        if (dept) socket.emit("loginGuest", dept);
    });
    socket.on("waitList", async msg => {
        await botui.message.add({ content: msg });
    });
    socket.on("agentAvailable", async msg => {
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
        event => botui.message.add({ content: event.detail.message.data })
    );
});
