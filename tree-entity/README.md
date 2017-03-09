# 树控件组件使用说明
使用demo参见`tree-entity/src/TreeMenuDemo.js`

安装：
> npm install tree-entity

1. 使用方式：
```js
    import React from 'react';
    import TreeEntity from 'TreeEntity';
    ......
    render(){
      return (
        <TreeEntity
                    props={xxx}
        />
      );
    }
```
可供自定义的属性：
```js
  checkable: 树节点是否可选，是则传递该属性，否则传递给该属性一个false值
  defaultExpandAll：是否默认展开所有节点，同样接收true/否则传递给该属性一个false值
  defaultCheckedKeys：默认选中的节点，传递该属性key的字符串数组
  checkedKeys：选中的节点，传递该属性key的字符串数组
  expandedKeys：展开的节点，传递该属性key的字符串数组
  // 上述两个属性需要配合相应的回调函数使用：
  // checkedKeys：onCheck
  // expandedKeys：onExpand
  draggable：是否可拖拽
  onDragEnter： 拖拽的回调函数
  onCheckCb：节点选中后的回调函数
  onSelectCb：节点单击后的回调函数
  onRightClickCb：节点上右击后的回调函数
  onRightMenuClickCb：节点上右击后点击弹出菜单项后的回调函数
  menuDataLeaf：叶子节点上的菜单项，同树节点结构一致，见下说明
  menuDataDir：非叶子节点上的菜单项
  needRightMenu：是否需要弹出右键菜单
```
2. 传递给树组件渲染的数据格式需要满足：(最低要求，其他字段可按需传递)
    ```
    {
        key: "key",          //保持唯一即可
        name: "name"，       //显示的文案
        children: [],        //如果有子级节点，需满足同样的结构
        isLeaf: true/false   //指示当前节点是否是叶子节点
        titleStyle: {        //指示当前树节点以什么样式显示
            background: 'xxx'
        }
    }
    ```
    参见demo的数据传递
3. 右键菜单的数据结构类似，为区分是否叶子节点的右键菜单，支持配置

    3.1 叶子菜单的右键菜单数据

    给menuDataLeaf赋值，如demo:
    ```
    this.state.menuDataLeaf = [{
          key: 'add',
          name: '添加案例',
          children: [{
            key: 'up',
            name: '在上方添加',
            children: [],
            isLeaf: true,
            disabled: true,           //disabled设为true时，该选项默认禁用，不传时默认为false，即可使用
          }, {
            key: 'down',
            name: '在下方添加',
            children: [],
            isLeaf: true,
          }],
          isLeaf: false,
        }, {
          key: 'copy',
          name: '复制案例',
          children: [],
          isLeaf: true,
        }, {
          key: 'move',
          name: '移动案例',
          children: [{
            key: 'up',
            name: '上移',
            children: [],
            isLeaf: true,
          }, {
            key: 'down',
            name: '下移',
            children: [],
            isLeaf: true,
          }],
          isLeaf: false,
        }, {
          key: 'remove',
          name: '删除',
          children: [],
          isLeaf: true,
        }, {
          key: 'rename',
          name: '重命名',
          children: [],
          isLeaf: true,
        }];
    ```

    3.2 非叶子菜单的右键菜单数据

    给menuDataDir赋值,结构类似，参见demo

4. 左键单击操作及回调

    点击左键的回调函数可以写在onSelectCb里，通过props传递给树组件
    点击事件返回的参数：selectedKeys, e

5. 右键菜单后单击操作及回调

    点击右键的回调函数可以写在onRightMenuClickCb里，通过props传递给组件
    点击事件返回的参数： item, key, keyPath

6. 选中操作及回调

    通过传递`checkable`属性给树组件可以指定树节点是否可以进行选中操作。
    点击选中之后的回调函数可以写在onCheckCb函数里，实现该函数然后通过props传递给组件即可。
    选中事件的参数：checkedKeys, e:{checked: bool, checkedNodes, node, event}

    通过传递`checkStrictly`属性给组件可以指明父子节点的关联关系，为true时父子节点不再关联，完全受控，具体见demo