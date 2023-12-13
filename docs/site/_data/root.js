const defaultRoot =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8080'
    : 'https://hub.innovation.ca.gov';

module.exports = process.env.ROOT || defaultRoot;
