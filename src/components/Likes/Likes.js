import React from "react"
import PropTypes from "prop-types"

import styles from "./Likes.module.css"

const Likes = ({ likes, isLiked, handleLike }) => {
   return (
      <div
         className={styles.likes}
         style={isLiked ? { color: "#E0245E" } : null}
      >
         <div className={styles.iconContainer}>
            <i
               className={isLiked ? "fas fa-heart fa-lg" : "far fa-heart fa-lg"}
               onClick={handleLike}
            />
         </div>
         <h4 className={styles.amount}>{likes}</h4>
      </div>
   )
}

Likes.propTypes = {
   likes: PropTypes.number.isRequired,
   isLiked: PropTypes.bool.isRequired,
   handleLike: PropTypes.func.isRequired,
}

export default Likes
