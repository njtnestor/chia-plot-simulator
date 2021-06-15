import CpuService from '@/services/api/CpuService'
const cpuService = new CpuService()
export const state = () => ({

})

export const mutations = {

}

export const actions = {
  async getAllCpus ({},brand) {
    const response = await cpuService.getAllCpus(brand)
    return response
  }
}
