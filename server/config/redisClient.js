import { createClient } from 'redis';

const redisClient = createClient(
    // {
    //     password: 'KOxToMMhq9hkvaGLwQy5JZgtd41H4k1Z',
    //     socket: {
    //         host: 'redis-18497.c100.us-east-1-4.ec2.cloud.redislabs.com',
    //         port: 18497
    //     }
    // }
);

redisClient.on('connect', () => {
    console.log('Redis client connected');
});

redisClient.on('error', (err) => {
    console.log(`Something went wrong ${err}`);
});


export default redisClient;