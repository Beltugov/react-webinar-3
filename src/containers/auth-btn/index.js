import {memo, useCallback} from "react";
import {Navigate} from "react-router-dom";
import SideLayout from "../../components/side-layout";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import LoginBtn from "../../components/login-btn";


function AuthBtn() {
  const store = useStore();

  const select = useSelector((state) => ({
    user: state.user.data
  }))

  const callbacks =  {
    onClick: useCallback(() => store.actions.user.logout(), [store])
  }

  return (
    <SideLayout side={"end"} padding={"long"}>
      <LoginBtn user={select.user} authAction={callbacks.onClick}/>
    </SideLayout>
  )
}

export default memo(AuthBtn)
