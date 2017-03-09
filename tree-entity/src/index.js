/**
 * Created by jihong.zjh on 2017/1/21.
 * Des: 公共树组件
 */
import React, { PropTypes } from 'react';
import { Tree, Icon } from 'antd';
import RightMenu from './RightMenu';
import './index.less';

const { TreeNode } = Tree;

function genTreeData(data) {
  return data.map((item) => {
    if (item.isLeaf) {
      return (
        <TreeNode
          title={<span style={item.titleStyle || {}}><Icon type="file" /> {item.name}</span>}
          key={item.id}
          isLeaf={item.isLeaf}
        />
      );
    }
    return (
      <TreeNode
        title={<span style={item.titleStyle || {}}><Icon type="folder" /> {item.name}</span>}
        key={item.id}
        isLeaf={item.isLeaf}
      >
        { genTreeData(item.children) }
      </TreeNode>
    );
  });
}

// 树控件组件
class TreeEntity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false,
      checkable: false,
      draggable: false,
      checkStrictly: false,
    };
    this.onCheck = this.onCheck.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onRightClick = this.onRightClick.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }
  componentWillMount() {
    if (this.props.expandedKeys) {
      this.state.expandedKeys = this.props.expandedKeys || [];
    }
    if (this.props.checkedKeys) {
      this.state.checkedKeys = this.props.checkedKeys || [];
    }
  }
  componentDidMount() {
    // 添加全局点击事件,以取消右键菜单的显示
    document.addEventListener('click', () => {
      this.setState({
        showMenu: false,
      });
    });
  }
  componentWillReceiveProps(nextProps) {
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
      draggable: nextProps.draggable,
    });
  }

  onCheck(checkedKeys, e) {
    console.log(checkedKeys, e);
    this.setState({
      checkedKeys,
    });
    this.props.onCheckCb(checkedKeys, e);
  }
  // 节点单击回调函数
  // cb -- 用户回调函数
  // selectedKeys -- 被选中的节点的key值
  // e -- {selected: bool, selectedNodes, node, event}
  onSelect(selectedKeys, e) {
    console.log(selectedKeys, e);
    this.props.onSelectCb(selectedKeys, e);
  }
  onRightClick({ event, node }) {
    // 判断当前点击的是否是叶子节点
    if (node.props.isLeaf) {
      this.state.menuData = this.props.menuDataLeaf;
    } else {
      this.state.menuData = this.props.menuDataDir;
    }
    this.state.menuDataLen = this.state.menuData.length;
    const pageX = event.pageX + 10;
    const pageY = event.pageY + 10;
    const left = pageX;
    let top = pageY;
    // 计算菜单占用高度
    const menuHeight = this.state.menuDataLen * 30;
    console.log(pageY + menuHeight);
    if (pageY + menuHeight > document.body.clientHeight) {
      // 没有足够的空间存放菜单了，往上展开菜单
      top = pageY - menuHeight;
    }
    const style = {
      position: 'fixed',
      left,
      top,
      zIndex: 99999,
      width: '120',
      background: '#fff',
      borderRadius: '4px',
      boxShadow: '0 1px 6px rgba(0, 0, 0, 0.2)',
      color: 'rgba(0, 0, 0, 0.65)',
    };
    this.setState({
      showMenu: true,
      rightMenuStyle: style,
    });

    this.props.onRightClickCb({ event, node });
  }
  onDrop(info) {
    const dropKey = info.node.props.eventKey;
    const dragKey = info.dragNode.props.eventKey;
    // 交换treeNode中dropKey与dragKey的位置
    console.log(dropKey, dragKey);
  }
  render() {
    return (
      <div>
        <Tree
          {...this.state}
          onDragEnter={this.props.onDragEnter}
          defaultExpandAll={this.props.defaultExpandAll || true}
          defaultCheckedKeys={this.props.defaultCheckedKeys || []}
          checkable={this.props.checkable}
          draggable={this.props.draggable}
          checkStrictly={this.props.checkStrictly}
          // onCheck={this.onCheck.bind(this, this.props.onCheckCb)}            // 勾选复选框操作回调
          // onSelect={this.onSelect.bind(this, this.props.onSelectCb)}         // 单击操作回调
          onCheck={this.onCheck}
          onSelect={this.onSelect}
          onRightClick={this.onRightClick}                                    // 右键操作回调
          onDrop={this.onDrop}                                                // 拖动操作回调
        >
          {
            genTreeData(this.props.treeNode)
          }
        </Tree>
        {
          this.props.needRightMenu ?
            <RightMenu
              showMenu={this.state.showMenu}
              style={this.state.rightMenuStyle}
              menuData={this.state.menuData}
              onRightMenuClickCb={this.props.onRightMenuClickCb}
            /> : null
        }
      </div>
    );
  }
}

TreeEntity.propTypes = {
  needRightMenu: PropTypes.bool,
  defaultExpandAll: PropTypes.bool,
  defaultCheckedKeys: PropTypes.array,
  checkedKeys: PropTypes.array,
  expandedKeys: PropTypes.array,
  onRightMenuClickCb: PropTypes.func,
  onCheckCb: PropTypes.func,
  onSelectCb: PropTypes.func,
  onRightClickCb: PropTypes.func,
  menuDataLeaf: PropTypes.array,
  menuDataDir: PropTypes.array,
  treeNode: PropTypes.array,
  checkable: PropTypes.bool,
  draggable: PropTypes.bool,
  checkStrictly: PropTypes.bool,
  onDragEnter: PropTypes.func,
};

export default TreeEntity;