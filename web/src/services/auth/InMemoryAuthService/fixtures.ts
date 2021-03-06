import {
  ContestArkav4Final,
  ContestArkav4Qual,
  ContestArkav5Final,
  ContestArkav5Qual,
} from 'ugrade/services/contest/InMemoryContestService/fixtures'
import { User } from '../User'
import { adminPermissions, contestantPermissions } from '../UserPermission'

export const UserTest1: User = {
  id: '1',
  contestId: ContestArkav4Qual.id,
  username: 'test',
  email: 'test@example.com',
  name: 'Test',
  permissions: contestantPermissions,
}

export const UserNewTest1: User = {
  id: '2',
  contestId: ContestArkav4Qual.id,
  username: '',
  email: 'newtest@example.com',
  name: 'New Test',
  permissions: contestantPermissions,
}

export const UserTest2: User = {
  id: '3',
  contestId: ContestArkav4Final.id,
  username: 'test',
  email: 'test@example.com',
  name: 'Test',
  permissions: contestantPermissions,
}

export const UserNewTest2: User = {
  id: '4',
  contestId: ContestArkav4Final.id,
  username: '',
  email: 'newtest@example.com',
  name: 'New Test',
  permissions: contestantPermissions,
}

export const UserAdmin3: User = {
  id: 'admin3',
  contestId: ContestArkav5Qual.id,
  username: 'admin',
  email: 'admin@example.com',
  name: 'Administrator',
  permissions: adminPermissions.slice(),
}

export const UserTest3: User = {
  id: '5',
  contestId: ContestArkav5Qual.id,
  username: 'test',
  email: 'test@example.com',
  name: 'Test',
  permissions: contestantPermissions,
}

export const UserNewTest3: User = {
  id: '6',
  contestId: ContestArkav5Qual.id,
  username: '',
  email: 'newtest@example.com',
  name: 'New Test',
  permissions: contestantPermissions,
}

export const UserTest4: User = {
  id: '7',
  contestId: ContestArkav5Final.id,
  username: 'test',
  email: 'test@example.com',
  name: 'Test',
  permissions: contestantPermissions,
}

export const UserNewTest4: User = {
  id: '8',
  contestId: ContestArkav5Final.id,
  username: '',
  email: 'newtest@example.com',
  name: 'New Test',
  permissions: contestantPermissions,
}

export const contestUserMap: {
  [contestId: string]: { [userId: string]: User }
} = {
  [ContestArkav4Qual.id]: {
    [UserTest1.id]: UserTest1,
    [UserNewTest1.id]: UserNewTest1,
  },
  [ContestArkav4Final.id]: {
    [UserTest2.id]: UserTest2,
    [UserNewTest2.id]: UserNewTest2,
  },
  [ContestArkav5Qual.id]: {
    [UserTest3.id]: UserTest3,
    [UserNewTest3.id]: UserNewTest3,
    [UserAdmin3.id]: UserAdmin3,
  },
  [ContestArkav5Final.id]: {
    [UserTest4.id]: UserTest4,
    [UserNewTest4.id]: UserNewTest4,
  },
}

export const userPasswordMap: { [userId: string]: string } = {
  [UserTest1.id]: 'testtest',
  [UserNewTest1.id]: 'newtesttest',
  [UserTest2.id]: 'testtest',
  [UserNewTest2.id]: 'newtesttest',
  [UserTest3.id]: 'testtest',
  [UserNewTest3.id]: 'newtesttest',
  [UserAdmin3.id]: 'admintest',
  [UserTest4.id]: 'testtest',
  [UserNewTest4.id]: 'newtesttest',
}
