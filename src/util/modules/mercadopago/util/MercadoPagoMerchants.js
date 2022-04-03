
module.exports = class MercadoPagoMerchants {
    constructor (axios, client) {
        this.axios = axios
        this.client = client
    }


    async fetch (id) {
      const request = await this.axios.get('merchant_orders/' + id)
      return request
    }
}