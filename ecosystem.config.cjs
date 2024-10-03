require('dotenv').config({ path: './.env.local' });

module.exports = {
  apps: [
    {
      name: 'CASINO',
      script: 'npm',
      args: 'start',
      env: {
        NODE_ENV: 'production',
        ...process.env // Spread the loaded environment variables here
      }
    }
  ]
};
