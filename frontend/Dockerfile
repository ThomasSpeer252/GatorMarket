# Use Node 20 (matches your engines requirement of >=18)
FROM node:20

# Set working directory
WORKDIR /app

# Copy dependency manifests first (better caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application source
COPY . .

# Expose the default CRA/CRACO port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]