# Use official Node.js image
FROM node:18

# Set working directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy app source
COPY . .

# Expose the port Express listens on
# for development
EXPOSE 3000

# for main
EXPOSE 8000

# Start the app
CMD ["npm", "start"]
