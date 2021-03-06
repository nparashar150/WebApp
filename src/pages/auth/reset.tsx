import React from "react"
import Form from "../../components/Form/Form"
import { formConfig } from "../../data/Reset.config"
// import Layout from "../../components/layout"
import Seo from "../../components/seo"

export default function Reset() {
  return (
    <>
      <Seo title="Reset Password" />
      <div>
        <Form
          loginInGoogle={false}
          forgotPassword={false}
          createmobileview={false}
          {...formConfig}
        />
      </div>
    </>
  )
}
