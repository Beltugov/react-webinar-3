import {memo, useCallback, useEffect, useRef, useState} from "react";
import {useDispatch, useSelector as reactSelector} from "react-redux";
import useStore from "../../hooks/use-store";
import {useParams} from "react-router-dom";
import useInit from "../../hooks/use-init";
import commentAction from "../../store-redux/comments/actions";
import listToTree from "../../utils/list-to-tree";
import CommentBlock from "../../components/comment-block";
import useSelector from '../../hooks/use-selector';

function CommentList() {
  const [commentId, setCommentId] = useState(null)
  const store = useStore();
  const params = useParams();
  const dispatch = useDispatch();
  const myRef = useRef(null)

  useInit(() => {
    dispatch(commentAction.load(params.id))
  }, [params.id]);

  const select = reactSelector(
    state => ({
      comments: state.comments.data,
      waiting: state.comments.waiting,
    }))

  const hookSelect = useSelector(state => ({
    session: state.session.token
  }))

  let tree = null

  if (select.comments.items !== undefined) {
    tree = listToTree(select.comments.items)[0]
  }

  const callbacks = {
    // Выбираем комментарий для ответа
    selectAnswer: useCallback((_id) => setCommentId(_id), [store]),
    // Отмена выбора комментария для ответа
    cancelAnswer: useCallback(() => setCommentId(null), [store]),
    // Отправка комментария
    sendComment: useCallback((_id, text, _type, token) => {
      if (text.trim() !== "") dispatch(commentAction.send(_id, text, _type, token))
    }, [store]),
  };

  useEffect(() => {
    if (myRef.current !== null) myRef.current.scrollIntoView({behavior: "smooth"})
  }, [commentId])

  return (
    <>
      {tree !== null &&
        <CommentBlock list={tree.children}
                      count={select.comments.count}
                      commentId={commentId}
                      selectAnswer={callbacks.selectAnswer}
                      cancelAnswer={callbacks.cancelAnswer}
                      sendComment={callbacks.sendComment}
                      itemId={params.id}
                      isAuth={hookSelect.session !== null}
                      myRef={myRef}
                      token={hookSelect.session}
        />}
    </>
  )
}

export default memo(CommentList)
