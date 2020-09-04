/***************************************************************************************************
 * Load `$localize` onto the global scope - used if i18n tags appear in Angular templates.
 */
import '@angular/localize/init';
import 'zone.js/dist/zone-node';

import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { join } from 'path';

import { AppServerModule } from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';
import { existsSync } from 'fs';
import 'localstorage-polyfill'

global['localStorage'] = localStorage;
const MockBrowser = require('mock-browser').mocks.MockBrowser;
const mock = new MockBrowser();


global['navigator'] = mock.getNavigator();

// The Express app is exported so that it can be used by serverless Functions.
export function app() {

  const server = express();
  // server.use(require('prerender-node'));

  // server.use(require('prerender-node').set('prerenderToken', 'PW7nRy4GzTvZMmCOJTD7'));


  const distFolder = join(process.cwd(), 'dist/youcan-web-app/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
  }));

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // Example Express Rest API endpoints
  // app.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    res.render(indexHtml, {
      req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }]

    });
    // console.log("inner", indexHtml);
  });



  const fs = require("fs");
  server.use((req, res) => {
    let rs = fs.createReadStream(`${__dirname}/dist/youcan-web-app/index.html`);
    res.writeHead(200, { "Content-type": "text/html" });
    rs.pipe(res);
    // console.log("whata", res, "what");
    // res.send(rs);
  })



  // console.log("outer", indexHtml);
  return server;
}

// to get the route params working add below in your server.ts

// app.get('/:routeParam', (req, res) => { res.render('index', {req}); //note 'index' uses the Universal engine })

// route edit
// var objExpress = express.Router();

// var path = require('path');
// //3.
// //5.
// objExpress.get("/", function (request, response) {
//   response.sendFile('home.html', { root: path.join(__dirname, './src/app/components/home-component/home-component.component.html') });
// });

// //6.
// objExpress.get('/search', function (request, response) {
//   response.sendFile(' ', { root: path.join(__dirname, './src/app/components/search/search.component.html') });
// });
// //7.
// objExpress.get('/activity-details/:activityId/:ishosting', function (request, response) {
//   response.sendFile('', { root: path.join(__dirname, './src/app/components/activity-details/activity-details.component.html') });
// });

//end
function run() {
  const port = process.env.PORT || 4000;

  // Start up the Node server
  const server = app();
  server.use(require('prerender-node').set('prerenderToken', 'PW7nRy4GzTvZMmCOJTD7').set('protocol', 'https'));
  server.get('*', function (req, res) {
    res.send(join(process.cwd(), 'dist/youcan-web-app/browser') + '/index.html');
  });
  // console.log("121", server, "i am server");
  // server.use(require('prerender-node').set('prerenderToken', 'PW7nRy4GzTvZMmCOJTD7'));
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}



export * from './src/main.server';
