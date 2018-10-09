import * as http from "http";
import * as https from "https";


const port = 80;

const requestHandler = (request: any, response: any) => {
    https.get(`https://browserleaks.com${request.url}`, (res) => {
        res.on('data', (chunk: any) => {
            try {
                response.write(chunk, 'binary');
            } catch (e) {
                console.error(e.message);
            }
        });
        res.on('end', () => {
            try {
                response.end();
            } catch (e) {
                console.error(e.message);
            }
        });
    }).on('error', (e: any) => {
        console.error(`Error: ${e.message}`);
    });
};


const server = http.createServer(requestHandler);


server.listen(port, (err:any) => {
    console.log(`server on port ${port}`)
});
