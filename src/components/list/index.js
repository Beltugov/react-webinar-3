import React from 'react';
import PropTypes from 'prop-types';
import './style.css';


function List({ list, onClick, comp } = {
  onClick: () => {},

}) {
  console.log()
  return (
    <div className="List">
      {list.map(item => (
        <div key={item.code} className="List-item">
          {comp(item, onClick)}
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    }),
  ).isRequired,
  onClick: PropTypes.func,
  comp: PropTypes.func
};

export default React.memo(List);
