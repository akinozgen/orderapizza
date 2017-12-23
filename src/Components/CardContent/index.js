import React from 'react';
import './index.css';

export default (props) => {
  const {
    svg, title, content, classProp,
  } = props;

  return (
    <div className={`${classProp} responsive-column`}>
      <div className="icon-box">
        <div className="icon-box-inner">
          <div className="icon-box-icon">
            <img src={svg} alt="" />
          </div>
        </div>
        <h3 className="bottom-line">{title}</h3>
        {content}
      </div>
    </div>
  );
};
