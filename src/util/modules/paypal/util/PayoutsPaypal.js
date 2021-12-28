module.exports = class Payouts {
  constructor(request, client) {
    this.request = request;
    this.client = client;

    this.appliactionContext = {
      application_context: {
        return_url: client.methods.paypal.redirect.accept,
        cancel_url: client.methods.paypal.redirect.cancel,
      },
    };
  }

  async create(data, preferences = false) {
    if (preferences) {
      Object.assign(this.appliactionContext.application_context, preferences);
      Object.assign(data, this.appliactionContext);
    }

    const response = await this.request.post("checkout/orders", data);
    return response;
  }

  async get(id) {
    const response = await this.request.get("checkout/orders/" + id);
    return response;
  }

  async authorize(id) {
    const response = await this.request.post(
      "checkout/orders/" + id + "/authorize"
    );
    return response;
  }

  async capture(id) {
    const response = await this.request.post(
      "checkout/orders/" + id + "/capture"
    );
    return response;
  }
};
