module.exports = {
  apps: {
    name: 'Dotori_BE',
    script: './dist/main.js',
    instances: 0,
    exec_mode: 'cluster',
  },
};
