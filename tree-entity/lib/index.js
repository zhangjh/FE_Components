'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _style3 = require('antd/lib/icon/style');

var _icon = require('antd/lib/icon');

var _icon2 = _interopRequireDefault(_icon);

var _style4 = require('antd/lib/tree/style');

var _tree = require('antd/lib/tree');

var _tree2 = _interopRequireDefault(_tree);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _RightMenu = require('./RightMenu');

var _RightMenu2 = _interopRequireDefault(_RightMenu);

require('./index.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by jihong.zjh on 2017/1/21.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Des: 公共树组件
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var TreeNode = _tree2.default.TreeNode;


function genTreeData(data) {
  return data.map(function (item) {
    if (item.isLeaf) {
      return _react2.default.createElement(TreeNode, {
        title: _react2.default.createElement(
          'span',
          { style: item.titleStyle || {} },
          _react2.default.createElement(_icon2.default, { type: 'file' }),
          ' ',
          item.name
        ),
        key: item.id,
        isLeaf: item.isLeaf
      });
    }
    return _react2.default.createElement(
      TreeNode,
      {
        title: _react2.default.createElement(
          'span',
          { style: item.titleStyle || {} },
          _react2.default.createElement(_icon2.default, { type: 'folder' }),
          ' ',
          item.name
        ),
        key: item.id,
        isLeaf: item.isLeaf
      },
      genTreeData(item.children)
    );
  });
}

// 树控件组件

var TreeEntity = function (_React$Component) {
  _inherits(TreeEntity, _React$Component);

  function TreeEntity(props) {
    _classCallCheck(this, TreeEntity);

    var _this = _possibleConstructorReturn(this, (TreeEntity.__proto__ || Object.getPrototypeOf(TreeEntity)).call(this, props));

    _this.state = {
      showMenu: false,
      checkable: false,
      draggable: false,
      checkStrictly: false
    };
    _this.onCheck = _this.onCheck.bind(_this);
    _this.onSelect = _this.onSelect.bind(_this);
    _this.onRightClick = _this.onRightClick.bind(_this);
    _this.onDrop = _this.onDrop.bind(_this);
    return _this;
  }

  _createClass(TreeEntity, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      if (this.props.expandedKeys) {
        this.state.expandedKeys = this.props.expandedKeys || [];
      }
      if (this.props.checkedKeys) {
        this.state.checkedKeys = this.props.checkedKeys || [];
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      // 添加全局点击事件,以取消右键菜单的显示
      document.addEventListener('click', function () {
        _this2.setState({
          showMenu: false
        });
      });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.expandedKeys) {
        this.state.expandedKeys = nextProps.expandedKeys || [];
        this.state.onExpand = nextProps.onExpand;
        this.state.autoExpandParent = nextProps.autoExpandParent;
      }
      if (nextProps.checkedKeys) {
        this.state.checkedKeys = nextProps.checkedKeys || [];
      }
      this.setState({
        checkable: nextProps.checkable,
        draggable: nextProps.draggable
      });
    }
  }, {
    key: 'onCheck',
    value: function onCheck(checkedKeys, e) {
      console.log(checkedKeys, e);
      this.setState({
        checkedKeys: checkedKeys
      });
      this.props.onCheckCb(checkedKeys, e);
    }
    // 节点单击回调函数
    // cb -- 用户回调函数
    // selectedKeys -- 被选中的节点的key值
    // e -- {selected: bool, selectedNodes, node, event}

  }, {
    key: 'onSelect',
    value: function onSelect(selectedKeys, e) {
      console.log(selectedKeys, e);
      this.props.onSelectCb(selectedKeys, e);
    }
  }, {
    key: 'onRightClick',
    value: function onRightClick(_ref) {
      var event = _ref.event,
          node = _ref.node;

      // 判断当前点击的是否是叶子节点
      if (node.props.isLeaf) {
        this.state.menuData = this.props.menuDataLeaf;
      } else {
        this.state.menuData = this.props.menuDataDir;
      }
      this.state.menuDataLen = this.state.menuData.length;
      var pageX = event.pageX + 10;
      var pageY = event.pageY + 10;
      var left = pageX;
      var top = pageY;
      // 计算菜单占用高度
      var menuHeight = this.state.menuDataLen * 30;
      console.log(pageY + menuHeight);
      if (pageY + menuHeight > document.body.clientHeight) {
        // 没有足够的空间存放菜单了，往上展开菜单
        top = pageY - menuHeight;
      }
      var style = {
        position: 'fixed',
        left: left,
        top: top,
        zIndex: 99999,
        width: '120',
        background: '#fff',
        borderRadius: '4px',
        boxShadow: '0 1px 6px rgba(0, 0, 0, 0.2)',
        color: 'rgba(0, 0, 0, 0.65)'
      };
      this.setState({
        showMenu: true,
        rightMenuStyle: style
      });

      this.props.onRightClickCb({ event: event, node: node });
    }
  }, {
    key: 'onDrop',
    value: function onDrop(info) {
      var dropKey = info.node.props.eventKey;
      var dragKey = info.dragNode.props.eventKey;
      // 交换treeNode中dropKey与dragKey的位置
      console.log(dropKey, dragKey);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _tree2.default,
          _extends({}, this.state, {
            onDragEnter: this.props.onDragEnter,
            defaultExpandAll: this.props.defaultExpandAll || true,
            defaultCheckedKeys: this.props.defaultCheckedKeys || [],
            checkable: this.props.checkable,
            draggable: this.props.draggable,
            checkStrictly: this.props.checkStrictly
            // onCheck={this.onCheck.bind(this, this.props.onCheckCb)}            // 勾选复选框操作回调
            // onSelect={this.onSelect.bind(this, this.props.onSelectCb)}         // 单击操作回调
            , onCheck: this.onCheck,
            onSelect: this.onSelect,
            onRightClick: this.onRightClick // 右键操作回调
            , onDrop: this.onDrop // 拖动操作回调
          }),
          genTreeData(this.props.treeNode)
        ),
        this.props.needRightMenu ? _react2.default.createElement(_RightMenu2.default, {
          showMenu: this.state.showMenu,
          style: this.state.rightMenuStyle,
          menuData: this.state.menuData,
          onRightMenuClickCb: this.props.onRightMenuClickCb
        }) : null
      );
    }
  }]);

  return TreeEntity;
}(_react2.default.Component);

TreeEntity.propTypes = {
  needRightMenu: _react.PropTypes.bool,
  defaultExpandAll: _react.PropTypes.bool,
  defaultCheckedKeys: _react.PropTypes.array,
  checkedKeys: _react.PropTypes.array,
  expandedKeys: _react.PropTypes.array,
  onRightMenuClickCb: _react.PropTypes.func,
  onCheckCb: _react.PropTypes.func,
  onSelectCb: _react.PropTypes.func,
  onRightClickCb: _react.PropTypes.func,
  menuDataLeaf: _react.PropTypes.array,
  menuDataDir: _react.PropTypes.array,
  treeNode: _react.PropTypes.array,
  checkable: _react.PropTypes.bool,
  draggable: _react.PropTypes.bool,
  checkStrictly: _react.PropTypes.bool,
  onDragEnter: _react.PropTypes.func
};

exports.default = TreeEntity;
module.exports = exports['default'];