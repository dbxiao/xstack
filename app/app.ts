/**
 * @author dbxiao
 * @description This code registers module aliases, imports required modules,
 * creates an express app instance, sets port number, static file configuration, template file paths, 
 * response content compression, JSON parsing, cookie parsing, routing module, and listens to the specified port.
 * @copyright 2023 dbxiao. All rights reserved.
 */

// Register module alias
require('module-alias/register')
import express, { json } from 'express'
import compression from 'compression' 
import cookieParser from 'cookie-parser'
import ejs from 'ejs'
import router from '@router/router'
import serverConf from '@config/server.conf'

const { PORT, RES, STATIC_DIR } = serverConf
const app = express()
const staticOptions = {
    etag: true,
    maxAge: 60 * 60 * 1000
}

// Set template file paths
app.engine('html', ejs.renderFile)
    .set('views', serverConf.VIEW_DIR)
    .set('view engine', 'html')

// Static file route
app.use('/' + RES, express.static(STATIC_DIR, staticOptions))

// Response content compression, JSON parsing, and cookie parsing
app.use(compression())
    .use(json())
    .use(cookieParser())

// Use routing module
app.use(router)

// Listen to the specified port
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})