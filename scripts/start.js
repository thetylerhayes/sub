// Do this as the first thing so that any code reading it knows the right env.
process.env.WEBPACK_ENV = 'local';

const chalk = require('chalk'),
fs = require('fs'),
path = require('path'),
filesize = require('filesize'),
gzipSize = require('gzip-size').sync,
rimrafSync = require('rimraf').sync,
webpack = require('webpack'),
config = require("../config/webpack.config.js"),
configBot = config.bot,
configIndex = config.index,
configServer = config.server,
paths = require('../config/paths'),
recursive = require('recursive-readdir'),
stripAnsi = require('strip-ansi'),
detect = require('detect-port'),
express = require("express"),
watch = require("watch"),
argv = require('yargs')
.usage('Usage: $0 [widget_id]')
.demandOption(['w'])
.argv;
DEFAULT_PORT = 3000;

function removeFileNameHash(fileName) {
  return fileName
  .replace(paths.appBuild, '')
  .replace(/\/?(.*)(\.\w+)(\.js|\.css)/, (match, p1, p2, p3) => p1 + p3);
}


function getDifferenceLabel(currentSize, previousSize) {
  var FIFTY_KILOBYTES = 1024 * 50;
  var difference = currentSize - previousSize;
  var fileSize = !Number.isNaN(difference) ? filesize(difference) : 0;
  if (difference >= FIFTY_KILOBYTES) {
    return chalk.red('+' + fileSize);
  } else if (difference < FIFTY_KILOBYTES && difference > 0) {
    return chalk.yellow('+' + fileSize);
  } else if (difference < 0) {
    return chalk.green(fileSize);
  } else {
    return '';
  }
}

rimrafSync(paths.appBuild + '/*');

// Start the webpack build
build();

// Print a detailed summary of build files.
function printFileSizes(stats, previousSizeMap) {
  var assets = stats.toJson().assets
  .filter(asset => /\.(js|css)$/.test(asset.name))
  .map(asset => {
    var fileContents = fs.readFileSync(paths.appBuild + '/' + asset.name);
    var size = gzipSize(fileContents);
    return {
      folder: path.join('dist', path.dirname(asset.name)),
      name: path.basename(asset.name),
      size: size,
      sizeLabel: filesize(size)
    };
  });
  assets.sort((a, b) => b.size - a.size);
  var longestSizeLabelLength = Math.max.apply(null,
  assets.map(a => stripAnsi(a.sizeLabel).length)
  );
  assets.forEach(asset => {
    var sizeLabel = asset.sizeLabel;
    var sizeLength = stripAnsi(sizeLabel).length;
    if (sizeLength < longestSizeLabelLength) {
      var rightPadding = ' '.repeat(longestSizeLabelLength - sizeLength);
      sizeLabel += rightPadding;
    }
    console.log(
    '  ' + sizeLabel +
    '  ' + chalk.dim(asset.folder + path.sep) + chalk.cyan(asset.name) + '\n'
    );
  });
}

function runServer() {
  detect(DEFAULT_PORT).then(port => {
    const server = express();

    server.get("/bot.js", (req, resp, next) => {
      let filePath = path.resolve(`./dist/bot.js`);
      if (fs.existsSync(filePath)) {
        resp.status(200).sendFile(filePath);
      } else {
        return next();
      }
    });

    server.get("/index.js", (req, resp, next) => {
      let filePath = path.resolve(`./dist/index.js`);
      if (fs.existsSync(filePath)) {
        resp.status(200).sendFile(filePath);
      } else {
        return next();
      }
    });

    server.get("/index.node.js",(res,resp,next)=>{
      const filePath = path.resolve("./dist/index.node.js");
      if (fs.existsSync(filePath)){
        resp.status(200).sendFile(filePath);
      } else {
        return next();
      }
    })


    server.listen(port, () => {
      console.log(chalk.cyan(`Server listening on http://localhost:${port}`));
    });
  })
}

function webpackCallback(err, stats) {
  if (err) {
    console.error('Failed to create a build. Reason:');
    console.error(chalk.red(new Error(err.message || err)));
  }
  const files = [path.resolve('./dist/bot.js'),path.resolve('./dist/index.node.js')];
  files.forEach((f)=>{
    try{
      require(f);
    } catch(err){
      if(err.message.indexOf(files[0] !== -1) || err.message.indexOf(files[1] !== -1)) {
        return;
      }
      console.log(chalk.red(`${f} will not function if you push -- ${err} ${err.stack}`));
    }
  })

  printFileSizes(stats);
};

// Create the production build and print the deployment instructions.
function build() {
  const widget_id = argv.w;
  if (!widget_id || typeof widget_id !== 'string'){
    console.log(chalk.red('No widget_id'), `\n use ${chalk.cyan('npm run start your_local_widget_id')} to run`);
    process.exit(0);
  }

  console.log(chalk.green(`Running ${widget_id} widget`));

  configBot.output.library = widget_id;
  configIndex.output.library = widget_id;
  configServer.output.library = widget_id;

  webpack(configBot)
  .run(webpackCallback);

  webpack(configIndex)
  .run(webpackCallback);

  webpack(configServer)
  .run(webpackCallback);

  watch.watchTree("./src", {ignoreDotFiles: true, interval: 1, ignoreDirectoryPattern: /node_modules/}, (f, curr, prev) => {
    if (typeof f == "object" && prev === null && curr === null) {
      // Finished walking the tree
      return;
    } else if (prev === null) {
      // f is a new file
      console.log(chalk.green(`${f} created, running build`));
    } else if (curr.nlink === 0) {
      // f was removed
      console.log(chalk.green(`${f} removed, running build`));
    } else {
      // f was changed
      console.log(chalk.green(`${f} changed, running build`));
    }
    if(f.indexOf("index.js") > -1){
      webpack(configIndex)
      .run(webpackCallback);
    }else if(f.indexOf("bot.js") > -1){
      webpack(configBot)
      .run(webpackCallback);
    } else {
      webpack(configBot).run(webpackCallback);
      webpack(configIndex).run(webpackCallback);
    }
  });

  runServer();
}
