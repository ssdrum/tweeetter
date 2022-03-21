import React, { useState, useContext } from "react"
import { Link } from "react-router-dom"
import CommentsContainer from "../CommentsContainer/CommentsContainer"
import AddComment from "../AddComment/AddComment"
import Likes from "../Likes/Likes"
import Comments from "../Comments/Comments"

import styles from "./TweetPage.module.css"
import TweeetterContext from "../../context/tweeetter/tweeetterContext"

const TweetPage = ({ match }) => {
   const { tweets, likeTweet } = useContext(TweeetterContext)
   const [showModal, setShowModal] = useState(false)
   const tweet = tweets.filter((tweet) => tweet.id === match.params.id)[0]

   const { user, pic, body, likes, comments, isLiked, id, date } = tweet

   // Opens and closes modal
   const handleClick = (e) => {
      if (
         e.target.className === "fas fa-times fa-lg" ||
         e.target.className === "modal-container" ||
         e.target.className === "far fa-comment fa-lg"
      ) {
         setShowModal(!showModal)
      }
   }

   const closeModal = () => {
      setShowModal(false)
   }

   const handleLike = (e) => {
      likeTweet(tweet.id)
   }

   return (
      <>
         <div className={styles.nav}>
            <Link to={"/"}>
               <div className={styles.iconContainer}>
                  <i className="fas fa-arrow-left fa-lg"></i>
               </div>
            </Link>
            <h1>Tweet</h1>
         </div>

         <div className={styles.container}>
            <div className={styles.header}>
               <img src={pic} alt="profile-pic" />
               <h4 className={styles.username}>{user}</h4>
               <small>{date}</small>
            </div>

            <div className={styles.post}>
               <p className={styles.tweetText}>{body}</p>
            </div>

            <div className={styles.stats}>
               <Likes
                  likes={likes}
                  isLiked={isLiked}
                  id={id}
                  handleLike={handleLike}
               />
               <Comments handleClick={handleClick} comments={comments} />
            </div>
            {comments.length > 0 ? (
               <CommentsContainer comments={comments} />
            ) : null}
         </div>

         {showModal ? (
            <AddComment
               handleClick={handleClick}
               closeModal={closeModal}
               id={id}
               user={user}
               body={body}
            />
         ) : null}
      </>
   )
}

export default TweetPage
