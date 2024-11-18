
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
WORKDIR /fullstack-nextjs-app-template


# If npm network problems prevent you from installing npm dependency packages, please use the following code
# RUN npm config set registry http://registry.npmmirror.com


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
WORKDIR /fullstack-nextjs-app-template
COPY --from=deps /fullstack-nextjs-app-template/node_modules ./node_modules
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
RUN if test -e ./custom; then cp -avr ./custom/pages/ /fullstack-nextjs-app-template/; cp -avr ./custom/src/ /fullstack-nextjs-app-template/; cp -avr ./custom/public/ /fullstack-nextjs-app-template/; fi


# ==========================================
# Build the project
# ==========================================
RUN npm run build


# ==========================================
# Production image, copy all the files and run next
# ==========================================
FROM base AS runner
WORKDIR /fullstack-nextjs-app-template

ENV NODE_ENV=production


# ==========================================
# For Next.js
# ==========================================
# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /fullstack-nextjs-app-template/public ./public

# Next.js Directory permission settings (IF arm64 to amd64)
RUN ls -ld ./public
RUN chmod -R 755 ./public



# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /fullstack-nextjs-app-template/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /fullstack-nextjs-app-template/.next/static ./.next/static


USER nextjs


# ==========================================
# run node script (deploy custom server configuration)
# ==========================================
# Declare port 3000, just tell the mirror user the default port, the actual mapping will be informed below
EXPOSE 3000
ENV PORT=3000

# Execute a single file
CMD ["node", "server.js"]



# # ==========================================
# # Execute multiple files using node (write entry point)
# # ==========================================
# # Copy other server files and install dependencies (use root authority, otherwise there will be no authority)
# USER root
# RUN mkdir -p /fullstack-nextjs-app-template/backend
# RUN mkdir -p /fullstack-nextjs-app-template/backend/libs
# COPY ./backend/server-upload.js ./backend/
# COPY ./backend/libs/* ./backend/libs/

# # "COPY" should be followed immediately before the command to install dependencies
# # Copy the folders outside the "next.js" separately
# RUN mkdir -p /fullstack-nextjs-app-template/plugins
# COPY plugins/ /fullstack-nextjs-app-template/plugins

# # execute the ls command inside the image's shell to recursively list all subdirectories' content of the "WORKDIR" folder
# RUN ls -la /fullstack-nextjs-app-template/plugins

# COPY --from=deps /fullstack-nextjs-app-template/node_modules ./node_modules



# ==========================================
# run node script (multiple)
# ==========================================
# # create a `.sh` file
# RUN printf "node server.js& node ./backend/server-upload.js&\nwait\necho \"--> All is ending\"" > entrypoint.sh

# # Declare 3000 and 4001 ports, just tell the mirror user the default port, the actual mapping will be informed below
# EXPOSE 3000
# EXPOSE 4001

# # Execute bash file
# CMD ["/bin/sh", "entrypoint.sh"]

