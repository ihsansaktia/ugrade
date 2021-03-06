import React, { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import logo from 'ugrade/assets/images/logo.svg'
import BottomLink from 'ugrade/components/BottomLink'
import { CreateContestForm } from './CreateContestForm'

export const CreateContestView: FunctionComponent = () => (
  <div className='plain-page'>
    <div>
      <Link to='/'>
        <img src={logo} width={100} alt='logo' />
      </Link>
      <h1>Welcome To UGrade</h1>
      <CreateContestForm />
    </div>
    <BottomLink>
      <Link to='/enter-contest'>Enter Contest</Link>
      <Link to='/setting'>Setting</Link>
    </BottomLink>
  </div>
)
