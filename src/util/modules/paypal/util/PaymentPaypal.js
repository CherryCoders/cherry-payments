const AuthPaypal = require("./AuthPaypal");
const { BASE_URIS } = require("../../../presentation/Constants");

module.exports = class PaymentsPaypal {
  constructor(request, client) {
    this.request = request;
    this.client = client;

    this._authentication = new AuthPaypal(client);

    this.appliactionContext = {
      application_context: {
        return_url: client.methods.paypal.redirect.accept,
        cancel_url: client.methods.paypal.redirect.cancel,
      },
    };
  }

  async create(data) {
    await this._authentication.token();

    this.request.defaults.baseURL = `${
      this.client.methods.paypal.sandbox
        ? BASE_URIS.paypal.sandbox
        : BASE_URIS.paypal.production
    }v1/`;
    const response = await this.request.post("payments/payment", data);

    this.request.defaults.baseURL = `${
      this.client.methods.paypal.sandbox
        ? BASE_URIS.paypal.sandbox
        : BASE_URIS.paypal.production
    }v2/`;
    return response;
  }
};
