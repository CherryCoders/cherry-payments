module.exports.MODULES = ["paypal"];

module.exports.BASE_URIS = {
  paypal: {
    production: "https://api-m.paypal.com/",
    sandbox: "https://api-m.sandbox.paypal.com/",
    version: "v2",
  },
  mercadopago: {
    production: "https://api.mercadopago.com/",
    sandbox: "https://api.mercadopago.com/",
    version: false,
  }
};

module.exports.AUTHORIZATIONS = {
  paypal: {
    "Content-Type": "application/json",
    Authorization: "Bearer {{token}}",
  },
  mercadopago: {
    "Content-Type": "application/json",
    Authorization: "Bearer {{token}}"
  },
};

module.exports.interpolate = function (key = "{{ }}", context, scope) {
  return context.replace(
    new RegExp(key.split(" ")[0] + "\\w+" + key.split(" ")[1], "g"),
    (ctx) =>
      scope[
        ctx.replace(key.split(" ")[0], "").replace(key.split(" ")[1], "")
      ] || ctx
  );
};

module.exports.btoa = function (char) {
  return Buffer.from(String(char)).toString("base64");
};
