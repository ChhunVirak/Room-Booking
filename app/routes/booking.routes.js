module.exports = app => {
    const bookings = require("../controllers/booking.controller.js");

    var router = require("express").Router();

    // Create a new booking
    router.post("/", bookings.create);

    // Retrieve all bookings
    router.get("/", bookings.findAll);


    router.delete("/:id", bookings.delete);

    app.use('/api/booking', router);
};