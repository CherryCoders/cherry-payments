
module.exports = class MercadoPagoOAuth {
    constructor (axios, client) {
        this.axios = axios
        this.client = client
    }


    async authorize (body) {
      const request = await this.axios.post('oauth/token', body)
      return request
    }
}