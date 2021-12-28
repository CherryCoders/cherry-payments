const axios = require("axios");
const { btoa, BASE_URIS } = require("../../../presentation/Constants");
const FormData = require("form-data");

module.exports = class AuthPaypal {
  constructor(client) {
    this.client = client;
    this.axios = axios;

    this.tokenCache = new Map();
    this.isCooldown = false;
  }

  async token() {
    const accounting = this.client.methods.paypal.account;
    if (!accounting.clientId || !accounting.secret)
      return new Error(
        "Informe os dados da aplicação para pegar as credenciais"
      );

    const form = new FormData();
    form.append("grant_type", "client_credentials");

    if (this.isCooldown) return this._createdRequest({}, accounting);
    const response = await this.axios({
      url:
        BASE_URIS.paypal[
          this.client.methods.paypal.sandbox
            ? !BASE_URIS.paypal
              ? "production"
              : "sandbox"
            : "production"
        ] + "v1/oauth2/token",
      method: "post",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      auth: {
        username: accounting.clientId,
        password: accounting.secret,
      },
      params: {
        grant_type: "client_credentials",
      },
    });

    this.client.token = response.data.access_token;

    return this._createdRequest(response.data, accounting);
  }

  _createdRequest(data = {}, accounting) {
    const base64 = btoa(accounting.clientId + ":" + accounting.secret);
    if (
      !this.tokenCache.get(btoa(accounting.clientId + ":" + accounting.secret))
    ) {
      this.tokenCache.set(base64, { data, timestamp: new Date().getTime() });
      this.isCooldown = true;
      return data.access_token;
    } else {
      const cache = this.tokenCache.get(base64);
      const seconds = Number(
        ((new Date().getTime() - cache.timestamp) / 1000).toFixed(0)
      );

      if (seconds >= Number(cache.data.expires_in)) {
        this.tokenCache.delete(base64);
        this.isCooldown = false;
        this.token();
      }
    }
  }
};
