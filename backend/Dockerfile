FROM node:18
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm install -g prisma@6.1.0
RUN npx prisma generate
EXPOSE 5000
CMD ["npm","start"]
