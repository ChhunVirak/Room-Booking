const db = require("../models");
const Room = db.room;
const Op = db.Sequelize.Op;

// Create and Save a new Room
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Room
    const room = {
        title: req.body.title,
        description: req.body.description,
        userId: req.userId,
    };

    // Save Room in the database
    Room.create(room)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Room."
            });
        });
};

//Find All Rooms
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

    Room.findAll({
        where: condition,
        attributes: [
            "id",
            "title",
            "description",
        ]
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving rooms."
            });
        });
};

//Delete Rooms by id
exports.delete = (req, res) => {
    const id = req.params.id;

    Room.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Room with id=${id} was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Room with (id = ${id}). Maybe Room was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Room with id = " + id
            });
        });
};