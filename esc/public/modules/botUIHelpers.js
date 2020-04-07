const initialPrompt = async botui => {
    await botui.message.add({
        // show a message
        content: "Hello! Would you like to be connected to our Customer Service?"
    });
    let res = await botui.action.button({
        // show 'text' action
        action: [{
                text: "Yes!",
                value: "yes"
            },
            {
                text: "No thanks",
                value: "no"
            }
        ]
    });
    document.getElementsByTagName("button")[0].setAttribute("id", "yes");
    if (res.value === "yes") {
        return departmentPrompt(botui);
    } else {
        await botui.message.add({
            delay: 500,
            content: "K"
        });
        return null;
    }
};

const departmentPrompt = async botui => {
    await botui.message.add({
        delay: 500,
        content: "Department?"
    });
    let res = await botui.action.button({
        delay: 300,
        action: [{
                text: "uPhone",
                value: "sales"
            },
            {
                text: "uPad",
                value: "finance"
            },
            {
                text: "General",
                value: "general"
            }
        ]
    });
    return departmentChosen(botui, res.value);
};

const departmentChosen = async(botui, dept) => {
    await botui.message.add({
        // show a message
        delay: 300,
        content: `Connecting you to a ${dept} agent...`
    });
    return dept;
};

const connected = async(botui, resCallback) => {
    botui.message.removeAll();
    await botui.message.add({
        content: "You are now connected!"
    });
    textInput(botui, resCallback);
};

const textInput = async(botui, resCallback) => {
    let result = await botui.action.text({
        action: {
            placeholder: "Type here"
        }
    });
    resCallback(result);
    textInput(botui, resCallback);
};

export { initialPrompt, connected };