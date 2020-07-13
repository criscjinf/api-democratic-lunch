let _instance = Symbol();
let _singletonEnforcer = Symbol();

class Config {
  constructor(enforce) {
    if (enforce !== _singletonEnforcer) {
      throw('Não utilize o constructor desta classe, ao invés disto utilize o getInstance.');
    }

    this.votingClosingTime = '11:00';
    this.host = 'smtp.office365.com';
    this.mail = 'democraticlunch@outlook.com';
    this.port = 587;
    this.password = 'DBServer123456';
  }

  static get getInstance() {
    if(!this[_instance]) {
      this[_instance] = new Config(_singletonEnforcer);
    }

    return this[_instance];
  }
}

var config = Config.getInstance;

module.exports = config