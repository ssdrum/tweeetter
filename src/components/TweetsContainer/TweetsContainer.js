import React from "react"
import Tweet from "../Tweet/Tweet"
import { useTransition, animated, config } from "react-spring"
import PropTypes from "prop-types"

const TweetsContainer = ({ tweets }) => {
  const TweetsTransition = useTransition(tweets, tweet => tweet.id, {
    trail: 100,
    config: config.wobbly,
    from: { opacity: 0, transform: "translateX(-50px)" },
    enter: { opacity: 1, transform: "translateX(0px)" },
  })

  const AnimatedTweet = animated(Tweet)

  return (
    <div className="tweetsContainer">
      {TweetsTransition.map(({ item, props, key }) => (
        <AnimatedTweet data={item} style={props} key={key} />
      ))}
    </div>
  )
}

TweetsContainer.propTypes = {
  tweets: PropTypes.array.isRequired,
}

export default TweetsContainer
