'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _style2 = require('antd/lib/menu/style');

var _menu = require('antd/lib/menu');

var _menu2 = _interopRequireDefault(_menu);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by jihong.zjh on 2017/1/25.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Des: 右键菜单组件
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var SubMenu = _menu2.default.SubMenu;


function genRightMenuData(data) {
  return data.map(function (item) {
    if (item.isLeaf) {
      return _react2.default.createElement(
        _menu2.default.Item,
        {
          key: item.key,
          disabled: item.disabled
        },
        item.name
      );
    }
    return _react2.default.createElement(
      SubMenu,
      {
        title: item.name,
        disabled: item.disabled
      },
      genRightMenuData(item.children)
    );
  });
}

var RightMenu = function (_React$Component) {
  _inherits(RightMenu, _React$Component);

  function RightMenu(props) {
    _classCallCheck(this, RightMenu);

    var _this = _possibleConstructorReturn(this, (RightMenu.__proto__ || Object.getPrototypeOf(RightMenu)).call(this, props));

    _this.onRightMenuClick = _this.onRightMenuClick.bind(_this);
    return _this;
  }

  _createClass(RightMenu, [{
    key: 'onRightMenuClick',
    value: function onRightMenuClick(_ref) {
      var item = _ref.item,
          key = _ref.key,
          keyPath = _ref.keyPath;

      this.props.onRightMenuClickCb(item, key, keyPath);
    }
  }, {
    key: 'render',
    value: function render() {
      return this.props.showMenu ? _react2.default.createElement(
        _menu2.default,
        {
          style: this.props.style
          // onClick={this.onRightMenuClick.bind(this, this.props.onRightMenuClickCb)}
          , onClick: this.onRightMenuClick
        },
        genRightMenuData(this.props.menuData)
      ) : null;
    }
  }]);

  return RightMenu;
}(_react2.default.Component);

RightMenu.propTypes = {
  showMenu: _react.PropTypes.bool,
  style: _react.PropTypes.object,
  menuData: _react.PropTypes.array,
  onRightMenuClickCb: _react.PropTypes.func
};

exports.default = RightMenu;
module.exports = exports['default'];