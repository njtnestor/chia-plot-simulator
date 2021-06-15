import axios from 'axios'

axios.defaults.baseURL = process.env.API_URL || 'http://localhost:3000/api'

export default class HttpService {
  static async post (url, data) {
    try {
      const response = await axios.post(url, data)
      return response
    } catch (error) {
      return HttpService.processError(error)
      // throw new Error(HttpService.processError(JSON.parse(error.request.response).error));
    }
  }

  static async get (url, params) {
    try {
      const response = await axios.get(url, {
        params
      })
      return response
    } catch (error) {
      return HttpService.processError(error)
    }
  }

  static setAuthHeader (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`
  }

  static processError (error) {
    if (error.response.data.error && error.response.data.error.reason) {
      throw new Error(error.response.data.error.reason)
    }
    throw new Error('Generic Error')
  }

  static customRequest (data) {
    return axios(data)
  }
}
