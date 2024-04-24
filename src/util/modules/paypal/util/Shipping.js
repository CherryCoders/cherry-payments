const AuthPaypal = require("./AuthPaypal");

module.exports = class Shipping {
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

  async trasckersBatch(data) {
    await this._authentication.token();

    const response = await this.request.post("shipping/trackers-batch ", data);
    return response;
  }
};
