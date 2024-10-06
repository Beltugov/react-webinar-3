import {memo} from "react";
import {cn as bem} from "@bem-react/classname";
import "./style.css"

function ProfileInfo ({user, profile, title}) {
  const cn = bem('ProfileInfo');
  return (
    <div className={cn()}>
      <h2 className={cn('title')}>{title}</h2>
      <div className={cn('description')}>
        <div className={cn('prop')}>
          <div className={cn('label')}>Имя: </div>
          <div className={cn('value')}>{profile.name}</div>
        </div>
        <div className={cn('prop')}>
          <div className={cn('label')}>Телефон: </div>
          <div className={cn('value')}>{profile.phone}</div>
        </div>
        <div className={cn('prop')}>
          <div className={cn('label')}>email: </div>
          <div className={cn('value')}>{user.email}</div>
        </div>
      </div>
    </div>
  )
}

export default memo(ProfileInfo)
