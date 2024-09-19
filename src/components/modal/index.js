import React from "react";
import "./style.css"
import PropTypes from "prop-types";

function Modal({isOpen, children}) {

  return (
    <div className={'Modal-wrapper' + (isOpen ? '' : ' Modal_close')}>
      <div className='Modal'>
        {children}
      </div>
    </div>
  )
}

Modal.propTypes = {
  isOpen: PropTypes.bool,
};

export default React.memo(Modal);
