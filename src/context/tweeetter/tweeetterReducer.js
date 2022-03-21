export default (state, action) => {
   switch (action.type) {
      case "SET_LOADING":
         return {
            ...state,
            isLoading: true,
         }
      case "SET_TWEETS":
         return {
            ...state,
            tweets: [...state.tweets, ...action.payload],
            isLoading: false,
         }
      case "POST_TWEET":
         return {
            ...state,
            tweets: [action.payload, ...state.tweets],
         }
      case "LIKE_TWEET":
         return {
            ...state,
            tweets: state.tweets.map((tweet) => {
               if (tweet.id === action.payload) {
                  if (tweet.isLiked) {
                     return { ...tweet, isLiked: false, likes: tweet.likes - 1 }
                  } else {
                     return { ...tweet, isLiked: true, likes: tweet.likes + 1 }
                  }
               } else {
                  return tweet
               }
            }),
         }
      case "ADD_COMMENT":
         return {
            ...state,
            tweets: state.tweets.map((tweet) => {
               if (tweet.id === action.payload.id) {
                  return {
                     ...tweet,
                     comments: [action.payload.comment, ...tweet.comments],
                  }
               } else {
                  return tweet
               }
            }),
         }
      default:
         return {
            ...state,
         }
   }
}
