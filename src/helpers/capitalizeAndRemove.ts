import { capitalize } from "./capitalize";

export function capitalizeAndRemove(string: string) {
    string = string.replace('-', ' ')
    const stringArr = string.split(' ')
    const capitalizedStringArr = stringArr.map(string => {
        return capitalize(string)
    });
    return capitalizedStringArr.join(' ')
}