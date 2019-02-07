import React, { SFC } from "react"
import { Divider, Card } from "@blueprintjs/core"
import { Link } from "react-router-dom"
import { connect } from "react-redux"

import "./styles.css"

import BottomLink from "../../components/BottomLink"
import logo from "../../assets/images/logo.svg"
import SignInForm, { SignInFormProps } from "./SignInForm"

export interface SignInPageProps extends SignInFormProps {
}

const SignInPage: SFC<SignInPageProps> = props => (
    <div className="signin-page">
        <Link to="/">
            <img src={logo} width={100} alt="logo" />
        </Link>
        <h1>Welcome To UGrade</h1>
        <Divider />
        <Card className="signin-panel">
            <h2>Sign In</h2>
            <SignInForm {...props} />
        </Card>
        <BottomLink>
            <Link to="/signup">Sign Up</Link>
            <Link to="/forgot-password">Forgot Password</Link>
            <Link to="/setting">Setting</Link>
        </BottomLink>
    </div>
)

export default connect()(SignInPage)