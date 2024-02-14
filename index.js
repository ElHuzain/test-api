import express from "express"
const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Let's make the assumption that this is some data retrieved from some database.
const dummyData = [
    {
        clientId: "111",
        event: "event1",
        theme: "red",
        option: "pop-up"
    },
    {
        clientId: "222",
        event: "event2",
        theme: "yellow",
        option: "embedded"
    },
    {
        clientId: "333",
        event: null,
        theme: "green",
        option: null
    },
    {
        clientId: "444",
        event: null,
        theme: null,
        option: null
    },
]

// Let's assume that this is another file in the api endpoint
const Validate = async (clientId, date) => {

    

    // Check if clientId exists
    const client = dummyData.find((value) => value.clientId === clientId);
    if(!client) return {
        success: false,
        message: "Invalid clientId."
    };

    // IF user has registered client ID AND user has selected event and theme THEN
    if(!client.event || !client.theme) return {
        success: false,
        message: "Please choose theme and event."
    }

    // IF user client date matches selected event date THEN

    // IF user selected Popup option, then widget will show the popup.

    // IF user selected banner embed option, then widget will write into target HTML element (provided by user)

    return {
        success: true,
        message: ``,
        clientId,
        date,
        option: client.option,
        theme: client.theme,
        event: client.event,
    }
}

app.get('/', async (req, res) => {
    console.log("Received request");
    const {clientId, date} = req.query;
    if(!clientId || !date) {
        return res.status(404).send("Insufficient Parameters.");
    }
    res.send(await Validate(clientId, date));
});

app.listen(3000, () => {
    console.log("Server is operational.");
});