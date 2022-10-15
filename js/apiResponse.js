export function errorHandler(response) {
    let errorMessage = document.createElement('p');
    let msg = `There was an error: ${response}`;
    errorMessage.textContent = msg;
    document.getElementById('response').appendChild(errorMessage);
}

export async function statusCheck(response) {
    if (!response.ok) {
        throw new Error(await response.text);
    }
    return response;
}

