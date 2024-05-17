const PaymentsPaypal = require("./util/PaymentPaypal");
const Payouts = require("./util/PayoutsPaypal");
const Shipping = require("./util/Shipping");
const { WebhooksPayPal } = require("./util/WebhooksPaypal");

module.exports = class Paypal {
  constructor(client) {
    this.client = client;

    this.payouts = {};
  }

  init(request) {
    this.payouts = new Payouts(request, this.client);
    this.shipping = new Shipping(request, this.client);
    this.payments = new PaymentsPaypal(request, this.client);
    this.webhooks = new WebhooksPayPal(request, this.client);
    return this;
  }
};
