FROM node:20.10.0-alpine

# Install bash (if needed) and global dependencies
RUN apk add --no-cache bash
RUN npm install -g @nestjs/cli typescript ts-node

# Copy package.json and package-lock.json separately to leverage Docker cache
COPY package*.json /tmp/app/
RUN cd /tmp/app && npm install

# Copy the application code
COPY . /usr/src/app

# Copy the node_modules from /tmp/app to the final destination
RUN cp -a /tmp/app/node_modules /usr/src/app

# Copy necessary scripts and make them executable
COPY ./wait-for-it.sh /opt/wait-for-it.sh
COPY ./startup.dev.sh /opt/startup.dev.sh
RUN chmod +x /opt/wait-for-it.sh /opt/startup.dev.sh

# Remove Windows carriage return characters from scripts
RUN sed -i 's/\r//g' /opt/wait-for-it.sh
RUN sed -i 's/\r//g' /opt/startup.dev.sh

# Set working directory
WORKDIR /usr/src/app

# Copy environment file if not exists
RUN if [ ! -f .env ]; then cp env-example .env; fi

# Build the application
RUN npm run build


CMD ["/opt/startup.dev.sh"]
