module.exports = {
    locales: ['en', 'cs'], // Array with the languages that you want to use
    defaultLocale: 'en', // Default language of your website
    pages: {
        '*': ['common', 'nav'],
    },
    loadLocaleFrom: (lang, ns) =>
        // You can use a dynamic import, fetch, whatever. You should
        // return a Promise with the JSON file.
        import(`./locales/${lang}/${ns}.json`).then((m) => m.default),
};