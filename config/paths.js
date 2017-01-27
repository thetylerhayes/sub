var path = require('path');

function resolveApp(relativePath) {
  return path.resolve(relativePath);
}

module.exports = {
  appBuild: resolveApp('dist'),
  appSrc: resolveApp('src'),
  ownNodeModules: resolveApp('node_modules'),
  appPackageJson: resolveApp('package.json')
};
