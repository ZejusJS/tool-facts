module.exports = {
    locales: ['lng-en', 'lng-cs'], 
    defaultLocale: 'lng-en', 
    pages: {
        '*': ['common', 'nav', 'form', 'about', 'error', "meta", 'menu'],
        "/fact/[id]": ['share-fact'],
        "/sources": ['sources'],
        "/find-fact": ['find']
    },
    loadLocaleFrom: (lang, ns) =>
        // You can use a dynamic import, fetch, whatever. You should
        // return a Promise with the JSON file.
        import(`./locales/${lang}/${ns}.json`).then((m) => m.default),
        
};