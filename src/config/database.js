module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'postgres',
  database: 'codeburger',
  define: {
    timestampz: true,
    underscored: true,
    underscoredAll: true,
  },
};
