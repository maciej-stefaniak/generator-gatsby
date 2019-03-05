import React from "react"

import { Layout, Footer } from './../components'

const NotFoundPage = () => (
  <Layout>
    <div className="centered splash">
      <h1>Oooops...</h1>
      <p>Something went wrong. Page you're looking for doesn't exist. 404.</p>
    </div>
    <Footer />
  </Layout>
)

export default NotFoundPage
