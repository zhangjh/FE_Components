/**
 * Created by njhxzhangjihong@126.com on 2017/3/17.
 * Des: A rainbow loadin component written by ant-design for react projects.
 */
import React, { PropTypes } from 'react';
import './index.less';

class Loading extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    //This array controls the line number of rainbow.Default show five lines.
    const numbers = this.props.numbers || [1,2,3,4,5];
    const divs = numbers.map(num =>
      <div className="loader-line-wrap" key={num}>
        <div className="loader-line"></div>
      </div>
    );
    return (
      <div className="loader">
        <div className="loader-inner">
          { divs }
        </div>
      </div>
    );
  }
}

Loading.propTypes = {
  numbers: PropTypes.array,
};

export default Loading;
