import React, { useContext, useEffect } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import NewTweet from "../NewTweet/NewTweet"
import Spinner from "../Spinner/Spinner"
import TweetsContainer from "../TweetsContainer/TweetsContainer"
import TweetPage from "../TweetPage/TweetPage"
import NotFound from "../NotFound/NotFound"

import TweeetterContext from "../../context/tweeetter/tweeetterContext"

function App() {
   const { getTweets, isLoading, tweets } = useContext(TweeetterContext)

   useEffect(() => {
      getTweets()
   }, [])

   return (
      <Router basename="/tweeetter">
         <div className="container">
            <Switch>
               <Route
                  exact
                  path="/"
                  render={(props) => (
                     <>
                        <h1>Home</h1>
                        <NewTweet />
                        {tweets ? <TweetsContainer tweets={tweets} /> : null}
                        {isLoading ? <Spinner /> : null}
                     </>
                  )}
               />
               <Route exact path="/tweet/:id" component={TweetPage} />
               <Route path="/tweeetter" component={NotFound} />
            </Switch>
         </div>
      </Router>
   )
}

export default App
