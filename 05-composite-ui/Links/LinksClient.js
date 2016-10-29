export default class LinksClient {
    links() {
        let result = new Promise((resolve, reject) => {
            resolve([
                { id: 1, url: 'https://www.youtube.com/watch?v=A800BaLBB2k' },
                { id: 2, url: 'https://www.youtube.com/watch?v=Vt4G-pHXfs4' },
                { id: 3, url: 'https://www.youtube.com/watch?v=w5TupxbnnrM' }
            ]);
        });
        return result;
    }
}