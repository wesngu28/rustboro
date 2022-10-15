export function display() {
    let figures = document.querySelectorAll('#pokemon-table img');
    figures[0].style.display = "block";
    let names = document.querySelectorAll('#pokemon-table p');
    names[0].style.display = "block";
}
