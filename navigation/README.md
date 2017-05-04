# 左侧内嵌式导航菜单组件使用说明

安装：
> npm install siderbar

demo：
![image.png](http://ata2-img.cn-hangzhou.img-pub.aliyun-inc.com/c367ffec64c8d8288216e9cd0fb41892.png)

1. 使用方式：
```js
    import React from 'react';
    import Siderbar from 'siderbar';
    ......
    render(){
      return (
        <Siderbar 
          menuData={menuData}     
        />
      );
    }
```
其中menuData为必传参数，其格式为：
```js
const menuData = [{
  key: 1,
  type: 'xxx', //type 参照[antd Icon](https://ant.design/components/icon-cn/)可选的类型
  title: 'xxx',
  options: [{
    key: 11,
    content: 'xxx'  // 子菜单的标题
  }]
}];
```

2. 可供自定义的属性：
```js
  style: 样式，默认只有一个width： 240
  current: 当前选中的菜单，默认为1，可以根据路径计算后传入
  onClick: 菜单项点击以后的回调函数
  onOpenChange: 菜单项点开关闭后的回调函数
  以上都是可选参数，只有menuData是必选参数，并且有格式要求
  menuData: [
    key: xx,
    title: xx,
    type: xx,
    options: [
      {
        key: xx,
        content: xx   
      }
    ]
  ]
```
