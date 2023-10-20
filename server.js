const express = require("express");
// const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const db = require("./app/models");

const DROP = false;

function initialRoles() {
    if (DROP) {
        db.role.create({
            id: 1,
            name: "user",
            description: "Can perform any related booking function."
        });

        db.role.create({
            id: 2,
            name: "moderator",
            description: "Can do everythings except user function."
        });

        db.role.create({
            id: 3,
            name: "admin",
            description: "Can do everythings!"
        });
    }

}

db.sequelize.sync({ force: DROP }) //force true to drop all table
    .then(() => {

        initialRoles();

        console.log("Synced db.");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });

var corsOptions = {
    origin: "http://localhost:8080"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to bezkoder application." });
});

//All Route : Call all route here before `app.listen()`

require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/room.routes")(app);
require("./app/routes/booking.routes")(app);

//End Route


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});


