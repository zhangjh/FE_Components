/**
 * Created by jihong.zjh on 2017/1/25.
 * Des: 右键菜单组件
 */
import React, { PropTypes } from 'react';
import { Menu } from 'antd';

const { SubMenu } = Menu;

function genRightMenuData(data) {
  return data.map((item) => {
    if (item.isLeaf) {
      return (
        <Menu.Item
          key={item.key}
          disabled={item.disabled}
        >
          { item.name }
        </Menu.Item>
      );
    }
    return (
      <SubMenu
        title={item.name}
        disabled={item.disabled}
      >
        { genRightMenuData(item.children) }
      </SubMenu>
    );
  });
}

class RightMenu extends React.Component {
  constructor(props) {
    super(props);
    this.onRightMenuClick = this.onRightMenuClick.bind(this);
  }
  onRightMenuClick({ item, key, keyPath }) {
    this.props.onRightMenuClickCb(item, key, keyPath);
  }
  render() {
    return (
      this.props.showMenu ?
        <Menu
          style={this.props.style}
          // onClick={this.onRightMenuClick.bind(this, this.props.onRightMenuClickCb)}
          onClick={this.onRightMenuClick}
        >
          {
            genRightMenuData(this.props.menuData)
          }
        </Menu> : null
    );
  }
}

RightMenu.propTypes = {
  showMenu: PropTypes.bool,
  style: PropTypes.object,
  menuData: PropTypes.array,
  onRightMenuClickCb: PropTypes.func,
};

export default RightMenu;
