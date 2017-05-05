/**
 * Created by njhxzhangjh@gmail.com on 2017/5/4.
 * Des: 内嵌式左侧菜单组件
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Icon, Switch } from 'antd';
import 'antd/dist/antd.css';

const SubMenu = Menu.SubMenu;

class Siderbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: this.props.current || '1',
      openKeys: [],
      theme: 'light',
    };
    this.onOpenChange = this.onOpenChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  onOpenChange(openKeys) {
    // const latestOpenKeys = openKeys.filter(key => this.state.openKeys.indexOf(key) === -1);
    // const latestCloseKeys = this.state.openKeys.filter(key => openKeys.indexOf(key) !== -1);
    // const nextOpenKeys = [];
    console.log(openKeys);
    this.setState({
      openKeys: openKeys.slice(openKeys.length - 1),
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
      <div style={{ height: '100%' }}>
        { this.props.showSwitch ?
          <div>
            <Switch
              checked={this.state.theme === 'dark'}
              onChange={(value) => {
                this.setState({
                  theme: value ? 'dark' : 'light',
                });
              }}
              checkedChildren="Dark"
              unCheckedChildren="Light"
            />
            <br />
            <br />
          </div>
          : null }
        <Menu
          mode="inline"
          openkeys={this.state.openKeys}
          selectedKeys={[this.state.current]}
          style={this.props.style || { width: 240, height: '100%' }}
          theme={this.state.theme}
          onOpenChange={this.onOpenChange}
          onClick={this.handleClick}
        >
          {
            this.props.menuData.map((item) => {
              if (item.show) {
                return (
                  <SubMenu
                    key={item.key}
                    title={<span><Icon type={item.type} />{item.title}</span>}
                  >
                    {
                      item.options.map((option) => {
                        if (option.show) {
                          return (
                            <Menu.Item key={option.key}>
                              { option.content }
                            </Menu.Item>
                          );
                        }
                        return null;
                      })
                    }
                  </SubMenu>
                );
              }
              return null;
            })
          }
        </Menu>
      </div>
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
