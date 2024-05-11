module.exports = class MercadoPagoRferences {
  constructor(axios, client) {
    this.axios = axios;
    this.client = client;
  }

  async create(data, xIdempotencyKey = false) {
    //X-Idempotency-Key

    if (xIdempotencyKey)
      this.axios.defaults.headers["X-Idempotency-Key"] = xIdempotencyKey;

    const request = await this.axios.post("/v1/payments", data);
    return request;
  }
  async fetch(id) {
    const request = await this.axios.get("/v1/payments/" + id);
    return request;
  }
};
