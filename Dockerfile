# ==============================================================================
# 🎓 LESSON 1: BASE IMAGE (`FROM`)
# ==============================================================================
# Every Docker container starts from a pre-built base operating system.
# 'node:20-alpine' is a lightweight Linux OS with Node.js v20 pre-installed.
# ('alpine' means ultra-small & fast, ~50MB instead of 1GB).
FROM node:20-alpine

# ==============================================================================
# 🎓 LESSON 2: WORKING DIRECTORY (`WORKDIR`)
# ==============================================================================
# Creates and sets the working directory inside the container's virtual filesystem.
# All future commands will run inside '/app'.
WORKDIR /app

# ==============================================================================
# 🎓 LESSON 3: COPY DEPENDENCIES FIRST (`COPY package*.json`)
# ==============================================================================
# We copy package.json and package-lock.json first BEFORE copying all source code.
# Why? Docker caches layers! If your code changes but dependencies don't, 
# Docker skips reinstalling npm packages, making future builds instant!
COPY package*.json ./

# ==============================================================================
# 🎓 LESSON 4: INSTALL DEPENDENCIES (`RUN npm install`)
# ==============================================================================
# Executes shell commands inside the container during the image build process.
RUN npm install

# ==============================================================================
# 🎓 LESSON 5: COPY SOURCE CODE (`COPY . .`)
# ==============================================================================
# Copies all files from your computer's 'Server' folder into the container's '/app' folder.
COPY . .

# ==============================================================================
# 🎓 LESSON 6: EXPOSE PORT (`EXPOSE`)
# ==============================================================================
# Documents which network port the application inside the container listens on.
# Your Express server runs on port 7002.
EXPOSE 7002

# ==============================================================================
# 🎓 LESSON 7: STARTUP COMMAND (`CMD`)
# ==============================================================================
# Defines the command executed when the container starts running.
# Equivalent to running 'node server.js' or 'npm start' in your terminal.
CMD ["node", "server.js"]
