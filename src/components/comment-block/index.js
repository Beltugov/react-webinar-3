import {memo, useRef} from "react";
import Comment from "../comment";
import "./style.css"
import {cn as bem} from "@bem-react/classname";
import CommentAnswer from "../comment-answer";

function commentBlock(props) {
  const cn = bem('CommentBlock');

  const renderTree = (node, count) => {
    return (
      <div className={cn('comment')}>
        <Comment comment={node[0]} selectAnswer={props.selectAnswer}/>
        <div className={count < 15 ? cn('children') : ""}>
          {node.map((elem) => elem.children.length !== 0 && renderTree(elem.children, count + 1))}
          {node[0]._id === props.commentId &&
            <CommentAnswer isAnswer={true}
                           send={props.sendComment}
                           cancelAnswer={props.cancelAnswer}
                           _id={node[0]._id}
                           isAuth={props.isAuth}
                           myRef={props.myRef}
                           token={props.token}
            />}
        </div>
      </div>
    )
  }

  return (
    <div className={cn()}>
      <h2 className={cn('title')}>Комментарии ({props.count})</h2>
      {renderTree(props.list, 1)}
      {null === props.commentId &&
        <CommentAnswer isAnswer={false}
                       send={props.sendComment}
                       cancelAnswer={props.cancelAnswer}
                       _id={props.itemId}
                       isAuth={props.isAuth}
                       myRef={props.myRef}
                       token={props.token}
        />}
    </div>
  )
}

export default memo(commentBlock)
