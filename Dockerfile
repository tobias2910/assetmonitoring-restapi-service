FROM node:12.18-alpine
ENV NODE_ENV=prod
ENV PORT=3000
WORKDIR /usr/app/
COPY "package.json" ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "dist/index.js"]