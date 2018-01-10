module.exports = {
  directory: 'src/server/database/migrations',
  development: {
    client: 'pg',
    connection: 'postgres://localhost/focus-dev',
    // debug: true,
    seeds: {
      directory: './seeds',
    }
  },
};