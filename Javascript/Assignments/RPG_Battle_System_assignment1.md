# Assignment 1: RPG Battle System

Build a turn-based RPG battle system in plain JavaScript (no frameworks).

---

## Table of Contents

- [Part 1 — Characters](#part-1--characters)
- [Part 2 — The Roster](#part-2--the-roster)
- [Part 3 — Battle Loop](#part-3--battle-loop)
- [Part 4 — Summary](#part-4--summary)
- [Stretch Goals](#stretch-goals)

---

## Part 1 — Characters

Create a base `Character` class with:

- `name`, `hp`, `maxHp`, `attackPower` as constructor parameters
- A private field `#alive` that is `true` when `hp > 0`
- `takeDamage(amount)` — reduces hp, never goes below 0, updates `#alive`
- `isAlive()` — returns the private `#alive` field
- `heal(amount)` — restores hp, never exceeds `maxHp`
- `getStatus()` — returns a string like `Rex | HP: 80/100`

Then create two subclasses:

### Warrior

Has an extra `rage` field (starts at 0).

| Method | Description |
| --- | --- |
| `attack(target)` | Deals `attackPower` damage, gains 10 rage each time |
| `powerAttack(target)` | Costs 30 rage, deals `attackPower * 2.5` damage. Throw an error if not enough rage. |

### Mage

Has an extra `mana` field.

| Method | Description |
| --- | --- |
| `cast(target)` | Costs 20 mana, deals `attackPower * 2` damage. Throw an error if not enough mana. |
| `meditate()` | Restores 15 mana, cannot exceed starting mana. |

---

## Part 2 — The Roster

Create an array of at least 5 characters (mix of Warriors and Mages).

Using **only array methods** (`filter`, `map`, `reduce`, `sort`, `find`) — no loops:

1. Get all characters that are still alive
2. Get a list of just their names and current hp as objects `{ name, hp }`
3. Calculate total hp remaining across all living characters
4. Sort characters by hp descending (highest first)
5. Find the first character whose hp is below 50

---

## Part 3 — Battle Loop

Write a `simulate(attacker, defender)` function that:

- Has the attacker attack the defender
- Logs the result using a template literal:
  ```
  "Rex attacks Gandalf for 25 damage! (Gandalf: 75/100 HP)"
  ```
- If the defender dies, logs:
  ```
  "Gandalf has been defeated!"
  ```
- Returns an object `{ attacker, defender, damageDealt, defenderAlive }`

Then simulate at least 6 rounds between two characters until one dies. Use `powerAttack` or `cast` where possible and handle the errors with `try/catch`.

---

## Part 4 — Summary

After the battle, use `Object.entries()` and array methods to print a summary of every character's final state:

```
=== BATTLE SUMMARY ===
Rex (Warrior)    | HP: 45/100 | Status: Alive
Gandalf (Mage)   | HP: 0/100  | Status: Defeated
```

---

## Stretch Goals

- Add a `Healer` subclass with a `healAlly(target)` method
- Add a `#battleLog` private array on each character that records every hit they take
- Use `Object.freeze()` on a `GAME_CONFIG` object for constants like max mana, rage cost, and multipliers
