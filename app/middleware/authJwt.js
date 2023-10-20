const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
const Role = db.role;

const verifyToken = (req, res, next) => {
    // let token = req.headers[ "x-access-token" ];
    let token = req.headers.authorization;

    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }

    jwt.verify(token.split(" ")[1],
        config.secret,
        (err, decoded) => {
            if (err) {
                return res.status(401).send({
                    message: "Unauthorized!",
                });
            }
            req.userId = decoded.id;
            next();
        });
};

const isAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        Role.findByPk(user.roleId).then(role => {

            if (role.name === "admin") {
                next();
                return;
            }

            res.status(403).send({
                message: "Require Admin Role!"
            });
            return;
        });
    });
};

const isModerator = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        Role.findByPk(user.roleId).then(role => {

            if (role.name === "moderator") {
                next();
                return;
            }

            res.status(403).send({
                message: "Require Moderator Role!"
            });
            return;
        });

    });
};

const isModeratorOrAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        Role.findByPk(user.roleId).then(role => {

            if (role.name === "moderator" || role.name === 'admin') {
                next();
                return;
            }

            res.status(403).send({
                message: "Require Moderator or Admin Role!"
            });
            return;
        });

    });
};

const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isModerator: isModerator,
    isModeratorOrAdmin: isModeratorOrAdmin
};

module.exports = authJwt;