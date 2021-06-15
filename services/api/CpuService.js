import HttpService from '@/services/api/HttpService'

export default class CpuService {
  async getAllCpus (brand) {
    const response = await HttpService.get(`/cpus?brand=${brand}`)
    return response.data
  }
}
