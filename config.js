module.exports = {
    listen: 4000,
    dev_mode: true,
    //host: 'xxx.com',

    session: {
        redis: {host: '127.0.0.1', port: 6379}
    },

    mysql: {
        poolSize: 5,
        user: 'root',
        password: 'mysql',
        database: 'xxx'
    }
};
