import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import VerticalTabs from '../components/vertical-tabs';
 
const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <VerticalTabs />
  </Layout>
)

export default IndexPage
