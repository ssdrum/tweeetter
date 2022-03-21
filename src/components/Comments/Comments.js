import React from "react"
import PropTypes from "prop-types"

import styles from "./Comments.module.css"

const Comments = ({ handleClick, comments }) => {
   return (
      <div className={styles.comments}>
         <div className={styles.iconContainer}>
            <i className="far fa-comment fa-lg" onClick={handleClick} />
         </div>
         <h4>{comments.length}</h4>
      </div>
   )
}

Comments.propTypes = {
   handleClick: PropTypes.func.isRequired,
   comments: PropTypes.array.isRequired,
}

export default Comments
