import React, { useState, useContext, useEffect } from "react"
import uuid from "react-uuid"

import TweeetterContext from "../../context/tweeetter/tweeetterContext"

const NewTweet = () => {
   const { postTweet, isLoading } = useContext(TweeetterContext)
   const [input, setInput] = useState("")
   const [isButtonDisabled, setIsButtonDisabled] = useState(true)

   const handleChange = (e) => {
      setInput(e.target.value)
   }

   // Disallows button if tweet is empty
   useEffect(() => {
      if (input.trim() === "" || isLoading) setIsButtonDisabled(true)
      else setIsButtonDisabled(false)
   }, [input, isLoading])

   const handleSubmit = (e) => {
      e.preventDefault()

      const newTweet = {
         id: uuid(),
         user: "Demo-User",
         pic:
            "https://abs.twimg.com/sticky/default_profile_images/default_profile_reasonably_small.png",
         body: input,
         likes: 0,
         isLiked: false,
         comments: [],
         date: Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "2-digit",
            hour: "numeric",
            minute: "numeric",
         }).format(new Date()),
      }

      setInput("")
      postTweet(newTweet)
   }

   return (
      <form onSubmit={handleSubmit}>
         <textarea
            type="text"
            maxLength="140"
            placeholder="What's happening?"
            value={input}
            onChange={handleChange}
            required
         />
         <button type="submit" disabled={isButtonDisabled}>
            Tweet
         </button>
      </form>
   )
}
export default NewTweet
