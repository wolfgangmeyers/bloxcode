const express = require("express");
const moment = require("moment");

module.exports = function() {
    // hello world express app
    const app = express();
    // add json middleware
    app.use(express.json());

    const bloxcodeMessages = [];
    const studioMessages = [];

    app.post("/messages/bloxcode", async (req, res) => {
        // if bloxcode messages > 100 then clear the array first
        if (bloxcodeMessages.length > 100) {
            bloxcodeMessages.length = 0;
        }
        const message = req.body;
        // log the message
        console.log("Message sent to bloxcode:", message);
        bloxcodeMessages.push({
            ...message,
            expires: moment().add(10, "seconds").valueOf()
        });
        res.sendStatus(204);
    });

    app.get("/messages/bloxcode", async (req, res) => {
        // send messages then clear
        res.send({
            messages: bloxcodeMessages.filter(m => m.expires > moment().valueOf()).map(m => ({ ...m, expires: undefined }))
        });
        bloxcodeMessages.length = 0;
    });

    app.post("/messages/studio", async (req, res) => {
        // if studio messages > 100 then clear the array first
        if (studioMessages.length > 100) {
            studioMessages.length = 0;
        }
        const message = req.body;
        // log message
        console.log("Message sent to studio: ", message);
        studioMessages.push({
            ...message,
            expires: moment().add(10, "seconds").valueOf()
        });
        res.sendStatus(204);
    });

    app.get("/messages/studio", async (req, res) => {
        // send messages then clear
        res.send({
            messages: studioMessages.filter(m => m.expires > moment().valueOf()).map(m => ({ ...m, expires: undefined }))
        });
        studioMessages.length = 0;
    });

    // handle static files
    app.use(express.static(__dirname + "/public"));

    // start server
    app.listen(process.env.PORT || 13032, () => console.log("Server started..."));
}

