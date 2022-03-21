import React from "react"
import uuid from "react-uuid"
import Comment from "../Comment/Comment"
import PropTypes from "prop-types"

import styles from "./CommentsContainer.module.css"

const Comments = ({ comments }) => {
   return (
      <div className={styles.commentsContainer}>
         {comments.map((comment) => {
            return <Comment key={uuid()} comment={comment} />
         })}
      </div>
   )
}

Comments.propTypes = {
   comments: PropTypes.array.isRequired,
}

export default Comments
