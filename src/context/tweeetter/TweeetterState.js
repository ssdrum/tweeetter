import React, { useReducer, useEffect } from "react"
import uuid from "react-uuid"
import TweeetterContext from "./tweeetterContext"
import TweeetterReducer from "./tweeetterReducer"

// Localstorage library
var store = require("store")

const TweeetterState = (props) => {
   const initialState = {
      tweets: [],
      isLoading: false,
   }

   const [state, dispatch] = useReducer(TweeetterReducer, initialState)

   // Update localstorage when state.tweets change
   useEffect(() => {
      if (state.tweets.length > 0) {
         store.set("tweets", state.tweets)
      }
   }, [state.tweets])

   // Fetches data to fill tweets
   const getTweets = async () => {
      setLoading()

      if (!store.get("tweets")) {
         let users = []
         let posts = []

         try {
            const request = await fetch(
               "https://jsonplaceholder.typicode.com/posts?_limit=10"
            )
            const response = await request.json()
            posts = response
         } catch (e) {
            console.log(e)
         }

         try {
            const request = await fetch(
               "https://randomuser.me/api/?exc=gender,location,email,login,registered,dob,phone,cell,nat&results=10"
            )
            const response = await request.json()
            users = response.results
         } catch (e) {
            console.log(e)
         }

         createPosts(users, posts)
      } else {
         setTimeout(() => {
            dispatch({ type: "SET_TWEETS", payload: store.get("tweets") })
         }, 1500)
      }
   }

   // Generates comments
   const generateComments = async () => {
      const amount = Number((Math.random() * 8).toFixed())

      let text = []
      let users = []
      let comments = []

      try {
         const request = await fetch(
            `https://jsonplaceholder.typicode.com/posts?_limit=${amount}`
         )
         const response = await request.json()
         text = response
      } catch (e) {
         console.log(e)
      }

      try {
         const request = await fetch(
            `https://randomuser.me/api/?exc=gender,location,email,login,registered,dob,phone,cell,nat&results=${amount}`
         )
         const response = await request.json()

         users = response.results
      } catch (e) {
         console.log(e)
      }

      for (let i = 0; i < amount; i++) {
         let comment = {}

         comment.text = text[i].body
         comment.user = `${users[i].name.first} ${users[i].name.last}`
         comment.pic = users[i].picture.medium

         comments.push(comment)
      }

      return comments
   }

   // Generates a random date between two dates
   function randomDate(start, end) {
      const date = new Date(
         start.getTime() + Math.random() * (end.getTime() - start.getTime())
      )
      return new Intl.DateTimeFormat("en-US", {
         month: "short",
         day: "2-digit",
         hour: "numeric",
         minute: "numeric",
      }).format(date)
   }

   // Creates tweets and populates feeds
   const createPosts = async (users, posts) => {
      let tweets = []
      const tweetDate = new Date()
      tweetDate.setDate(tweetDate.getDate() - 7)

      for (let i = 0; i < users.length; i++) {
         let tweet = {}

         tweet.id = uuid()
         tweet.pic = users[i].picture.medium
         tweet.user = `${users[i].name.first} ${users[i].name.last}`
         tweet.body = posts[i].body
         tweet.likes = Number((Math.random() * 30).toFixed()) // Generates random amount of likes between 0 and 30
         tweet.isLiked = false
         tweet.comments = await generateComments()
         tweet.date = randomDate(tweetDate, new Date())

         tweets.push(tweet)
      }

      dispatch({ type: "SET_TWEETS", payload: tweets })
   }

   // Post new tweet
   const postTweet = (tweet) => {
      dispatch({ type: "POST_TWEET", payload: tweet })
   }

   // Like tweet
   const likeTweet = (id) => {
      dispatch({ type: "LIKE_TWEET", payload: id })
   }

   // Add comment
   const addComment = (id, comment) => {
      dispatch({ type: "ADD_COMMENT", payload: { id, comment } })
   }

   // Set Loading
   const setLoading = () => dispatch({ type: "SET_LOADING" })

   return (
      <TweeetterContext.Provider
         value={{
            tweets: state.tweets,
            isLoading: state.isLoading,
            getTweets,
            postTweet,
            likeTweet,
            addComment,
            randomDate,
         }}
      >
         {props.children}
      </TweeetterContext.Provider>
   )
}

export default TweeetterState
