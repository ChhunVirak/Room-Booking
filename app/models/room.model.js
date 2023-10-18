module.exports = (sequelize, Sequelize) => {
    const Room = sequelize.define("rooms", {
        title: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
    });

    return Room;
};