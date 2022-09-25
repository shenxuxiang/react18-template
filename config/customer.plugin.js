const path = require('path');
const fs = require('fs');
const { RawSource } = require('webpack-sources');

class CustomerPlugin {
  static defaultOptions = {
    filename: 'index.html',
    template: path.resolve('public/index.html'),
  }

  constructor(options = {}) {
    this.opts = {...CustomerPlugin.defaultOptions, options};
    this.linkMap = [];
    this.scriptMap = [];
  }

  apply(compiler) {
    compiler.hooks.compilation.tap('CustomerPlugin', (compilation) => {
      compilation.hooks.processAssets.tapPromise('CustomerPlugin', (assets) => {
        return new Promise((resolve, reject) => {
          const assetNames = Object.keys(assets);console.log(assetNames)
          if (!assetNames || assetNames.length <= 0) return resolve();

          for (let assetName of assetNames) {
            if (assetName.endsWith('.js')) {
              this.scriptMap.push(assetName);
            } else if (assetName.endsWith('.css')) {
              this.linkMap.push(assetName);
            }
          }
          let html;
          try {
            html = fs.readFileSync(this.opts.template, 'utf-8');
          } catch (err) {
            return reject(err);
          }

          const link = this.linkMap.reduce(function(a, b) {
            a += `<link src="${b}" rel="stylesheet" type="text/css"></link>\n`;
            return a;
          }, '');

          const script = this.scriptMap.reduce(function(a, b) {
            a += `<script href="${b}"></script>\n`;
            return a;
          }, '');
          html = html.replace('</head>', link + '</head>').replace('</body>', script + '</body>');
          const source = new RawSource(html);
          compilation.emitAsset('./index_1.html', source);
          return resolve();
        });
      });
    });
  }
}

module.exports = CustomerPlugin;
