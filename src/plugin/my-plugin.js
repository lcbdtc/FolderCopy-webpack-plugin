const fs = require('fs')
const path = require('path')
const srcDir = '/Users/lichenbin/vueProjects/vue-demo-01'
const finalDir = '/Users/lichenbin/vueProjects/demo'


function MyPlugin(options) {
  this.options = options
}

function copyFile(_srcDir, _finalDir) {
  if (fs.existsSync(_finalDir) == false) {
    fs.mkdirSync(_finalDir);
  }
  if (fs.existsSync(_srcDir) == false) {
    return false;
  }
  let paths = fs.readdirSync(_srcDir)
  paths.forEach(function (pathItem) {
    let sub_src = path.join(_srcDir,pathItem)
    let sub_final = path.join(_finalDir,pathItem)
    // console.log(sub_final);
    try{
      let item = fs.statSync(sub_src)
      if (item.isFile()) {
        fs.copyFileSync(sub_src, sub_final)
      } else if (item.isDirectory()) {
        copyFile(sub_src, sub_final)
      }
    }catch(e){
      console.log(e)
    }
  })
}

MyPlugin.prototype.apply = function (compiler) {
  console.log('in apply');
  compiler.plugin('compilation', function (compilation) {
    console.log('in compilation');
    copyFile(srcDir, finalDir)
  })
}

module.exports = MyPlugin