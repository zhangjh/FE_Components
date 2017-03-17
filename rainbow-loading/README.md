# RainBow Loading

## Description
Think about this situation: when we load one page which contains long time network request,that makes the page keep white for a long time until the response returned.
We often uses a loading gif to provide a better user experience.
This component is a rainbow loading just like the picture below shows:

![](http://wx2.sinaimg.cn/mw690/62d95157gy1fdppr7ubn8j208h04g0sq.jpg)

## Install
> npm install rainbow-loading

## Usage
In React Component
```js
    import React from 'react';
    import TreeEntity from 'TreeEntity';
    ......
    render(){
      return (
        <Loading 
            numbers={[1,2,3,4,5]}
        />
      );
    }
```

