module.exports = {
  singleQuote: true, // 使用单引号代替双引号
  semi: true, // 每行末尾自动添加分号
  tabWidth: 2, // tab缩进大小,默认为2
  useTabs: false, // 使用tab缩进，默认false
  // 对象中打印空格 默认true
  // true: { foo: bar }
  // false: {foo: bar}
  bracketSpacing: true,
  // 箭头函数参数括号 默认avoid 可选 avoid| always
  // avoid 能省略括号的时候就省略 例如x => x
  // always 总是有括号
  arrowParens: 'avoid',
  printWidth: 80, // 换行长度，默认80
  disableLanguages: ['vue'], // 不格式化vue文件，vue文件的格式化单独设置
  endOfLine: 'auto', // 结尾是 \n \r \n\r auto
  eslintIntegration: false, //不让prettier使用eslint的代码格式进行校验
  jsxBracketSameLine: false, //  > 标签放在最后一行的末尾，而不是单独放在下一行
  jsxSingleQuote: false, // 在jsx中使用单引号代替双引号
  stylelintIntegration: false, //不让prettier使用stylelint的代码格式进行校验
  trailingComma: 'es5', // 在对象或数组最后一个元素后面是否加逗号（在ES5中加尾逗号）
  tslintIntegration: false, // 不让prettier使用tslint的代码格式进行校验1
  ignorePath: '.gitignore',
  overrides: [
    {
      files: '*.wxml',
      options: { parser: 'html' },
    },
    {
      files: '*.wxss',
      options: { parser: 'css' },
    },
    {
      files: '*.wxs',
      options: { parser: 'babel' },
    },
  ],
};
