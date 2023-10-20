const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function (app) {

    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    var router = require("express").Router();

    router.get("/", [authJwt.verifyToken, authJwt.isModeratorOrAdmin], controller.findAllUsers);
    router.get("/:id", [authJwt.verifyToken, authJwt.isModeratorOrAdmin], controller.getUserDetail);

    // router.post(
    //     "/api/auth/signup",
    //     [
    //         verifySignUp.checkDuplicateUsernameOrEmail,
    //         verifySignUp.checkRolesExisted
    //     ],
    //     controller.signup
    // );

    // router.post("/api/auth/signin", controller.signin);

    app.use('/api/user', router);

};