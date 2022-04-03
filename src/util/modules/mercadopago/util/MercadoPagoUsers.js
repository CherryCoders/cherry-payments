

module.exports = class MercadoPagoUsers {
    constructor (axios, client) {
        this.axios = axios
        this.client = client
    }

    async create (body) {
        const data = await this.axios.post('users/test_user?access_token=' + this.client.token, body)
        return data
    }

    async updateAmount(body) {
        const data = await this.axios.put('test_user/'+ body.id + '/account_money?access_token=' + this.client.token, {
            amount: body.amount
        })
        return data
    }
    async resetPassword(body) {
        //'test_user/'+body.id + '/password?access_token='
        const data = await this.axios.put(`test_user/${body.id}/password?access_token=${this.client.token}`, {
            amount: body.amount
        })
        return data
    }

    async list () {
        const data = await this.axios.get('test_user/search?access_token=' + this.client.token)
        return data
    }
}