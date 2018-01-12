import React from 'react';
import './index.css';

export default props => (
  <div className={`panel panel-${props.class}`}>
    <div className="panel-heading">
      <h3 className="panel-title pull-left">
        {props.title}
      </h3>
      {props.action ? props.action : null}
      <div className="clearfix" />
    </div>

    <div className="panel-body">
      {props.children}
    </div>
  </div>
);
