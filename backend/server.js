const app = require('./app');
const { connectDatabase } = require('./config/database');

const port = Number(process.env.PORT) || 5000;

connectDatabase()
  .then(() => app.listen(port, () => console.log(`API ready at http://localhost:${port}/api`)))
  .catch((error) => {
    console.error('Unable to start API because MongoDB could not be reached:', error.message);
    process.exit(1);
  });
