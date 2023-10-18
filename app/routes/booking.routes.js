const { authJwt } = require("../middleware");
const bookings = require("../controllers/booking.controller.js");

module.exports = app =>
{
    app.use(function (req, res, next)
    {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    var router = require("express").Router();

    // Create a new booking
    router.post(
        "/",
        [ authJwt.verifyToken ],
        bookings.create
    );

    // Retrieve all bookings
    router.get(
        "/",
        [ authJwt.verifyToken ],
        bookings.findAll
    );


    router.delete(
        "/:id",
        [ authJwt.verifyToken ],
        bookings.delete
    );

    app.use('/api/booking', router);
};