import {memo, useCallback, useEffect} from "react";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import useTranslate from "../../hooks/use-translate";
import LoginForm from "../../components/login-form";
import AuthBtn from "../../containers/auth-btn";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";

function Login() {
  const store = useStore()

  useEffect(() => {
    store.actions.user.resetError()
  }, [])

  const select = useSelector((state) => ({
    error: state.user.error
  }))

  const callbacks = {
    // Авторизация
    onSubmit: useCallback((login, password) => store.actions.user.login(login, password), [store]),
  };

  const {t} = useTranslate();

  return (
    <PageLayout head={<AuthBtn />}>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <LoginForm onSubmit={callbacks.onSubmit} error={select.error !== null ? select.error.data.issues[0].message : ""}/>
    </PageLayout>
  )
}

1

export default memo(Login)
