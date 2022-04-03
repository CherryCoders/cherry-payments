const axios = require("axios");

const {
  AUTHORIZATIONS,
  interpolate,
  BASE_URIS,
} = require("../presentation/Constants");

/**
 *  Modules de pagamento
 */
const Paypal = require("../modules/paypal/Paypal");
const AuthPaypal = require("../modules/paypal/util/AuthPaypal");
const MercadoPago = require("../modules/mercadopago/MercadoPago")

module.exports = class RequestManager {
  constructor(client, method) {
    this.client = client;
    this.method = method.toLowerCase();

    this.tokenAuth = client.methods[this.method].token;

    // Modulos de paagmento instanciados
    this._checkout = {
      paypal: {
        instance: new Paypal(client),
        accounting: new AuthPaypal(client),
      },
      mercadopago: {
        instance: new MercadoPago(client)
      }
    };
  }

  async base(auth = "Authorization") {

    if (this._checkout[this.method].accounting)
      this.client.methods[this.method].token = await this._checkout[
        this.method
      ].accounting.token();

    let scope = AUTHORIZATIONS[this.method];
    
    scope[auth] = interpolate("{{ }}", scope[auth], {
      token: this.client.methods[this.method].token,
    });

    const instances = axios.create({
      baseURL: BASE_URIS[this.method].version
        ? BASE_URIS[this.method][
            this.client.methods[this.method].sandbox
              ? !BASE_URIS[this.method]
                ? "production"
                : "sandbox"
              : "production"
          ] +
          BASE_URIS[this.method].version +
          "/"
        : BASE_URIS[this.method][
            this.client.methods[this.method].sandbox
              ? !BASE_URIS[this.method]
                ? "production"
                : "sandbox"
              : "production"
          ],
      headers: scope,
    });

    
    return await this._checkout[this.method].instance.init(instances);
  }

  _onAuthenticate() {}
};
