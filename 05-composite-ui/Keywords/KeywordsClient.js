export default class KeywordsClient {

    links() {
        return new Promise((resolve, reject) => {
            resolve([
                { id: 1, keywords: 'Adam Bien, react, JEE' },
                { id: 2, keywords: 'Christopher Batey, docker, JVM, Devoxx Poland 2016' },
                { id: 3, keywords: 'Chris Hawkes, react, babel, webpack' }
            ]);
        });
    }
}