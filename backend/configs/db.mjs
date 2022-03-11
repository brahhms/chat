const config = {
  connections: {
    postgres: {
      motor: 'postgres', 
      options: {
        db_host: process.env.DB_HOST || 'localhost',
        db_port: process.env.DB_PORT || 5432,
        db_name: process.env.DB_DATABASE || 'nodebot',
        db_username: process.env.DB_USERNAME || 'postgres',
        db_password: process.env.DB_PASSWORD || '123456',
      },
    },
  },
  default: 'postgres',
};

export default config;