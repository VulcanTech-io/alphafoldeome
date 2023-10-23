# # Install dependencies only when needed
FROM node:20-alpine AS base
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY . . 

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

USER root

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --chown=nextjs:nodejs . .
# copy the public folder to the /app folder
RUN yarn global add sharp@0.32.5
# next two work
COPY --chown=nextjs:nodejs ./public .next/standalone/Desktop/alphafoldeome/public

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

RUN ls /
# this one works
CMD ["node", ".next/standalone/Desktop/alphafoldeome/server.js"]
