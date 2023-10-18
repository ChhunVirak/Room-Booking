module.exports = {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: null,
    DB: "room-booking",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};