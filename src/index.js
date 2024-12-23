import express from 'express';
import cors from 'cors';
import router from './router/routeV1.js';
import configEnv from './configs/configEnv.js';
const app = express();
const port = configEnv.app.port || 3900;


app.use(
    cors({
        origin: true, // This is a security issue, allowing all origins
        credentials: true, // This allows cookies to be sent/received
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api/v1', router);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});