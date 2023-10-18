const { formatSequelizeError } = require("../handler/sequelize.error.handler");
const db = require("../models");
const sequelize = db.sequelize;
const Booking = db.booking;
const Op = db.Sequelize.Op;

// Create and Save a new Booking
exports.create = (req, res) =>
{
    // Validate request
    if (!req.body.title)
    {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Booking
    const booking = {
        title: req.body.title,
        description: req.body.description,
        startDate: req.body.startDate, //YYYY-MM-DD
        endDate: req.body.endDate, //YYYY-MM-DD
        userId: req.body.userId,
        roomId: req.body.roomId,
    };

    // Save Booking in the database
    Booking.create(booking)
        .then(data =>
        {
            res.send(data);
        })
        .catch(err =>
        {
            // let message;
            // if(err instanceof Sequelize.){}
            // if (err.name === 'SequelizeValidationError') {
            //     message = err.errors?.map(function (element) {
            //         return {
            //             'error_msg': `(${element.path}) ${element.type === 'notNull Violation' ? 'is required' : element.message} `
            //         };
            //     }) || err.message || "Some error occurred while creating the Booking."

            // }
            // else if (err.name === 'SequelizeForeignKeyConstraintError') {
            //     res.status(500).send({
            //         message:
            //             err.errors?.map(function (element) {
            //                 return {
            //                     'error_msg': `(${element.path}) ${element.type === 'notNull Violation' ? 'is required' : element.message} `
            //                 };
            //             }) || err.message || "Some error occurred while creating the Booking."
            //     });
            // }

            res.status(500).send({
                message:
                    formatSequelizeError(err) || err.message
            });

        });
};
//Find All Bookings
exports.findAll = (req, res) =>
{
    const title = req.query.title;
    var condition = title ? { title: { [ Op.iLike ]: `%${ title }%` } } : null;

    Booking.findAll({
        where: condition,
        attributes: [
            "id",
            "title",
            "description",
        ]
    })
        .then(data =>
        {
            res.send(data);
        })
        .catch(err =>
        {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving rooms."
            });
        });
};

//Delete Bookings by id
exports.delete = (req, res) =>
{
    const id = req.params.id;

    Booking.destroy({
        where: { id: id }
    })
        .then(num =>
        {
            if (num == 1)
            {
                res.send({
                    message: `Booking with id=${ id } was deleted successfully!`
                });
            } else
            {
                res.send({
                    message: `Cannot delete Booking with (id = ${ id }). Maybe Booking was not found!`
                });
            }
        })
        .catch(err =>
        {
            res.status(500).send({
                message: "Could not delete Booking with id = " + id
            });
        });
};