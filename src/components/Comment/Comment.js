import React from "react"
import PropTypes from "prop-types"

import styles from "./Comment.module.css"

const Comment = ({ comment }) => {
   const { pic, text, user } = comment

   return (
      <div className={styles.comment}>
         <img src={pic} alt="user" />

         <div className={styles.commentContent}>
            <h4>{user}</h4>
            <p>{text}</p>
         </div>
      </div>
   )
}

Comment.propTypes = {
   comment: PropTypes.object.isRequired,
}

export default Comment
