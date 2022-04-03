
const MercadoPagoPreferences= require('./util/MercadoPagoPreferences.js')
const MercadoPagoUsers = require('./util/MercadoPagoUsers')
const MercadoPagoPayments = require('./util/MercadoPagoPayments')
const MercadoPagoMerchants = require('./util/MercadoPagoMerchants')
const MercadoPagoOAuth = require('./util/MercadoPagoOAuth')

module.exports = class MercadoPago {
    constructor (client) {
        this.client = client
        this.axios = {}

        this.preferences = {}
        this.payments = {}
        this.oauth = {}
    }

    init (axios) {
        this.preferences = new MercadoPagoPreferences (axios, this.client)
        this.users = new MercadoPagoUsers(axios, this.client)
        this.payments = new MercadoPagoPayments(axios, this.client)
        this.merchants = new MercadoPagoMerchants(axios, this.client)
        this.oauth = new MercadoPagoOAuth(axios, this.client)
        
        return this
    }
}