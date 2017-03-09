/**
 * Created by jihong.zjh on 2017/1/24.
 * Des: 树菜单组件demo
 * Date: 01/24/2017
 */
import React from 'react';
// import 'whatwg-fetch';
import reqwest from 'reqwest';
import TreeEntity from './index';

const domain = 'http://10.101.95.185:8099';
const service = {
  add_case: '/testCase/addTestCase',
  move_case: '/testCase/updateCaseIndex',
  paste_case: '/testCase/pasteCase',
  remove_case: '/testCase/deleteTestCase',
  rename_case: '/testCase/updateTestCaseName',
};

const sendRequest = (url, data, cb) => {
  reqwest({
    url,
    method: 'POST',
    data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  }).then((ret) => {
    cb(ret);
  });
};

// 接收旧树节点、当前节点id，父节点id以及节点名字，处理后返回新树节点
function handleTreeData(data, curId, parentId, name) {
  const treeNode = data;
  for (let i = 0, len = treeNode.length; i < len; i += 1) {
    if (treeNode[i].id === parentId) {
      // 找到待插入节点的位置，如果有其他子节点，在头部插入
      treeNode[i].children.unshift({
        key: curId,
        id: curId,
        name,
        children: [],
        isLeaf: true,
      });
      // 插入节点后原节点变成非叶子节点
      treeNode[i].isLeaf = false;
    } else if (treeNode[i].children.length) {
      handleTreeData(treeNode[i].children, curId, parentId, name);
    }
  }
  return treeNode;
}

