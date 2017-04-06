/**
 * Created by njhxzhangjh on 2017/4/6.
 * Des: 富文本/Markdown编辑器，依赖xheditor/mditor
 */
import React from 'react';
import { Row, Radio, Button } from 'antd';
// import $ from 'jquery';

const RadioGroup = Radio.Group;

class FullText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'markdown',
      isEdit: this.props.isEdit || false,
      editorSetting: {
        tools: 'Blocktag,Fontface,FontSize,Bold,Italic,Underline,Strikethrough,FontColor,BackColor,Align,List,Link,Img,Hr,Table,Source,Preview,Fullscreen',
        skin: 'nostyle',
        height: '320',
        width: '100%',
        html5Upload: false,
        upImgUrl: 'Upload.do',
        upImgExt: 'jpg,jpeg,gif,bmp,png',
        localUrlTest: /^http?:\/\/[^\/]*?(defect.(alibaba-inc|aliyun)\.com)\//i,
        remoteImgSaveUrl: 'ajaxFileUpload.htm',
        fullscreen: false,
      },
    };
    this.genEditor = this.genEditor.bind(this);
    this.initMarkDown = this.initMarkDown.bind(this);
    this.removeMarkDown = this.removeMarkDown.bind(this);
    this.initFullText = this.initFullText.bind(this);
    this.removeFullText = this.removeFullText.bind(this);
    this.getContent = this.getContent.bind(this);
    this.onRadioChange = this.onRadioChange.bind(this);
  }

  getContent(){
    if (this.state.type === 'markdown'){
      let mditor = Mditor.fromTextarea(this.refs.editor);
      return mditor.value;
    } else {
      let xheditor = $(this.refs.editor).xheditor();
      return xheditor.getSource();
    }
  }

  genEditor(){
    if (this.state.type === 'markdown'){
      this.initMarkDown();
      this.removeFullText();
    } else {
      this.initFullText();
      this.removeMarkDown();
    }
  }

  onRadioChange(e){
    this.setState({
      type: e.target.value
    });
  }

  initMarkDown(){
    this.removeMarkDown();
    // const mditor =  Mditor.fromTextarea(document.getElementById('editor'));
    let mditor = Mditor.fromTextarea(this.refs.editor);
    //获取或设置编辑器的值
    mditor.on('ready', () => {
      mditor.value = this.props.value;
      mditor.editor.on('paste',function(event){
        console.log('paste');
        // Todo：将截图黏贴后直接生存markdown标记
      });
    });
  }

  removeMarkDown(){
    $('.mditor').remove();
    // let mditor = Mditor.fromTextarea(this.refs.editor);
    // mditor.switchTextarea();
  }

  initFullText(){
    this.removeFullText();
    $(this.refs.editor).xheditor(this.state.editorSetting).setSource(this.props.value);
  }

  removeFullText(){
    $(this.refs.editor).xheditor(false);
    // 隐藏textarea
    $(this.refs.editor).hide();
  }

  render() {
    return (
      // 非编辑状态不显示富文本框
      this.state.isEdit ?
        <div>
          <Row>
            <RadioGroup
              value={this.state.type}
              onChange={this.onRadioChange}
            >
              <Radio value='full'>富文本</Radio>
              <Radio value='markdown'>MarkDown</Radio>
            </RadioGroup>
          </Row>
          <textarea name='editor' id='editor' ref='editor'></textarea>
          <Row>
            <Button
              type='primary'
              onClick={ () => {
                this.props.save(this.getContent());
                this.removeFullText();
                this.removeMarkDown();
                this.setState({
                  isEdit: false
                });
              }}
            >
              保存
            </Button>
          </Row>
        </div> :
        <div>
          <div
            dangerouslySetInnerHTML={{__html: this.props.value}}
            style={ this.props.style }
          />
          <Button
            type='ghost'
            onClick={() => {
              this.setState({
                isEdit: true
              });
            }}
            style={{
              position: 'absolute',
              top: this.props.pageY,
              left: this.props.left
            }}
          >
            编辑描述
          </Button>
        </div>
    );
  }

  componentDidMount() {
    this.state.isEdit ?
      this.genEditor() :
      null;
  }

  componentDidUpdate() {
    this.state.isEdit ?
      this.genEditor() :
      null;
  }
}

export default FullText;
