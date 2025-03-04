FROM node:20.9.0

WORKDIR /app

# Copy only package.json and package-lock.json first to leverage Docker cache
COPY package.json package-lock.json ./

RUN npm install 

# Now copy the rest of the files
COPY . .

# Expose the Vite port (default: 5173)
EXPOSE 5173

# Run in development mode (for production, see below)
CMD ["npm", "run", "dev"]
