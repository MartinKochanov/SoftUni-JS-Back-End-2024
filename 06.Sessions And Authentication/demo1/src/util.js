function parseCookieData(cockieData) {

    const cookies = Object.fromEntries(cockieData
        .split(';')
        .map(kvp => kvp.trim())
        .filter(kvp => kvp)
        .map(kvp => kvp.split('=')));

    return cookies;
}

module.exports = { parseCookieData }