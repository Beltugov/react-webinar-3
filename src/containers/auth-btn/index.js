import {memo} from "react";
import {Link, useNavigate} from "react-router-dom";
import SideLayout from "../../components/side-layout";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";


function AuthBtn() {
  const store = useStore();

  const select = useSelector((state) => ({
    user: state.user.data
  }))

  const authAction = () => {
    if (select.user !== null) store.actions.user.logout()
  }

  return (
    <SideLayout side={"end"} padding={"long"}>
      { select.user === null ? " " : <Link to={"/profile"}>{select.user.profile.name}</Link>}
      <div className="Auth-btn">
        <Link to={select.user === null ? "/login" : "/"}>
          <button onClick={authAction}>
            {select.user === null ? "Вход" : "Выход"}
          </button>
        </Link>
      </div>
    </SideLayout>
  )
}

export default memo(AuthBtn)
