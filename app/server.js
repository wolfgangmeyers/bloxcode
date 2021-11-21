const express = require("express");

// hello world express app
const app = express();

// hello api
app.get("/api/hello", (req, res) => {
    res.send({ express: "Hello From Express" });
});

// handle static files
app.use(express.static("public"));

// start server
app.listen(process.env.PORT || 13032, () => console.log("Server started..."));
