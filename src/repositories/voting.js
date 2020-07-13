import DateUtils from '../lib/dateUtils';
var { restaurants } = require('./restaurants');
var { employees } = require('./employees');
const config = require('./configs');

let _instance = Symbol();
let _singletonEnforcer = Symbol();

class Votes {
    constructor (id, restaurant) {
        this.id = id;
        this.restaurant = restaurant;
        this.count = 0;
    }
    addVote() {
        this.count += 1;
    }
}

class Voting {
    constructor () {
        this.id = votings.length +1;
        this.closingTime = config.votingClosingTime;
        this.votingClosed = false;
        this.electeds = [];
        this.$_setDate();
        this.voteList = [];
        this.$_includeAllRestaurants();
        votings.push(this);
    }
    $_setDate() {
        let date = new Date();
        let endDate = new Date();
        let hour = this.closingTime.substring(0, 2);
        let minutes = this.closingTime.substring(3, 5);
        endDate.setTime(hour, minutes);
        if (date > endDate) {
            date.setDate(date.getDate() +1)
        }
        this.date = DateUtils.formatDateBr(date);
    }
    $_unlockEmployees () {
        employees.forEach(el => el.locked = false);
    }

    $_unlockRestaurants() {
        // Libera os restaurantes para votação se não houver nenhum disponível para próxima eleição ou se for sábado
        if (this.voteList.length = 1 || new Date().getDay() === 7) {
            restaurants.forEach(el => el.locked = false);
        }
    }

    $_lockedRestaurantWinner() {
        this.voteList.sort((a, b) => {return b.count - a.count}); // ordena por número de votos
        this.voteList[0].restaurant.setElect(); // O primeiro da lista é o que possui mais votos e será o eleito
        this.electeds.push(this.voteList[0].restaurant)
    }
    endVoting () {
        this.votingClosed = true;
        this.$_unlockEmployees();
        this.$_lockedRestaurantWinner();
    }

    registerVote(employer, restaurant_id) {
        if (employer && employer.locked) {
            throw new Error('Erro ao registrar voto! Funcionario já participou desta votação')
        };

        let votes = this.voteList.find(el => el.restaurant.id === restaurant_id);
        if (!votes) {
            throw new Error('Restaurante não liberado para votação')
        };
        votes.addVote();
        employer.locked = true;
    }

    $_includeRestaurantToVote(restaurant) {
        let votes = new Votes(this.voteList.length +1, restaurant);
        this.voteList.push(votes);
        return votes;
    }

    $_includeAllRestaurants() {
        restaurants.forEach(el => {
            if (!el.locked) {
                this.$_includeRestaurantToVote(el)
            }
        });
    }
}

// Classe seguinto o Pattern Singleton
class Votings {
    constructor(enforce) {
        if (enforce !== _singletonEnforcer) {
          throw('Não utilize o constructor desta classe, ao invés disto utilize o getInstance.');
        }
        this.list = [];
    }
    currentVoting() {
        let date = new Date().toLocaleDateString();
        let voting = this.list.find(el => el.date === date);
        if (!voting && restaurants.length > 1) {
            voting = new Voting();
        };
        return voting;
    }

    push (voting) {
        this.list.push(voting)
    }

    find(voting_id) {
        return this.list.find(el => el.id === voting_id)
    }

    get length() {
        return this.list.length
    }
    deleteAll() {
        // Implementado para critério de testes simulando a limpeza da base de homologação
        this.list = [];
    }
    static get getInstance() {
        if(!this[_instance]) {
          this[_instance] = new Votings(_singletonEnforcer);
        }
        return this[_instance];
    }
}

var votings = Votings.getInstance;

module.exports = { votings, Voting }