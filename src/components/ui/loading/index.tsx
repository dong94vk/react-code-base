import * as React from 'react';
import css from './style.scss';

const Loading = () => {
  return (
    <div className={`${css.ld}`}>
      <div className="circle-line">
        <div className="circle-red">&nbsp;</div>
        <div className="circle-blue">&nbsp;</div>
        <div className="circle-green">&nbsp;</div>
        <div className="circle-yellow">&nbsp;</div>
      </div>
   </div>
  );
};

export default Loading;