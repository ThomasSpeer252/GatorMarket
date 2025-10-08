FROM node:20

WORKDIR /app

# Initialize a package.json inside the container
RUN npm init -y

# Copy the rest of your frontend source code
COPY . .

# Install dependencies (if you add them later)
RUN npm install

CMD ["npm", "run", "dev"]