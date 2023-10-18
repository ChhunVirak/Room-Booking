module.exports = (sequelize, Sequelize) => {
    const Booking = sequelize.define("bookings", {
        title: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'is required!'
                }
            }
        },
        description: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        startDate: {
            type: Sequelize.DATE,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'is required!'
                }
            }
        },
        endDate: {
            type: Sequelize.DATE,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'is required!'
                }
            }
        },

    });

    return Booking;
};