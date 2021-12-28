const { MODULES } = require("./util/presentation/Constants");
const RequestManager = require("./util/services/RequestManager");

module.exports = class Client {
  constructor(config = {}) {
    this.methods = config?.methods || false;
    this._avaliateRequireds();
    this.typeMethod = "";
  }

  async add(method) {
    this.typeMethod = method.toLowerCase();
    const manager = new RequestManager(this, method.toLowerCase());
    return await manager.base();
  }

  _avaliateRequireds() {
    if (!this.methods)
      return new Error(
        "Informe metodo de pagamento para configurar sua autenticação"
      );
  }

  set token(token) {
    console.log(this.typeMethod);
    this.methods[this.typeMethod].token = token;
  }

  get token() {
    return this.methods[this.typeMethod].token;
  }
};
