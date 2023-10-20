const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
    // Save User to Database
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        roleId: req.body.roleId,
    })
        .then(user => {

            const token = jwt.sign({ id: user.id },
                config.secret,
                {
                    algorithm: 'HS256',
                    allowInsecureKeySizes: true,
                    expiresIn: 86400, // 24 hours
                });

            Role.findByPk(user.roleId).then(role => {
                res.send({
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    roles: role.name?.toUpperCase(),
                    accessToken: token
                });
            });

        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};


exports.signin = (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }

            const token = jwt.sign({ id: user.id },
                config.secret,
                {
                    algorithm: 'HS256',
                    allowInsecureKeySizes: true,
                    expiresIn: 86400, // 24 hours
                });

            // var authorities = [];

            Role.findByPk(user.roleId).then(role => {

                // authorities.push("ROLE_" + role.name.toUpperCase());

                res.status(200).send({
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    roles: role.name.toUpperCase(),
                    accessToken: token
                });
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.findAllRoles = (req, res) => {
    Role.findAll({
        attributes: [
            "id",
            "name",
            "description",
        ],
    }).then(roles => {
        res.send(roles);
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
}