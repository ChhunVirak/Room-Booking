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

db.room = require("./room.model.js")(sequelize, Sequelize);
db.user = require("./user.model.js")(sequelize, Sequelize);
db.booking = require("./booking.model.js")(sequelize, Sequelize);

//Relationship
db.user.hasMany(db.room, {
    constraints: true,
    foreignKeyConstraint: true,
    foreignKey: {
        allowNull: false
    },
    validate: {
        notNull: {
            msg: 'is required!'
        }
    }
});

db.room.belongsTo(db.user, {
    constraints: true,
    foreignKeyConstraint: true,
    foreignKey: {
        allowNull: false
    },
    validate: {
        notNull: {
            msg: 'is required!'
        }
    }
});

db.user.hasMany(db.booking, {
    constraints: true,
    foreignKey: {
        allowNull: false
    },
    validate: {
        notNull: {
            msg: 'is required!'
        }
    }
});

db.booking.belongsTo(db.user, {
    constraints: true,
    foreignKeyConstraint: true,
    foreignKey: {
        allowNull: false
    },
    validate: {
        notNull: {
            msg: 'is required!'
        }
    }
});

db.booking.belongsTo(db.room, {
    constraints: true,
    foreignKeyConstraint: true,
    foreignKey: {
        allowNull: false
    },
    validate: {
        notNull: {
            msg: 'is required!'
        }
    }
});

db.room.hasMany(db.booking, {
    constraints: true,
    foreignKeyConstraint: true, foreignKey: {
        allowNull: false
    },
    validate: {
        notNull: {
            msg: 'is required!'
        }
    }
});

db.booking.hasOne(db.room, {
    constraints: true,
    foreignKeyConstraint: true, foreignKey: {
        allowNull: false
    },
    validate: {
        notNull: {
            msg: 'is required!'
        }
    }
});

db.booking.hasOne(db.user, {
    constraints: true,
    foreignKey: {
        allowNull: false
    },
    validate: {
        notNull: {
            msg: 'is required!'
        }
    }
});

//End Relationship

module.exports = db;