# Use the official Node.js image as the base
FROM node:18

# Set the working directory inside the container
WORKDIR /src

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port the app runs on
EXPOSE 3007

# Command to start the application
CMD ["node", "dist/index.js"]
