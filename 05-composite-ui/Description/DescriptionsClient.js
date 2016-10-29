export default class DescriptionsClient {

    loadDescriptions() {
        return new Promise((resolve, reject) => {
            resolve([
                { linkId: 1, description: 'Java EE becomes an interesting platform for exposing services for mobile apps. To give you a feeling about the productivity, I installed a CORS filter, implemented, built and deployed a Java EE 7 service from scratch, exposed a JSON-array, implemented a HTTP client using stock XMLHttpRequest and rendered the result using the React JavaScript library.' },
                { linkId: 2, description: 'Containers are the latest hype. It goes without saying that Docker for the development environment is a good thing but what about running our production Java applications inside a container?' },
                { linkId: 3, description: 'Things change in the JavaScript world so fast nowadays. I feel this video is relatively future proof going into 2017 as to how babel, react and webpack should be used together to make development easier.' }
            ]);
        });
    }
}