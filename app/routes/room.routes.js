module.exports = app => {
    const rooms = require("../controllers/room.controller.js");

    var router = require("express").Router();

    // Create a new Room
    router.post("/", rooms.create);

    // Retrieve all rooms
    router.get("/", rooms.findAll);

    // // Retrieve all published rooms
    // router.get("/published", rooms.findAllPublished);

    // Retrieve a Room Detil with id
    // router.get("/:id", rooms.findOne);

    // // Update a Room with id
    // router.put("/:id", rooms.update);

    // Delete a Room with id
    router.delete("/:id", rooms.delete);

    // // Create a new Room
    // router.delete("/", rooms.deleteAll);

    app.use('/api/rooms', router);
};