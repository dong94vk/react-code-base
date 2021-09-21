import * as React from 'react';

export default (props) => {
  const { className = '', status = 404 } = props;
  const errorCode = status;
  const errorMessage =
    errorCode === 403
      ? 'Oops! You are not allowed to perform this action'
      : 'Oops! This Page Could Not Be Found';

  return (
    <div className={`page ${className} text-center`}>
      <div className="error-code">
        <h1>{errorCode}</h1>
      </div>
      <h2>{errorMessage}</h2>
      <a href="/" className="btn-back">
        Go To Homepage
      </a>
    </div>
  );
};
