FROM node:10-alpine

WORKDIR /opt/module

COPY . .

RUN yarn add -G serve

CMD ["serve"]

EXPOSE 3000
