# Pokemon Stats Viewer and Game
A web app that displays Pokemon based on user search or generates six random pokemon.

Still a work in progress, some parts may feel unresponsive or slow.

[It used to look like this though...](https://github.com/wesngu28/pokemon-stats-game/tree/main)

# What I learned and used

Remaking this app was something that I wanted to do for a while, given that I made it when I barely knew Javascript and how the fetch api worked. I initially planned to only make a simple Smogon-like stat viewer, but thought why not just implement some form of user interactivity in the form of a stat picking game.

As for the technology itself, pokemon are gathered from the app's backend CockroachDB cluster running postgresql, but not all of the Pokemon are currently inside the database, as they are incrementally added when one that isn't in it is queried for or generated. The website was made with SvelteKit using Typescript and the database queries are handled with Prisma.

This is the first time I have used

- CockroachDB
- PostgreSQL (outside of university)
- Prisma

Prisma made it really easy to interface with the underlying database and prevented me from having to write potentially dangerous raw SQL.

Maybe I should just write a script to fill the whole database...hitting the PokeAPI is really slow...

<br>
<br>
<br>
<br>
<br>

<p align="center">
Apparently the whole Pokemon franchise of which is 25+ years mature has no direct counterpart to the cockroach, one of the most infamous organisms on Earth, and whatever this is is the closest match
</p>
<p align="center">
  <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/06f563d8-dd63-419a-87d5-fa5e3dab6da3/dbkjxei-bb2d6d1b-cf01-413a-942c-d626a6678352.png/v1/fit/w_375,h_309,q_70,strp/pheromosa_by_ixjackiexx_dbkjxei-375w.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9ODQ0IiwicGF0aCI6IlwvZlwvMDZmNTYzZDgtZGQ2My00MTlhLTg3ZDUtZmE1ZTNkYWI2ZGEzXC9kYmtqeGVpLWJiMmQ2ZDFiLWNmMDEtNDEzYS05NDJjLWQ2MjZhNjY3ODM1Mi5wbmciLCJ3aWR0aCI6Ijw9MTAyNCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.gmdQXdJUjtP0WVv-bw48h5JbAj5lE7Y76Qk4R63GyjE" />
</p>