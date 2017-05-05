'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _antd = require('antd');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by njhxzhangjh@gmail.com on 2017/5/4.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Des: 内嵌式左侧菜单组件
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var SubMenu = _antd.Menu.SubMenu;

var Siderbar = function (_React$Component) {
  _inherits(Siderbar, _React$Component);

  function Siderbar(props) {
    _classCallCheck(this, Siderbar);

    var _this = _possibleConstructorReturn(this, (Siderbar.__proto__ || Object.getPrototypeOf(Siderbar)).call(this, props));

    _this.state = {
      current: _this.props.current || '1',
      openKeys: [],
      theme: 'light'
    };
    _this.onOpenChange = _this.onOpenChange.bind(_this);
    _this.handleClick = _this.handleClick.bind(_this);
    return _this;
  }

  _createClass(Siderbar, [{
    key: 'onOpenChange',
    value: function onOpenChange(openKeys) {
      var _this2 = this;

      var latestOpenKey = openKeys.find(function (key) {
        return !(_this2.openKeys.indexOf(key) > -1);
      });
      var latestCloseKey = this.state.openKeys.find(function (key) {
        return !(openKeys.indexOf(key) > -1);
      });
      var nextOpenKeys = [];
      if (latestOpenKey) {
        nextOpenKeys = latestOpenKey;
      }
      if (latestCloseKey) {
        nextOpenKeys = latestCloseKey;
      }
      this.setState({
        openKeys: nextOpenKeys
      });
      if (this.props.onOpenChange) {
        this.props.onOpenChange();
      }
    }
  }, {
    key: 'handleClick',
    value: function handleClick(e) {
      this.setState({
        current: e.key
      });
      if (this.props.onClick) {
        this.props.onClick();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement(
        'div',
        null,
        this.props.showSwitch ? _react2.default.createElement(_antd.Switch, {
          checked: this.state.theme === 'dark',
          onChange: function onChange(value) {
            _this3.setState({
              theme: value ? 'dark' : 'light'
            });
          },
          checkedChildren: 'Dark',
          unCheckedChildren: 'Light'
        }) : null,
        _react2.default.createElement('br', null),
        _react2.default.createElement('br', null),
        _react2.default.createElement(
          _antd.Menu,
          {
            mode: 'inline',
            openkeys: this.state.openKeys,
            selectedKeys: [this.state.current],
            style: this.props.style || { width: 240, height: '100%' },
            theme: this.state.theme,
            onOpenChange: this.onOpenChange,
            onClick: this.handleClick
          },
          this.props.menuData.map(function (item) {
            if (item.show) {
              return _react2.default.createElement(
                SubMenu,
                {
                  key: item.key,
                  title: _react2.default.createElement(
                    'span',
                    null,
                    _react2.default.createElement(_antd.Icon, { type: item.type }),
                    item.title
                  )
                },
                item.options.map(function (option) {
                  if (option.show) {
                    return _react2.default.createElement(
                      _antd.Menu.Item,
                      { key: option.key },
                      option.content
                    );
                  }
                  return null;
                })
              );
            }
            return null;
          })
        )
      );
    }
  }]);

  return Siderbar;
}(_react2.default.Component);

Siderbar.propTypes = {
  menuData: _propTypes2.default.array.isRequired,
  current: _propTypes2.default.string,
  style: _propTypes2.default.object,
  onClick: _propTypes2.default.func,
  onOpenChange: _propTypes2.default.func
};

exports.default = Siderbar;