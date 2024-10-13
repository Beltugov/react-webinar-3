import {memo} from "react";
import "./style.css"
import {cn as bem} from "@bem-react/classname";
import { Link, useLocation, useNavigate } from 'react-router-dom';

function CommentAnswer(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const cn = bem('CommentAnswer');

  return (
    <div className={cn()} ref={props.myRef}>
      {props.isAuth ?
        <>
          <div className={cn('title')}>{props.isAnswer ? "Новый ответ" : "Новый комментарий"}</div>
          <form id={'comment'} onSubmit={(e) => {
            e.preventDefault()
            const type = props.isAnswer ? "comment" : "article"
            props.send(props._id, e.target[0].value, type, props.token)
            e.target[0].value = ""
          }}>
            <textarea form={'comment'} className={cn('area')}></textarea>
            <div className={cn('action')}>
              <button type={'submit'} className={cn('button')}>Отправить</button>
              {props.isAnswer && <button className={cn('button')} onClick={() => props.cancelAnswer()}>Отмена</button>}
            </div>
          </form>
        </>
        :
        <div>
          <Link to={props.link || '/login'} onClick={(e) => {
          e.preventDefault()
            navigate(props.link || '/login', {state: { back: location.pathname } })
          }} >Войдите,</Link> чтобы иметь возможность {props.isAnswer ? "ответить": "комментировать"}. {props.isAnswer && <span className={cn('cancel')} onClick={() => props.cancelAnswer()}>Отмена</span>}
        </div>
      }
    </div>
  )
}

export default memo(CommentAnswer)
