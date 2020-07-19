const PATH = require('path');
module.exports = (config) => {
  config.resolve.alias = {
    sdk: PATH.resolve(__dirname, 'src/sdk'),
    PostsList: PATH.resolve(__dirname, 'src/widgets/PostList'),
  };
  return config;
};
