/*
 * Author       : OBKoro1
 * Date         : 2020-03-16 17:15:19
 * LastEditors  : OBKoro1
 * LastEditTime : 2020-03-19 18:38:03
 * FilePath     : /autoCommit/testPlugin/index.js
 * Description  : webpack 插件实践
 * https://github.com/OBKoro1
 */

console.log('执行 MyExampleWebpackPlugin');

// 一个 JavaScript class
class MyExampleWebpackPlugin {
  constructor(...arr) {
    console.log('arr', arr);
  }
  // 将 `apply` 定义为其原型方法，此方法以 compiler 作为参数
  // 安装该插件调用
  apply(compiler) {
    console.log('compiler参数', compiler);
    // 监听文件生成结束后的事件
    compiler.hooks.emit.tapAsync(
      'MyExampleWebpackPlugin',
      (compilation, callback) => {
        var filelist = '初始化文件内容:\n\n';
        // 获取所有生成的文件
        for (var filename in compilation.assets) {
          filelist += '- ' + filename + '\n';
          console.log('filename', filename);
        }
        // 如何修改文件，创建文件
        compilation.assets['filelist.md'] = {
          // 文件内容
          source: function() {
            return filelist;
          },
          //   文件大小
          size: function() {
            return filelist.length;
          }
        };
        callback();
      }
    );
  }
}

module.exports = MyExampleWebpackPlugin;
