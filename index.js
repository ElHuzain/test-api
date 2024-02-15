import express from "express"

// Let's assume that this is data coming from database
import jsonData from './data.json' with { type: "json" };

const app = express();

// Allowing reqs from anyone and anything
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const validateUserClientId = async (req, res) => {

    const { clientId, date } = req.query;

    if (!clientId || !date) return res.status(400).send({ message: "Insufficient Parameters." });

    const client = jsonData.find((value) => value.clientId === clientId);

    // Check if clientId exists
    if (!client) return res.status(400).send({ message: "Invalid clientId."})

    // IF user has registered client ID AND user has selected event and theme THEN
    if (!client.event || !client.theme) return res.status(400).send({ message: "Please choose theme and event." });

    // IF user client date matches selected event date THEN

    // IF user selected Popup option, then widget will show the popup.

    // IF user selected banner embed option, then widget will write into target HTML element (provided by user)

    return res.status(200).send({
        message: ``,
        clientId,
        date,
        imgSrc: client.imgSrc,
        option: client.option,
        theme: client.theme,
        event: client.event,
    })
}

app.get('/', validateUserClientId);

app.listen(3000, () => {
    console.log("Server is operational.");
});