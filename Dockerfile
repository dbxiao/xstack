#
# @author dbxiao
# @description: dipeak dockerfile conf
#

# Set docker env with node@20.10.0
FROM node:20.10.0

# Set docker env
ENV NODE_ENV=production

# Create app directory
WORKDIR /xstack/web-server

# Copy files
COPY ./ ./
COPY package*.json ./

# Install app dependencies
# RUN npm i --registry=https://registry.npmmirror.com
# RUN npm list

# Bundle app source
RUN npx tsc

# Open http port
EXPOSE 80


# Run web server
# CMD [ "pm2-runtime", "start", "ecosystem.config.js", "--env", "production" ]
CMD ["sh", "start.sh"]