// 树控件使用demo
class TreeMenuDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      treeNode: [],
      menuDataLeaf: [],
      menuDataDir: [],
      showMenu: false,
      needRightMenu: true,
      checkedKeys: [],
      expandedKeys: [],
    };
    this.onDragEnter = this.onDragEnter.bind(this);
    this.onCheckCb = this.onCheckCb.bind(this);
    this.onSelectCb = this.onSelectCb.bind(this);
    this.onRightClickCb = this.onRightClickCb.bind(this);
    this.onRightMenuClickCb = this.onRightMenuClickCb.bind(this);
    this.onCheck = this.onCheck.bind(this);
    this.onExpand = this.onExpand.bind(this);
  }
  componentWillMount() {
    /* this.state.treeNode = [
      {
        id: 1,
        key: '1',
        name: '0-0-1',
        children: [],
        isLeaf: true,
      }, {
        id: 2,
        key: '2',
        name: '0-0-2',
        children: [{
          id: 3,
          key: '3',
          name: '0-0-3',
          children: [],
          isLeaf: true,
        }, {
          id: 4,
          key: '4',
          name: '0-0-4',
          children: [],
          isLeaf: true,
        }],
        isLeaf: false,
      },
    ];
    */
    this.state.treeNode = [
      {
        children: [
          {
            children: [
              {
                children: [
                  {
                    id: 126,
                    isLeaf: true,
                    key: 126,
                    name: '01',
                    children: [],
                    parentId: 1000023,
                  },
                  {
                    children: [],
                    id: 1000028,
                    isLeaf: true,
                    key: 1000028,
                    name: '目录BBBBB',
                    parentId: 1000023,
                  },
                ],
                id: 1000023,
                isLeaf: false,
                key: 1000023,
                name: '目录C',
                parentId: 1000020,
              },
              {
                children: [
                ],
                id: 123,
                isLeaf: false,
                key: 123,
                name: 'test node',
                parentId: 1000020,
              },
            ],
            id: 1000020,
            isLeaf: false,
            key: 1000020,
            name: '目录A',
            parentId: 12,
          },
        ],
        id: 12,
        isLeaf: false,
        key: 12,
        name: 'zhouhongtestSET',
        titleStyle: {
          background: 'red',
        },
      },
    ];
    // 定义叶子节点右键菜单数据结构
    this.state.menuDataLeaf = [{
      key: 'add_case',
      type: 'add_case',
      name: '添加案例',
      children: [{
        key: 'add_case_before',
        type: 'add_case_before',
        name: '在上方添加',
        children: [],
        isLeaf: true,
      }, {
        key: 'add_case_after',
        type: 'add_case_after',
        name: '在下方添加',
        children: [],
        isLeaf: true,
      }],
      isLeaf: false,
    }, {
      key: 'copy_case',
      type: 'copy_case',
      name: '复制案例',
      children: [],
      isLeaf: true,
    }, {
      key: 'cut_case',
      type: 'cut_case',
      name: '剪切案例',
      children: [],
      isLeaf: true,
    }, {
      key: 'move_case',
      type: 'move_case',
      name: '移动案例',
      children: [{
        key: 'move_case_before',
        type: 'move_case_before',
        name: '上移',
        children: [],
        isLeaf: true,
      }, {
        key: 'move_case_after',
        type: 'move_case_after',
        name: '下移',
        children: [],
        isLeaf: true,
      }],
      isLeaf: false,
    }, {
      key: 'remove_case',
      type: 'remove_case',
      name: '删除',
      children: [],
      isLeaf: true,
    }, {
      key: 'rename_case',
      type: 'rename_case',
      name: '重命名',
      children: [],
      isLeaf: true,
    }];
    // 定义非叶子节点右键菜单数据结构
    this.state.menuDataDir = [{
      key: 'add_dir',
      type: 'add_dir',
      name: '添加目录',
      children: [{
        key: 'add_dir_before',
        type: 'add_dir_before',
        name: '在上方添加',
        children: [],
        isLeaf: true,
        parentId: 'add_dir',
      }, {
        key: 'add_dir_after',
        type: 'add_dir_after',
        name: '在下方添加',
        children: [],
        isLeaf: true,
        parentId: 'add_dir',
      }, {
        key: 'add_case',
        type: 'add_case',
        name: '添加节点',
        children: [],
        isLeaf: true,
      }],
      isLeaf: false,
    }, {
      key: 'copy_dir',
      type: 'copy_dir',
      name: '复制目录',
      children: [],
      isLeaf: true,
    }, {
      key: 'cut_dir',
      type: 'cut_dir',
      name: '剪切目录',
      children: [],
      isLeaf: true,
    }, {
      key: 'paste_dir',
      type: 'paste_dir',
      name: '粘贴',
      children: [],
      isLeaf: true,
      disabled: true,
    }, {
      key: 'rename_dir',
      type: 'rename_dir',
      name: '重命名',
      children: [],
      isLeaf: true,
    }, {
      key: 'remove_dir',
      type: 'remove_dir',
      name: '删除',
      children: [],
      isLeaf: true,
    }, {
      key: 'move_dir',
      type: 'move_dir',
      disabled: true,
      name: '移动目录',
      children: [{
        key: 'move_dir_before',
        type: 'move_dir_before',
        name: '上移',
        children: [],
        isLeaf: true,
      }, {
        key: 'move_dir_after',
        type: 'move_dir_after',
        name: '下移',
        children: [],
        isLeaf: true,
      }],
      isLeaf: false,
    }, {
      key: 'add_case',
      type: 'add_case',
      name: '添加案例',
      children: [],
      isLeaf: true,
    }];
  }
  onDragEnter(info) {
    console.log(info);
  }
  onRightMenuClickCb(item, key, keyPath) {
    // 右键之后的回调函数
    console.log(item, key, keyPath);
    // alert(`右键选中的key是：${key}`);
    const name = new Date().getTime();
    switch (key) {
      case 'add_case_before':
        sendRequest(domain + service.add_case, {
          testCaseFoldId: this.state.clickId,
          name,
          tradeFlowId: 1,
        }, (ret) => {
          if (ret.success) {
            alert('succ');
            this.setState({
              treeNode: handleTreeData(this.state.treeNode, ret.data.id, ret.data.parentId, name),
            });
          }
        });
        break;
      case 'add_case_after':
        sendRequest(domain + service.add_case, {
          testCaseFoldId: this.state.clickId,
          name,
          tradeFlowId: 1,
          indexMoveType: 'AFTER',
        }, (ret) => {
          if (ret.success) {
            alert('succ');
            this.setState({
              treeNode: handleTreeData(this.state.treeNode, ret.data.id, ret.data.parentId, name),
            });
          }
        });
        break;
      case 'copy_case':
        console.log(this.state.clickId);
        break;
      case 'paste_case':

        break;
      case 'move_case_before':
        sendRequest(domain + service.move_case, {
          testSetId: this.state.clickId,
          indexMoveType: 'before',
        }, (ret) => {
          console.log(ret);
        });
        break;
      case 'move_case_after':
        sendRequest(domain + service.move_case, {
          testSetId: this.state.clickId,
          indexMoveType: 'after',
        }, (ret) => {
          console.log(ret);
        });
        break;
      default:
        break;
    }
  }

  onCheckCb(checkedKeys, e) {
    // 复选框勾选后的回调函数
    console.log(checkedKeys, e);
  }
  onSelectCb(selectedKeys, e) {
    console.log(selectedKeys, e);
    if (e.selected) {
      if (e.selectedNodes[0].props.isLeaf) {
        alert(e.event + e.selectedNodes[0].key);
      }
    }
  }
  onRightClickCb({ event, node }) {
    console.log(event);
    this.state.clickId = node.props.eventKey;
    console.log(this.state.clickId);
  }
  onCheck(checkedKeys) {
    this.setState({
      checkedKeys,
    });
  }
  onExpand(expandedKeys) {
    const arr = expandedKeys.filter((item) => {
      const notInside = this.state.expandedKeys.indexOf(item) === -1;
      return notInside;
    });
    this.setState({
      expandedKeys: arr,
      // checkedKeys: arr,
      autoExpandParent: false,
    });
  }
  render() {
    return (
      <div>
        <TreeEntity
          treeNode={this.state.treeNode}
          checkable
          checkStrictly={false}
          defaultExpandAll={false}
          defaultCheckedKeys={[]}
          checkedKeys={this.state.checkedKeys}
          onCheck={this.onCheck}
          expandedKeys={this.state.expandedKeys}
          onExpand={this.onExpand}
          draggable={false}
          onDragEnter={this.onDragEnter}
          onCheckCb={this.onCheckCb}
          onSelectCb={this.onSelectCb}
          onRightClickCb={this.onRightClickCb}
          onRightMenuClickCb={this.onRightMenuClickCb}
          menuDataLeaf={this.state.menuDataLeaf}
          menuDataDir={this.state.menuDataDir}
          needRightMenu={this.state.needRightMenu}
          needSearch
          searchStyle={{ width: 200 }}
        />
      </div>
    );
  }
}

export default TreeMenuDemo;