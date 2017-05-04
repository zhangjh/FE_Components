/**
 * Created by jihong.zjh on 2017/5/4.
 * Des: 内嵌式左侧菜单组件
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Icon } from 'antd';

const SubMenu = Menu.SubMenu;

class Siderbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: this.props.current || '1',
      openKeys: [],
    };
    this.onOpenChange = this.onOpenChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  onOpenChange(openKeys) {
    const latestOpenKey = openKeys.find(key => !(this.openKeys.indexOf(key) > -1));
    const latestCloseKey = this.state.openKeys.find(key => !(openKeys.indexOf(key) > -1));
    let nextOpenKeys = [];
    if (latestOpenKey) {
      nextOpenKeys = latestOpenKey;
    }
    if (latestCloseKey) {
      nextOpenKeys = latestCloseKey;
    }
    this.setState({
      openKeys: nextOpenKeys,
    });
    if (this.props.onOpenChange) {
      this.props.onOpenChange();
    }
  }
  handleClick(e) {
    this.setState({
      current: e.key,
    });
    if (this.props.onClick) {
      this.props.onClick();
    }
  }
  render() {
    return (
      <Menu
        mode="inline"
        openkeys={this.state.openKeys}
        selectedKeys={[this.state.current]}
        style={this.props.style || { width: 240 }}
        onOpenChange={this.onOpenChange}
        onClick={this.handleClick}
      >
        {
          this.props.menuData.map(item =>
            <SubMenu
              key={item.key}
              title={<span><Icon type={item.type} />{item.title}</span>}
            >
              {
                item.options.map(option =>
                  <Menu.Item key={option.key}>
                    { option.content }
                  </Menu.Item>,
                )
              }
            </SubMenu>,
          )
        }
      </Menu>
    );
  }
}

Siderbar.propTypes = {
  menuData: PropTypes.array.isRequired,
  current: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
  onOpenChange: PropTypes.func,
};

export default Siderbar;
