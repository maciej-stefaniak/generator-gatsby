import React from "react"
import { StaticQuery, graphql } from "gatsby"

import { Layout, SEO, Footer } from './../components'

const IndexPage = ({ data }) => (
  <Layout>
    <StaticQuery
      query={q}
      render={data => (
        <SEO title={data.site.siteMetadata.title} description={data.site.siteMetadata.description} keywords={data.site.siteMetadata.keywords} lang={data.site.siteMetadata.lang} />
      )}
    />
    <div className='centered splash'>
      <h1>Success!</h1>
      <p><a href='https://www.gatsbyjs.org'>Gatby's</a> ready and waiting for you.</p>
      <p>Let's develop something cool! </p>
    </div>
    <Footer />
    <div id="portal"></div>
  </Layout>
)

export default IndexPage

const q = graphql`
query {
  site {
    siteMetadata {
      title
      description
      keywords
      lang
    }
  }
}
`