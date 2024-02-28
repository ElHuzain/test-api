import express from "express"
import { ref, get, child } from "firebase/database";
import { database } from "./firebase.js";

// Express
const app = express();

// Allowing reqs from anyone and anything
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


const validateUserClientId = async (req, res) => {
    const { clientId, websiteId } = req.query;

    // Check if request is valid (has required parameters)
    if (!clientId || !websiteId) return res.status(400).send("Insufficient parameters.");
    const dbRef = ref(database);

    // Check if parameters is in valid format

    // Fetch user & website
    const userSnapshot = await get(child(dbRef, `user/${clientId}`));
    if (!userSnapshot.exists()) return res.status(400).send("Invalid clientId");
    const user = userSnapshot.val();

    const websiteSnapshot = await get(child(dbRef, `website/${clientId}/${websiteId}`));
    if (!websiteSnapshot.exists()) return res.status(400).send("Invalid websiteId");
    const website = Object.entries(websiteSnapshot.val())[0][1];

    // Check if website.url === origin
    // TODO: MAKE IT ACCEPT ONLY HTTPS
    // TODO: Make it ONLY proceed when url === origin
    const origin = req.headers.origin ? req.headers.origin.replace("http://", "").replace("https://", "") : null;

    // For each userEvent in that website,
    const userEventsSnapShot = await get(child(dbRef, `userEvent/${clientId}/${websiteId}`));
    if (!userEventsSnapShot.exists()) return res.status(400).send("No event selections found.")
    // fetch subscription, fetch tempate, fetch event.
    // Prepare & deliver all in one array.
    // console.log(userEventsSnapShot.val());
    let selectionArray = [];
    for (const websiteKey in userEventsSnapShot.val()) {
        const websiteObject = userEventsSnapShot.val()[websiteKey]
        if (websiteObject.status) {
            const templateSnapshot = await get(child(dbRef, `template/${websiteObject.templateId}`));
            const eventSnapshot = await get(child(dbRef, `template/${websiteObject.eventId}`));
            websiteObject.event = eventSnapshot.val();
            websiteObject.template = templateSnapshot.val();
            selectionArray.push(websiteObject)
        }
    }
    console.log(selectionArray);

    res.status(200).send(selectionArray);
}

app.get('/', validateUserClientId);

app.listen(3000, () => {
    console.log("Server is operational.");
});