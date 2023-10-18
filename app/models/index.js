const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, Sequelize);
db.role = require("./role.model.js")(sequelize, Sequelize);
db.room = require("./room.model.js")(sequelize, Sequelize);
db.booking = require("./booking.model.js")(sequelize, Sequelize);

//Relationship
db.user.hasMany(db.room, {
    constraints: true,
    foreignKeyConstraint: true,
    foreignKey: {
        allowNull: false
    },
});

db.room.belongsTo(db.user, {
    constraints: true,
    foreignKeyConstraint: true,
    foreignKey: {
        allowNull: false
    },
});


//Booking with room and user
db.user.hasMany(db.booking, {
    constraints: true,
    foreignKey: {
        allowNull: false
    },
});

db.booking.belongsTo(db.user);

db.room.hasMany(db.booking, {
    constraints: true,
    foreignKeyConstraint: true,
    foreignKey: {
        allowNull: false
    },
});

db.booking.belongsTo(db.room);

//User and Role
//make table user has roleId
db.role.hasMany(db.user, {
    constraints: true,
    foreignKeyConstraint: true,
    foreignKey: {
        allowNull: false
    },
});

db.user.belongsTo(db.role);

//End Relationship

module.exports = db;

///Note : We have Table A & B if want idB to table A use B.hasOne(A)