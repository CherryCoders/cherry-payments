const { MODULES } = require("./util/presentation/Constants");
const RequestManager = require("./util/services/RequestManager");

module.exports = class Client {
  constructor(config = {}) {
    this.methods = config?.methods || false;
    this._avaliateRequireds();
  }

  add(method) {
    const manager = new RequestManager(this, method.toLowerCase());
    return manager.base();
  }

  _avaliateRequireds() {
    if (!this.methods)
      return new Error(
        "Informe metodo de pagamento para configurar sua autenticação"
      );
  }
};
