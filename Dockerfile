
# --- Estágio 1: Build (Compilação) ---
FROM node:20 AS builder

# Define a pasta de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de dependência primeiro (para aproveitar cache do Docker)
COPY package*.json ./
COPY prisma ./prisma/

# Instala TODAS as dependências (incluindo devDependencies para rodar o tsc)
RUN npm install

# Copia o resto do código fonte
COPY . .

# Gera o cliente do Prisma e Compila o TypeScript para JavaScript (pasta dist)
RUN npx prisma generate
RUN npm run build

# --- Estágio 2: Production (Execução) ---
# Usamos uma imagem limpa para rodar
FROM node:20

WORKDIR /app

# Copia apenas o package.json para instalar só as dependências de produção
COPY package*.json ./
COPY prisma ./prisma/

# Instala APENAS dependências de produção (mais leve, sem typescript, etc)
RUN npm install --only=production

# Copia os arquivos compilados do Estágio 1 para cá
COPY --from=builder /app/dist ./dist

# Garante que o Prisma Client saiba rodar aqui
RUN npx prisma generate

# Expõe a porta que o servidor usa (se usar express/http futuramente)
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["npm", "start"]