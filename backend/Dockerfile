

# Use official Node mirrors.
# https://hub.docker.com
# first run `docker pull node:18.20.4-alpine3.20`
FROM node:18.20.4-alpine3.20 AS base


# ==========================================
# Initialize
# ==========================================
# Install dependencies only when needed
FROM base AS deps

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

# if using `node:20.15.0`
# RUN apt-get update && \
#     apt-get install -y \
#       curl \
#       jq \
#       git \
#       wget \
#       openssl \
#       bash \
#       tar \
#       net-tools && \
#     rm -rf /var/lib/apt/lists/*


# The WORKDIR instruction sets the working directory for any RUN, CMD, ENTRYPOINT, COPY and ADD instructions that follow it in the Dockerfile
WORKDIR /app-demo-server

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

    
# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app-demo-server
COPY --from=deps /app-demo-server/node_modules ./node_modules
COPY . .


# ==========================================
# Other custom operations
# ==========================================
# Copy the local code into the container (copy the custom page to the software core library)
# Copying a single file can be written as COPY index.php /var/www/html/
# Copy folder can be written as COPY ./files/ /var/www/html/


# ==========================================
# Check if the folder exists
# ==========================================
RUN if test -e ./custom; then cp -avr ./custom/pages/ /app-demo-server/; cp -avr ./custom/src/ /app-demo-server/; cp -avr ./custom/public/ /app-demo-server/; fi



# ==========================================
# Build the project
# ==========================================
RUN npm run build


# ==========================================
# Production image, copy all the files and run next
# ==========================================
FROM base AS runner
WORKDIR /app-demo-server

ENV NODE_ENV=production


# ==========================================
# run node script (deploy custom server configuration)
# ==========================================
# Copy other server files and install dependencies (use root authority, otherwise there will be no authority)
USER root
RUN mkdir -p /app-demo-server
RUN mkdir -p /app-demo-server/utils
RUN mkdir -p /app-demo-server/plugins
RUN mkdir -p /app-demo-server/routes
RUN mkdir -p /app-demo-server/core
RUN mkdir -p /app-demo-server/uploads
RUN mkdir -p /app-demo-server/call


COPY ./utils/* /app-demo-server/utils/
COPY ./plugins/* /app-demo-server/plugins/
COPY ./routes/* /app-demo-server/routes/

#
COPY core/ /app-demo-server/core
RUN ls -la /app-demo-server/core


#--
COPY call/ /app-demo-server/call
RUN ls -la /app-demo-server/call

# 
COPY ./package.json /app-demo-server
# COPY ./eslint.config.mjs /app-demo-server
# COPY ./.htmlvalidate.json /app-demo-server
# COPY ./.stylelintrc.json /app-demo-server


#
COPY ./server-php.js /app-demo-server
COPY ./server-backup.js /app-demo-server
COPY ./server-socket.js /app-demo-server
COPY ./server-files.js /app-demo-server
COPY ./server-upload.js /app-demo-server
COPY ./server-logger.js /app-demo-server
COPY ./server-auth.js /app-demo-server


#--
# `temp_backup` needs to be empty
RUN mkdir -p /app-demo-server/temp_backup



COPY --from=deps /app-demo-server/node_modules ./node_modules




#  Declare 4000 ports, just tell the mirror user the default port, the actual mapping will be informed below
EXPOSE 4000
ENV PORT=4000

# Execute a single file
CMD ["node", "server-php.js"]

