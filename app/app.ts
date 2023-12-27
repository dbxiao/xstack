/**
 * @author dbxiao
 * @description This code registers module aliases, imports required modules,
 * creates an express app instance, sets port number, static file configuration, template file paths, 
 * response content compression, JSON parsing, cookie parsing, routing module, and listens to the specified port.
 * @copyright 2023 dbxiao. All rights reserved.
 */

// Register module alias
require('module-alias/register')
import dotenv from 'dotenv'
import express, { json } from 'express'
import compression from 'compression' 
import cookieParser from 'cookie-parser'
import ejs from 'ejs'
import { router } from '@router'
import serverConf from '@config/server.conf'
dotenv.config()

const { PORT, IP } = process.env
const { RES, STATIC_DIR, DEV_IP, DEV_PORT } = serverConf
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

// Listen to the specified port. On prod env use pm2 ecosystem.config.js port, otherwise use default port.
if (PORT && IP) {
    app.listen(Number(PORT), IP, () => {
        console.log(`App production env: http://${IP}:${PORT}`)
    })
} else {
    app.listen(DEV_PORT, DEV_IP, () => {
        console.log(`App development env: http://${DEV_IP}:${DEV_PORT}`)
    })
}

