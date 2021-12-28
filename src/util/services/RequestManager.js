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

module.exports = class RequestManager {
  constructor(client, method) {
    this.client = client;
    this.method = method.toLowerCase();

    // Modulos de paagmento instanciados
    this._checkout = {
      paypal: new Paypal(client),
    };
  }

  base(auth = "Authorization") {
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
    return this._checkout[this.method].init(instances);
  }
  fetch() {}
};
