import {memo} from "react";
import "./style.css"

function Pagination ({perPage, count, currentPage, setPage}) {
  const pages = Math.ceil(count / perPage) | 0
  const arr = [...Array(pages).keys()]
  return (
    <div className="Page">
      {arr.map((elem, index) => {
        const page = elem + 1
        const btn = <button key={index} className={"Page-btn" + (page === currentPage ? " selected" : "")} onClick={() => setPage(elem + 1)}>{elem + 1}</button>

        if (page === 1
          || page === pages
          || page === currentPage
          || page === currentPage - 1
          || page === currentPage + 1
          || (currentPage === 1 && page === 3)
          || (currentPage === pages && page === pages - 2)) {
          return btn
        } else if ((page === 2 &&  currentPage > 3) ||  (page === pages - 1 && currentPage < pages - 2)) {
          return <span className="Page-dots">...</span>
        }

      })}
    </div>
  )
}

export default memo(Pagination)
