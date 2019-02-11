export interface Problem {
  id: number
  slug: string
  name: string
  statement: string
}

export interface Announcement {
  id: number
  title: string
  content: string
  issuedTime: Date
  read: boolean
}

export interface Contest {
  id: number
  slug: string
  name: string
  shortDescription: string
  startTime: Date
  finishTime: Date
  freezed: boolean
  registered: boolean

  description?: string
  problems?: Problem[]
  announcements?: Announcement[]
}

export interface ContestState {
  contests: Contest[]
  currentContest?: Contest
}

export const initialValue: ContestState = {
  contests: [],
}
