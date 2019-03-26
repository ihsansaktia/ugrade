import {
  Alignment,
  Breadcrumbs,
  Button,
  Classes,
  IBreadcrumbProps,
  Menu,
  MenuItem,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
  Popover,
  Position,
} from '@blueprintjs/core'
import classNames from 'classnames'
import { useObserver } from 'mobx-react-lite'
import React, { FunctionComponent, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth, useContest, useProblem, useRouting } from '../../../app'
import { showSuccessToast, useContestOnly } from '../../../common'
import { getBreadcrumb } from './breadcrumb'

export type TopNavigationBarBreadcrumb = IBreadcrumbProps

export const TopNavigationBar: FunctionComponent = () => {
  useContestOnly()
  const authStore = useAuth()
  const user = authStore.me
  const contestStore = useContest()
  const problemStore = useProblem()
  const routingStore = useRouting()
  const breadcrumbs = getBreadcrumb(routingStore.location, contestStore.current, problemStore.problems)

  useEffect(() => {
    authStore.loadMe()
  }, [])

  const breadcrumbWithRouter = breadcrumbs.map(breadcrumbItem => ({
    ...breadcrumbItem,
    onClick: () => {
      if (breadcrumbItem.href) routingStore.push(breadcrumbItem.href)
    },
    href: undefined,
  }))

  const handleSignOut = async () => {
    authStore.signOut()
    showSuccessToast('Signed Out')
  }

  return useObserver(() => (
    <Navbar>
      <NavbarGroup align={Alignment.LEFT}>
        <Link to='/contest'>
          <NavbarHeading>UGrade</NavbarHeading>
        </Link>
        <NavbarDivider />
        <Breadcrumbs items={breadcrumbWithRouter} />
      </NavbarGroup>
      <NavbarGroup align={Alignment.RIGHT}>
        <Popover
          disabled={!user}
          content={
            <Menu>
              <MenuItem onClick={handleSignOut} text='Sign Out' />
            </Menu>
          }
          position={Position.BOTTOM}
        >
          <Button
            icon='caret-down'
            large={true}
            rightIcon='user'
            className={classNames(Classes.MINIMAL, {
              [Classes.SKELETON]: !user,
            })}
            text={(user && user.name) || 'Test'}
          />
        </Popover>
      </NavbarGroup>
    </Navbar>
  ))
}