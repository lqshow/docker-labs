'use strict';

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const express = require('express');
const winston = require('winston');
const http = require('http');
const app = express();

const swaggerMetadata = require('swagger-tools/middleware/swagger-metadata');
const swaggerRouter = require('swagger-tools/middleware/swagger-router');
const swaggerValidator = require('swagger-tools/middleware/swagger-validator');
const swaggerUi = require('swagger-tools/middleware/swagger-ui');


app.use(bodyParser.json({limit: '10mb', strict: false}));
app.use(bodyParser.raw({limit: '10mb', type: 'application/octet-stream'}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride());


let spec = fs.readFileSync(path.resolve(__dirname, './api/swagger.yaml'), 'utf8');
let swaggerDoc = yaml.safeLoad(spec);
app.use(swaggerMetadata(swaggerDoc));
app.use(swaggerValidator());
app.use(swaggerUi(swaggerDoc));
app.use(swaggerRouter({controllers: path.resolve(__dirname, './controllers')}));

const server = http.createServer(app);
server.listen(3000, function () {
    winston.info('service is listening on port 3000');
});