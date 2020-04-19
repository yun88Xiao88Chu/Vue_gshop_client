module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  "plugins":[
    [
      "component", //babel-plugin-component按需引入打包
      {
       "libraryName": "element-ui",  //针对element-ui
       "styleLibraryName": "theme-chalk" //主题样式
      }
    ]
  ]
}
