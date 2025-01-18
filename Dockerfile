# Базовый образ Node.js
FROM node:18

# Установка рабочей директории внутри контейнера
WORKDIR /app

# Копирование package.json и package-lock.json
COPY package*.json ./

# Установка зависимостей
RUN npm install

# Копирование всего проекта в контейнер
COPY . .

# Компиляция TypeScript в JavaScript
RUN npm run build

# Установка порта, на котором будет работать приложение
EXPOSE 8081

# Команда для запуска приложения
CMD ["node", "dist/index.js"]
