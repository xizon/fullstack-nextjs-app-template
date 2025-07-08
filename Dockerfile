# ------------------------------------------
# BASE IMAGE
# ------------------------------------------
FROM node:18.20.4-alpine3.20 AS base

# Use base to share common files (used in multiple stages)


# ------------------------------------------
# DEPENDENCIES INSTALLATION
# ------------------------------------------
FROM base AS deps

RUN apk add --no-cache libc6-compat

WORKDIR /fullstack-nextjs-app-template

# Use preferred lockfile
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

# Install dependencies based on lockfile type
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
  else echo "No lockfile found!" && exit 1; \
  fi


# ------------------------------------------
# BUILD STAGE
# ------------------------------------------
FROM base AS builder

WORKDIR /fullstack-nextjs-app-template

COPY --from=deps /fullstack-nextjs-app-template/node_modules ./node_modules
COPY . .

# Optional: apply custom overlays if they exist
RUN if [ -d ./custom ]; then \
    cp -avr ./custom/pages/ ./; \
    cp -avr ./custom/src/ ./; \
    cp -avr ./custom/public/ ./; \
  fi

# Run build
RUN npm run build


# ------------------------------------------
# PRODUCTION RUNTIME
# ------------------------------------------
FROM base AS runner

WORKDIR /fullstack-nextjs-app-template

ENV NODE_ENV=production
ENV PORT=3000

# Add non-root user for Next.js (optional but recommended)
RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

# Public assets
COPY --from=builder /fullstack-nextjs-app-template/public ./public

# Fix permissions (especially useful on ARM/CI)
RUN chmod -R 755 ./public

# Copy optimized Next.js standalone output
COPY --from=builder --chown=nextjs:nodejs /fullstack-nextjs-app-template/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /fullstack-nextjs-app-template/.next/static ./.next/static

# If server.js exists in your root, it will run
USER nextjs

EXPOSE 3000
CMD ["node", "server.js"]

# ==========================================
# ✅ OPTIONAL BACKEND (Uncomment if used)
# ==========================================

# COPY ./backend@nest /fullstack-nextjs-app-template/backend@nest
# WORKDIR /fullstack-nextjs-app-template/backend@nest
# RUN npm install

# To run backend & frontend together, see the bottom section for multi-script entrypoint
