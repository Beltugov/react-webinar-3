import {memo} from "react";
import "./style.css"
import {cn as bem} from "@bem-react/classname";
import formatDate from "../../utils/format-date";

function Comment(props) {
  const cn = bem('Comment');
  const date = formatDate(props.comment.dateCreate)
  return (
    <div className={cn()}>
      <div className={cn('info')}>
        <div className={cn('username')}>{props.comment.author.profile.name}</div>
        <div className={cn('date')}>{date}</div>
      </div>
      <div className={cn('text')}>{props.comment.text}</div>
      <button className={cn('button')} onClick={() => props.selectAnswer(props.comment._id)}>Ответить</button>
    </div>
  )
}

export default memo(Comment)
