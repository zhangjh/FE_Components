# 富文本组件使用说明

安装：
> npm install full-text

1. 使用方式：
```js
    import React from 'react';
    import FullText from 'FullText';
    ......
    render(){
      return (
        <FullText
          left={550}
          pageY={200}
          save={function noRefCheck() {}}
          style={{
            border: '1px solid',
            height: 600,
            width: 400
          }}
          value="** hello world!!**"
        />
      );
    }
```

本富文本插件支持普通富文本编辑器和markdown编辑器切换，依赖xheditor和mditor，
前端html需要引入xheditor，xheditor依赖jquery

- 引入jquery
```html
<script src="/path/jquery-1.4.4.min.js"></script>
```

- 引入xheditor
[下载xheditor](http://xheditor.com/download.html)
页面引入：
```html
<script src="/path/xheditor-1.2.2/xheditor-1.2.2.min.js"></script>
<script src="/path/xheditor-1.2.2/xheditor_lang/zh-cn.js"></script>
```

- 引入mditor
[下载mditor](https://github.com/Houfeng/mditor)
页面引入：
```html
<link rel="stylesheet" href="/path/mditor/css/mditor.min.css" />
<script src="/path/mditor/js/mditor.min.js"></script>
```


