import {memo} from "react";
import {Link} from "react-router-dom";
import SideLayout from "../side-layout";

function LoginBtn(props) {
  return (
    <SideLayout side={"between"}>
      {props.user !== null ? <Link to={"/profile"}>{props.user.profile.name}</Link> : " "}
      <Link to={props.user === null ? "/login" : "/"}>
        <button onClick={() => props.authAction()}>
          {props.user === null ? "Вход" : "Выход"}
        </button>
      </Link>
    </SideLayout>
  )
}

export default memo(LoginBtn)
