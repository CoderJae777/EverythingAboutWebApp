// Part 1
class Character {
  #alive;
  constructor(name, hp, maxHp, attackPower) {
    this.name = name;
    this.hp = hp;
    this.maxHp = maxHp;
    this.attackPower = attackPower;
    this.#alive = this.hp > 0;
  }

  takeDamage(amount) {
    this.hp -= amount;
    if (this.hp <= 0) {
      this.hp = 0;
      this.#alive = false;
    }
  }
  isAlive() {
    return this.#alive;
  }
  heal(amount) {
    this.hp += amount;
    if (this.hp > this.maxHp) {
      this.hp = this.maxHp;
    }
  }
  getStatus() {
    return this.name + " | " + "HP:" + this.hp + "/" + this.maxHp;
  }

  //   getStatus() {
  //     return `${this.name} | HP: ${this.hp}/${this.maxHp}`;
  //   }
}

class Warrior extends Character {
  // Setting the constructor
  // passes args to Character's constructor
  rage = 0;

  constructor(name, hp, maxHp, attackPower) {
    super(name, hp, maxHp, attackPower);
  }
  attack(target) {
    target.takeDamage(this.attackPower);
    this.rage += 10;
  }

  powerAttack(target) {
    if (this.rage < 30) {
      throw new Error(`${this.name} does not have enough rage!`);
    }
    target.takeDamage(this.attackPower * 2.5);
    this.rage -= 30;
  }
}

class Mage extends Character {
  constructor(name, hp, maxHp, attackPower, mana) {
    super(name, hp, maxHp, attackPower);
    this.mana = mana;
    this.initial_mana = mana;
  }

  cast(target) {
    if (this.mana < 20) {
      throw new Error(`${this.name} does not have enough mana!`);
    }
    mana -= 20;
    target.takeDamage(this.attackPower * 2);
  }

  meditate() {
    this.mana += 15;
    if (this.mana > this.initial_mana) {
      this.mana = this.initial_mana;
    }
  }
}

// Part 2
// array of at least 5 characters
const rex = new Warrior("Rex", 100, 100, 25);
const brutus = new Warrior("Brutus", 120, 120, 20);
const lyra = new Warrior("Lyra", 90, 90, 30);
const gandalf = new Mage("Gandalf", 80, 80, 35, 150);
const vex = new Mage("Vex", 40, 70, 40, 120);
const characters = [rex, brutus, lyra, gandalf, vex];

// All characters that are still alive
const alive = characters.filter((n) => n.isAlive());
console.log(alive);
console.log("--------------");
// List of just names and current hp as objects
const names_hp = characters.map((n) => ({ name: n.name, hp: n.hp }));
console.log(names_hp);
console.log("--------------");
// Total hp remaining across all living characters
const totalHp_left = characters.reduce((acc, n) => acc + n.hp, 0);
console.log(totalHp_left);
console.log("--------------");
// Sort characters by descending hp (highest first)
const sortedHp = [...characters].sort((a, b) => b.hp - a.hp);
console.log(sortedHp);
console.log("--------------");
// Find first chracter whose hp is <50
const first50 = characters.find((n) => n.hp < 50);
console.log(first50);

// Part 3
function simulate(attacker, defender) {
    attacker
}
