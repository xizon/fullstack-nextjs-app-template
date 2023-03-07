
# Use official Node mirrors.
# https://hub.docker.com
FROM node:18.14.2-alpine3.17 AS base


# Install dependencies only when needed
FROM base AS deps

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.

RUN apk add --no-cache libc6-compat
WORKDIR /fullstack-nextjs-app-template

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


# Other custom operations
# Copy the local code into the container (copy the custom page to the software core library)
# Copying a single file can be written as COPY index.php /var/www/html/
# Copy folder can be written as COPY ./files/ /var/www/html/

# Check if the folder exists
RUN if test -e ./custom; then cp -avr ./custom/pages/ /fullstack-nextjs-app-template/; cp -avr ./custom/src/ /fullstack-nextjs-app-template/; cp -avr ./custom/public/ /fullstack-nextjs-app-template/; fi


# Build the project
RUN npm run build


# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /fullstack-nextjs-app-template

ENV NODE_ENV production


# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /fullstack-nextjs-app-template/public ./public


# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /fullstack-nextjs-app-template/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /fullstack-nextjs-app-template/.next/static ./.next/static


USER nextjs


# run node script (deploy custom server configuration)
# Execute a single file, please use the following command
# Declare port 3000, just tell the mirror user the default port, the actual mapping will be informed below
EXPOSE 3000
ENV PORT 3000
# run node script (deploy custom server configuration)
CMD ["node", "server.js"]



# # Execute multiple files using node (write entry point)
# RUN printf "node server.js\nnode backend/server-core.js\n" > entrypoint.sh
# # Declare 3000 and 4001 ports, just tell the mirror user the default port, the actual mapping will be informed below
# EXPOSE 3000
# ENV PORT 3000
# EXPOSE 4001
# ENV PORT 4001
# # Execute bash file
# CMD ["/bin/sh", "entrypoint.sh"]




