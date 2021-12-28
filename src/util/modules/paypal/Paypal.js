const Payouts = require("./util/PayoutsPaypal");

module.exports = class Paypal {
  constructor(client) {
    this.client = client;

    this.payouts = {};
  }

  init(request) {
    this.payouts = new Payouts(request, this.client);
    return this;
  }
};
