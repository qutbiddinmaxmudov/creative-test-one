import axios from "axios"
import { MemberInterface } from "../types"


export const flatsApi = {
  async fetchFlats(): Promise<MemberInterface[]>{
    const { data } = await axios.get('https://611758a730022f0017a05dda.mockapi.io/memory-game/members?sortBy=time')
    return data
  }
}