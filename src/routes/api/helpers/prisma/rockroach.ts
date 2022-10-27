import type { Display } from "@prisma/client";
import { capitalize } from "../../../../helpers/capitalize";
import { fetchPokemonData } from "../fetchPokemonData";
import { prismatic } from "./primsa";

export async function rockroach(pokemon: string) {
    console.log(pokemon)
    if(!pokemon) {
        throw Error
    }
    let body = {} as Display;
    let status = 500;
    try {
        let checkIfAlreadyIn = await prismatic.display.findFirst({
            where: {
                name: {
                    equals: capitalize(pokemon)
                }
            }
        });
        if (!checkIfAlreadyIn) {
            checkIfAlreadyIn = await prismatic.display.findFirst({
                where: {
                    name: {
                        contains: capitalize(pokemon)
                    }
                }
            });
        }
        if (checkIfAlreadyIn) {
            status = 200
            body = checkIfAlreadyIn
            return {
                status,
                body
            }
        }
        if (!checkIfAlreadyIn) {
            const pokemonData = await fetchPokemonData(pokemon)
            body = await prismatic.display.create({
                data: {
                    ...pokemonData
                }
            })
            status = 200
            return {
                status,
                body
            }
        }
    } catch (err: any) {
        console.log(err.message)
        status = 404
        return {
            status
        }
    }
}