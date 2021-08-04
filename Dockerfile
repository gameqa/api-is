FROM node:12-alpine
COPY ./ ./
RUN npm install -g typescript
RUN npm install -g ts-node
RUN npm i
CMD ["npm", "start"]
