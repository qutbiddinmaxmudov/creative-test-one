import axios from 'axios'
import { MemberInterface } from '../types'

export const gameApi = {
  async fetchRecords(): Promise<MemberInterface[]> {
    const { data } = await axios.get(`https://${process.env.REACT_APP_MOCKAPI_ID}.mockapi.io/memory-game/members?sortBy=time`)
    return data
  },
  async addNewRecord(record: MemberInterface): Promise<MemberInterface[]> {
    const { data } = await axios.post(`https://${process.env.REACT_APP_MOCKAPI_ID}.mockapi.io/memory-game/members`, record)
    return data
  },
}
