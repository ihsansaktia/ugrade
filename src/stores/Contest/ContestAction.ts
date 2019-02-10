import { Contest, Announcement } from "./ContestState"

export enum ContestActionType {
    SetContests = "CONTEST_SET_CONTESTS",
    SetCurrentContest = "CONTEST_SET_CURRENT_CONTEST",
    SetCurrentContestAnnouncements = "CONTEST_SET_CURRENT_CONTEST_ANNOUNCEMENTS",
    ReadAnnouncements = "CONTEST_READ_ANNOUNCEMENTS",
}

export interface ContestActionSetContests {
    type: ContestActionType.SetContests
    contests: Contest[]
}

export interface ContestActionSetCurrentContest {
    type: ContestActionType.SetCurrentContest
    contest: Contest
}

export interface ContestActionSetCurrentContestAnnouncements {
    type: ContestActionType.SetCurrentContestAnnouncements
    contestId: number
    announcements: Announcement[]
}

export interface ContestActionReadAnnouncements {
    type: ContestActionType.ReadAnnouncements
    announcements: number[]
}

export type ContestAction = ContestActionSetContests | 
    ContestActionSetCurrentContest |
    ContestActionSetCurrentContestAnnouncements |
    ContestActionReadAnnouncements

export const setContests = (contests: Contest[]): ContestActionSetContests => ({
    type: ContestActionType.SetContests,
    contests
})

export const setCurrentContest = (contest: Contest): ContestActionSetCurrentContest => ({
    type: ContestActionType.SetCurrentContest,
    contest
})

export const setCurrentContestAnnouncements = (contest: number | Contest, announcements: Announcement[]): ContestActionSetCurrentContestAnnouncements => ({
    type: ContestActionType.SetCurrentContestAnnouncements,
    contestId: typeof contest === "number" ? contest : contest.id,
    announcements
})

export const readAnnouncements = (announcements: number[]): ContestActionReadAnnouncements => ({
    type: ContestActionType.ReadAnnouncements,
    announcements
})