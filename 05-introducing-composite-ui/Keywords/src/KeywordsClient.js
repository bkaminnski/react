export default class KeywordsClient {

    loadKeywords() {
        return new Promise((resolve, reject) => {
            resolve([
                { linkId: 1, keywords: 'Adam Bien, react, JEE' },
                { linkId: 2, keywords: 'Christopher Batey, docker, JVM, Devoxx Poland 2016' },
                { linkId: 3, keywords: 'Chris Hawkes, react, babel, webpack' }
            ]);
        });
    }
}