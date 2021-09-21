import * as React from 'react';
import css from './style.scss';

type Props = {

}
const Header = (props: Props) => {
  return (
    <div className={`header ${css.vh}`}>
      <h3>Header page</h3>
    </div>
  )
}

export default Header;
