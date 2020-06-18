module.exports = {
  test: {
    username: 'hdvdbwhnwqffpv',
    password: 'b7d56288c3e7387c9f7199e5a689239c10be37891ecbabbb4b12301927cead74',
    database: 'd1jj1hjho6mdgc',
    host: 'ec2-23-23-142-5.compute-1.amazonaws.com',
    port: 5432,
    dialect: 'postgres',
    ssl: true,
    dialectOptions: {
      ssl: true
    }

  },
  development: {
    username: 'hdvdbwhnwqffpv',
    password: 'b7d56288c3e7387c9f7199e5a689239c10be37891ecbabbb4b12301927cead74',
    database: 'd1jj1hjho6mdgc',
    host: 'ec2-23-23-142-5.compute-1.amazonaws.com',
    port: 5432,
    dialect: 'postgres',
    logging: console.log,
    ssl: true,
    dialectOptions: {
      ssl: true
    }

  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    ssl: true,
    dialectOptions: {
      ssl: true
    }
  }
};
