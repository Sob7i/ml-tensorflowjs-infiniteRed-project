import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
// import Image from "../components/image"
import SEO from "../components/seo"
import Modelnsfwjs from '../components/nsfwjs-model/nsfwjs';

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Modelnsfwjs />
    {/* <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div> */}
    <Link to="/page-2/">Go to page 2</Link> <br />
  </Layout>
)

export default IndexPage
