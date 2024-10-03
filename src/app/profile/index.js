import {memo, useEffect} from "react";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import useTranslate from "../../hooks/use-translate";
import AuthBtn from "../../containers/auth-btn";
import ProfileInfo from "../../components/profile-info";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";

function Profile() {
  const store = useStore()
  const {t} = useTranslate()

  const select = useSelector((state) => ({
    user: state.user.data
  }))

  useEffect(() => {
    store.actions.user.check()
  }, [store])

  return (
    <PageLayout head={<AuthBtn/>}>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <ProfileInfo title={"Профиль"} user={select.user}/>
    </PageLayout>
  )
}

export default memo(Profile)
