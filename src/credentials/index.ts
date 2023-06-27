interface ICredentials {
    url: string,
    id: string
}

const credentials = {
    id: '1pacYI0-UjaWeZV5eft1JTyK1NKJCmUSws3_HVEQ_gnk',
    get url () {
        return `https://docs.google.com/spreadsheets/d/1pacYI0-UjaWeZV5eft1JTyK1NKJCmUSws3_HVEQ_gnk/gviz/tq?tqx=out:json`
    }
} as ICredentials

export default Object.freeze(credentials);

