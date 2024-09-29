import {memo} from "react";
import {Link} from "react-router-dom";
import {cn as bem} from "@bem-react/classname";
import "./style.css"

function Menu ({path = "/", children}) {
  const cn = bem('Menu');
  return (
    <div className={cn()}>
      <Link className={cn("btn")} to={path}>Главная</Link>
      {children}
    </div>
  )
}

export default memo(Menu);
