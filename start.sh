#!/bin/bash

# 开发模式命令
# pm2 start app.js --name start --watch
# sudo node --inspect app.js
# pm2-runtime ecosystem.config.js --env development
# start logsatsh to collect log, use elk to query log
npx pm2 start ./dist/ecosystem.config.js --env production
tail -f /dev/null

