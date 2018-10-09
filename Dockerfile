FROM node:8.9-alpine

# Создать директорию app
WORKDIR /

# Установить зависимости приложения
# Используется символ подстановки для копирования как package.json, так и package-lock.json,
# работает с npm@5+
COPY package*.json ./
COPY yarn*.lock ./

RUN yarn install
# Используется при сборке кода в продакшене
# RUN npm install --only=production

# Скопировать исходники приложения
COPY . /

EXPOSE 80
CMD [ "yarn", "start" ]
