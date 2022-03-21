import React from "react"

import styles from "./Spinner.module.css"

var store = require("store")

const Spinner = () => {
   return (
      <div className={styles.container}>
         <div className={styles.spinner}>
            <div className={styles.circle}></div>
            <div className={styles.circle}></div>
            <div className={styles.circle}></div>
         </div>
         {!store.get("tweets") ? <h2>Generating Posts...</h2> : null}
      </div>
   )
}

export default Spinner
