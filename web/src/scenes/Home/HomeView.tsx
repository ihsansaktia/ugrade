import { Button, Intent } from '@blueprintjs/core'
import React, { FunctionComponent } from 'react'
import logo from 'ugrade/assets/images/logo.svg'
import BottomLink from 'ugrade/components/BottomLink'

import './styles.css'

export interface HomeViewProps {
  onLogoClick: () => any
  onSettingClick: () => any
  onEnterContest: () => any
  onCreateContest: () => any
}

export const HomeView: FunctionComponent<HomeViewProps> = ({
  onLogoClick,
  onSettingClick,
  onEnterContest,
  onCreateContest,
}) => (
  <div className='plain-page'>
    <div className='home-panel'>
      <a onClick={onLogoClick}>
        <img src={logo} width={100} alt='logo' />
      </a>
      <h1>Welcome To UGrade</h1>
      <h4>
        There is no one who loves pain itself, who seeks after it and wants to
        have it, simply because it is pain...
      </h4>
      <div className='home-actions'>
        <Button
          fill={true}
          large={true}
          className='item'
          onClick={onCreateContest}
        >
          Create Contest
        </Button>
        <Button
          fill={true}
          large={true}
          className='item'
          intent={Intent.PRIMARY}
          onClick={onEnterContest}
        >
          Enter Contest
        </Button>
      </div>
    </div>
    <BottomLink>
      <a onClick={onSettingClick}>Settings</a>
    </BottomLink>
  </div>
)
