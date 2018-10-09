"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const http = __importStar(require("http"));
const https = __importStar(require("https"));
const port = 80;
const requestHandler = (request, response) => {
    https.get(`https://browserleaks.com${request.url}`, (res) => {
        res.on('data', (chunk) => {
            try {
                response.write(chunk, 'binary');
            }
            catch (e) {
                console.error(e.message);
            }
        });
        res.on('end', () => {
            try {
                response.end();
            }
            catch (e) {
                console.error(e.message);
            }
        });
    }).on('error', (e) => {
        console.error(`Error: ${e.message}`);
    });
};
const server = http.createServer(requestHandler);
server.listen(port, (err) => {
    console.log(`server on port ${port}`);
});
