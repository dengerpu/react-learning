import React from 'react';
import Style from './css/styles.module.scss';
import PropTypes from 'prop-types'
const Dialog = function (props) {
  let {title, children} = props;
  children = React.Children.toArray(children);
  return <div className={Style.dialog_container}>
    <div className={Style.dialog_container_header}>
      <span>{title}</span>
      <span>x</span>
    </div>
    <div className={Style.dialog_container_content}>
      {children}
    </div>
    <div className={Style.dialog_container_footer}>
      <button>确定</button>
      <button>关闭</button>
    </div>
  </div>
}

Dialog.defaultProps = {
  title: '温馨提示'
}

Dialog.propTypes = {
  title: PropTypes.string
}

export default Dialog