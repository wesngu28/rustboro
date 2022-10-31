# Rustboro Trainer School

A web app that displays Pokemon based on user search or generates six random pokemon.

Still a work in progress, some parts may feel unresponsive or slow.

[It used to look like this...](https://wesngu28.github.io/pokemon-regional-randomizer/) [quite the change](https://github.com/wesngu28/pokemon-regional-randomizer)

<p align="center">
  <img src="static/diggersby.png" alt="diggersby" />
  <p align="center"> Diggersby Intermission</p>
</p>

# What I learned and used

Remaking this app was something that I wanted to do for a while, given that I made it when I barely knew Javascript and how the fetch api worked. I initially planned to only make a simple Smogon-like stat viewer, but thought why not just implement some form of user interactivity in the form of a stat picking game.

As for the technology itself, pokemon are gathered from the app's backend CockroachDB cluster (which is very similar to Postgresql). The website was made with SvelteKit using Typescript and the database queries are handled with Prisma.

CockroachDB is a really cool database that is very resilient and durable, with great automatic horizontal scaling. Prisma made it really easy to interface with the underlying database and prevented me from having to write potentially dangerous raw SQL.

This is the first time I have used

- CockroachDB
- SQL (outside of university)
- Prisma
