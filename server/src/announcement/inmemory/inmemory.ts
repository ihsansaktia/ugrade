import lodash from 'lodash'
import { AuthService, ForbiddenAction, Permission } from 'ugrade/auth'
import { genUUID } from 'ugrade/uuid'
import { Announcement } from '../announcement'
import { NoSuchAnnouncement } from '../NoSuchAnnouncement'
import { AnnouncementService } from '../service'
import { announcementServiceValidator as validator } from '../validations'
import { announcements as announcementsFixture } from './fixture'

export class InMemoryAnnouncementService implements AnnouncementService {
  private authService: AuthService
  private announcements: Announcement[]
  private contestAnnouncements: { [contestId: string]: Announcement[] }
  private idAnnouncements: { [id: string]: Announcement }
  private announcementRead: { [key: string]: boolean }

  constructor(authService: AuthService, announcements: Announcement[] = announcementsFixture) {
    this.authService = authService
    const fixture = lodash.cloneDeep(announcements)
    this.announcements = fixture
    this.idAnnouncements = {}
    this.contestAnnouncements = {}
    this.announcementRead = {}
    for (const ann of this.announcements) {
      this.idAnnouncements[ann.id] = ann
      if (!this.contestAnnouncements[ann.contestId]) {
        this.contestAnnouncements[ann.contestId] = []
      }
      this.contestAnnouncements[ann.contestId].push(ann)
    }
  }

  async getContestAnnouncements(token: string, contestId: string): Promise<Announcement[]> {
    await validator.getContestAnnouncements(token, contestId)

    // check permission
    const me = await this.authService.getMe(token)
    if (!me.permissions.includes(Permission.AnnouncementRead)) {
      throw new ForbiddenAction()
    }
    if (me.contestId !== contestId) throw new ForbiddenAction()

    if (!this.contestAnnouncements[me.contestId]) {
      this.contestAnnouncements[me.contestId] = []
    }
    return lodash.cloneDeep(this.contestAnnouncements[me.contestId].map(this.readWrapper(me.id)))
  }

  async createAnnouncement(token: string, title: string, content: string): Promise<Announcement> {
    await validator.createAnnouncement(token, title, content)

    const me = await this.authService.getMe(token)
    if (!me.permissions.includes(Permission.AnnouncementCreate)) {
      throw new ForbiddenAction()
    }

    const newAnnouncement: Announcement = {
      id: genUUID(),
      contestId: me.contestId,
      title,
      content,
      issuedTime: new Date(),
      issuerId: me.id,
      read: true,
    }

    this.announcements.push(newAnnouncement)
    if (!this.contestAnnouncements[me.contestId]) {
      this.contestAnnouncements[me.contestId] = []
    }
    this.contestAnnouncements[me.contestId].push(newAnnouncement)
    this.idAnnouncements[newAnnouncement.id] = newAnnouncement
    this.announcementRead[`${newAnnouncement.id}:${me.id}`] = true

    return lodash.cloneDeep(newAnnouncement)
  }

  async readAnnouncement(token: string, announcementId: string): Promise<Announcement> {
    await validator.readAnnouncement(token, announcementId)

    // check permission
    const me = await this.authService.getMe(token)
    if (!me.permissions.includes(Permission.AnnouncementRead)) {
      throw new ForbiddenAction()
    }

    // check announcement
    if (!this.idAnnouncements[announcementId]) throw new NoSuchAnnouncement()
    const announcement = this.idAnnouncements[announcementId]
    if (announcement.contestId !== me.contestId) throw new NoSuchAnnouncement()

    // update read
    this.announcementRead[`${announcement.id}:${me.id}`] = true

    return lodash.cloneDeep({ ...announcement, read: true })
  }

  private readWrapper(userId: string): (announcement: Announcement) => Announcement {
    return announcement => ({
      ...announcement,
      read: !!this.announcementRead[`${announcement.id}:${userId}`],
    })
  }
}
