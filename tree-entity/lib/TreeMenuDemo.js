'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reqwest = require('reqwest');

var _reqwest2 = _interopRequireDefault(_reqwest);

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by jihong.zjh on 2017/1/24.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Des: 树菜单组件demo
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Date: 01/24/2017
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

// import 'whatwg-fetch';


var domain = 'http://10.101.95.185:8099';
var service = {
  add_case: '/testCase/addTestCase',
  move_case: '/testCase/updateCaseIndex',
  paste_case: '/testCase/pasteCase',
  remove_case: '/testCase/deleteTestCase',
  rename_case: '/testCase/updateTestCaseName'
};

var sendRequest = function sendRequest(url, data, cb) {
  (0, _reqwest2.default)({
    url: url,
    method: 'POST',
    data: data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then(function (ret) {
    cb(ret);
  });
};

// 接收旧树节点、当前节点id，父节点id以及节点名字，处理后返回新树节点
function handleTreeData(data, curId, parentId, name) {
  var treeNode = data;
  for (var i = 0, len = treeNode.length; i < len; i += 1) {
    if (treeNode[i].id === parentId) {
      // 找到待插入节点的位置，如果有其他子节点，在头部插入
      treeNode[i].children.unshift({
        key: curId,
        id: curId,
        name: name,
        children: [],
        isLeaf: true
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

var TreeMenuDemo = function (_React$Component) {
  _inherits(TreeMenuDemo, _React$Component);

  function TreeMenuDemo(props) {
    _classCallCheck(this, TreeMenuDemo);

    var _this = _possibleConstructorReturn(this, (TreeMenuDemo.__proto__ || Object.getPrototypeOf(TreeMenuDemo)).call(this, props));

    _this.state = {
      treeNode: [],
      menuDataLeaf: [],
      menuDataDir: [],
      showMenu: false,
      needRightMenu: true,
      checkedKeys: [],
      expandedKeys: []
    };
    _this.onDragEnter = _this.onDragEnter.bind(_this);
    _this.onCheckCb = _this.onCheckCb.bind(_this);
    _this.onSelectCb = _this.onSelectCb.bind(_this);
    _this.onRightClickCb = _this.onRightClickCb.bind(_this);
    _this.onRightMenuClickCb = _this.onRightMenuClickCb.bind(_this);
    _this.onCheck = _this.onCheck.bind(_this);
    _this.onExpand = _this.onExpand.bind(_this);
    return _this;
  }

  _createClass(TreeMenuDemo, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
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
      this.state.treeNode = [{
        children: [{
          children: [{
            children: [{
              id: 126,
              isLeaf: true,
              key: 126,
              name: '01',
              children: [],
              parentId: 1000023
            }, {
              children: [],
              id: 1000028,
              isLeaf: true,
              key: 1000028,
              name: '目录BBBBB',
              parentId: 1000023
            }],
            id: 1000023,
            isLeaf: false,
            key: 1000023,
            name: '目录C',
            parentId: 1000020
          }, {
            children: [],
            id: 123,
            isLeaf: false,
            key: 123,
            name: 'test node',
            parentId: 1000020
          }],
          id: 1000020,
          isLeaf: false,
          key: 1000020,
          name: '目录A',
          parentId: 12
        }],
        id: 12,
        isLeaf: false,
        key: 12,
        name: 'zhouhongtestSET',
        titleStyle: {
          background: 'red'
        }
      }];
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
          isLeaf: true
        }, {
          key: 'add_case_after',
          type: 'add_case_after',
          name: '在下方添加',
          children: [],
          isLeaf: true
        }],
        isLeaf: false
      }, {
        key: 'copy_case',
        type: 'copy_case',
        name: '复制案例',
        children: [],
        isLeaf: true
      }, {
        key: 'cut_case',
        type: 'cut_case',
        name: '剪切案例',
        children: [],
        isLeaf: true
      }, {
        key: 'move_case',
        type: 'move_case',
        name: '移动案例',
        children: [{
          key: 'move_case_before',
          type: 'move_case_before',
          name: '上移',
          children: [],
          isLeaf: true
        }, {
          key: 'move_case_after',
          type: 'move_case_after',
          name: '下移',
          children: [],
          isLeaf: true
        }],
        isLeaf: false
      }, {
        key: 'remove_case',
        type: 'remove_case',
        name: '删除',
        children: [],
        isLeaf: true
      }, {
        key: 'rename_case',
        type: 'rename_case',
        name: '重命名',
        children: [],
        isLeaf: true
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
          parentId: 'add_dir'
        }, {
          key: 'add_dir_after',
          type: 'add_dir_after',
          name: '在下方添加',
          children: [],
          isLeaf: true,
          parentId: 'add_dir'
        }, {
          key: 'add_case',
          type: 'add_case',
          name: '添加节点',
          children: [],
          isLeaf: true
        }],
        isLeaf: false
      }, {
        key: 'copy_dir',
        type: 'copy_dir',
        name: '复制目录',
        children: [],
        isLeaf: true
      }, {
        key: 'cut_dir',
        type: 'cut_dir',
        name: '剪切目录',
        children: [],
        isLeaf: true
      }, {
        key: 'paste_dir',
        type: 'paste_dir',
        name: '粘贴',
        children: [],
        isLeaf: true,
        disabled: true
      }, {
        key: 'rename_dir',
        type: 'rename_dir',
        name: '重命名',
        children: [],
        isLeaf: true
      }, {
        key: 'remove_dir',
        type: 'remove_dir',
        name: '删除',
        children: [],
        isLeaf: true
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
          isLeaf: true
        }, {
          key: 'move_dir_after',
          type: 'move_dir_after',
          name: '下移',
          children: [],
          isLeaf: true
        }],
        isLeaf: false
      }, {
        key: 'add_case',
        type: 'add_case',
        name: '添加案例',
        children: [],
        isLeaf: true
      }];
    }
  }, {
    key: 'onDragEnter',
    value: function onDragEnter(info) {
      console.log(info);
    }
  }, {
    key: 'onRightMenuClickCb',
    value: function onRightMenuClickCb(item, key, keyPath) {
      var _this2 = this;

      // 右键之后的回调函数
      console.log(item, key, keyPath);
      // alert(`右键选中的key是：${key}`);
      var name = new Date().getTime();
      switch (key) {
        case 'add_case_before':
          sendRequest(domain + service.add_case, {
            testCaseFoldId: this.state.clickId,
            name: name,
            tradeFlowId: 1
          }, function (ret) {
            if (ret.success) {
              alert('succ');
              _this2.setState({
                treeNode: handleTreeData(_this2.state.treeNode, ret.data.id, ret.data.parentId, name)
              });
            }
          });
          break;
        case 'add_case_after':
          sendRequest(domain + service.add_case, {
            testCaseFoldId: this.state.clickId,
            name: name,
            tradeFlowId: 1,
            indexMoveType: 'AFTER'
          }, function (ret) {
            if (ret.success) {
              alert('succ');
              _this2.setState({
                treeNode: handleTreeData(_this2.state.treeNode, ret.data.id, ret.data.parentId, name)
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
            indexMoveType: 'before'
          }, function (ret) {
            console.log(ret);
          });
          break;
        case 'move_case_after':
          sendRequest(domain + service.move_case, {
            testSetId: this.state.clickId,
            indexMoveType: 'after'
          }, function (ret) {
            console.log(ret);
          });
          break;
        default:
          break;
      }
    }
  }, {
    key: 'onCheckCb',
    value: function onCheckCb(checkedKeys, e) {
      // 复选框勾选后的回调函数
      console.log(checkedKeys, e);
    }
  }, {
    key: 'onSelectCb',
    value: function onSelectCb(selectedKeys, e) {
      console.log(selectedKeys, e);
      if (e.selected) {
        if (e.selectedNodes[0].props.isLeaf) {
          alert(e.event + e.selectedNodes[0].key);
        }
      }
    }
  }, {
    key: 'onRightClickCb',
    value: function onRightClickCb(_ref) {
      var event = _ref.event,
          node = _ref.node;

      console.log(event);
      this.state.clickId = node.props.eventKey;
      console.log(this.state.clickId);
    }
  }, {
    key: 'onCheck',
    value: function onCheck(checkedKeys) {
      this.setState({
        checkedKeys: checkedKeys
      });
    }
  }, {
    key: 'onExpand',
    value: function onExpand(expandedKeys) {
      var _this3 = this;

      var arr = expandedKeys.filter(function (item) {
        var notInside = _this3.state.expandedKeys.indexOf(item) === -1;
        return notInside;
      });
      this.setState({
        expandedKeys: arr,
        // checkedKeys: arr,
        autoExpandParent: false
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_index2.default, {
          treeNode: this.state.treeNode,
          checkable: true,
          checkStrictly: false,
          defaultExpandAll: false,
          defaultCheckedKeys: [],
          checkedKeys: this.state.checkedKeys,
          onCheck: this.onCheck,
          expandedKeys: this.state.expandedKeys,
          onExpand: this.onExpand,
          draggable: false,
          onDragEnter: this.onDragEnter,
          onCheckCb: this.onCheckCb,
          onSelectCb: this.onSelectCb,
          onRightClickCb: this.onRightClickCb,
          onRightMenuClickCb: this.onRightMenuClickCb,
          menuDataLeaf: this.state.menuDataLeaf,
          menuDataDir: this.state.menuDataDir,
          needRightMenu: this.state.needRightMenu,
          needSearch: true,
          searchStyle: { width: 200 }
        })
      );
    }
  }]);

  return TreeMenuDemo;
}(_react2.default.Component);

exports.default = TreeMenuDemo;
module.exports = exports['default'];