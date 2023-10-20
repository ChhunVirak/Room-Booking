const rooms = require("../controllers/room.controller.js");
const { authJwt } = require("../middleware");

module.exports = app => {

    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    var router = require("express").Router();

    // Create a new Room
    router.post("/",
        [
            authJwt.verifyToken,
            authJwt.isModeratorOrAdmin,
        ],
        rooms.create
    );

    // Retrieve all rooms
    router.get("/", rooms.findAll);

    // // Retrieve all published rooms
    // router.get("/published", rooms.findAllPublished);

    // Retrieve a Room Detil with id
    // router.get("/:id", rooms.findOne);

    // // Update a Room with id
    // router.put("/:id", rooms.update);

    // Delete a Room with id
    router.delete("/:id",
        [
            authJwt.verifyToken,
            authJwt.isModeratorOrAdmin,
        ],
        rooms.delete
    );

    // // Create a new Room
    // router.delete("/", rooms.deleteAll);

    app.use('/api/rooms', router);
};