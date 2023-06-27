import credentials from "../credentials"

async function getData(): Promise<any> {
    const data = await fetch(credentials.url)
    .then(res => res.text())
    .then(text => JSON.parse(text.substr(47).slice(0, -2)))
    return data;
}

export const requests  = {
    getData,
}