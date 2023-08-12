module.exports = {
    locales: ['en', 'cs'], 
    defaultLocale: 'en', 
    pages: {
        '*': ['common', 'nav', 'form', 'about', 'error', "meta"],
        "/fact/[id]": ['share-fact']
    },
    loadLocaleFrom: (lang, ns) =>
        // You can use a dynamic import, fetch, whatever. You should
        // return a Promise with the JSON file.
        import(`./locales/${lang}/${ns}.json`).then((m) => m.default),
        
};