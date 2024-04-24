const Payouts = require("./util/PayoutsPaypal");
const Shipping = require("./util/Shipping");

module.exports = class Paypal {
  constructor(client) {
    this.client = client;

    this.payouts = {};
  }

  init(request) {
    this.payouts = new Payouts(request, this.client);
    this.shipping = new Shipping(request, this.client);
    return this;
  }
};
