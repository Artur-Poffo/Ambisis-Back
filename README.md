# Ambisis - Back-End

<h4 align="center"> 
	 💡 Sei que isso pode parecer over-engineering para projetos sem potencial de escalabilidade, mas como este é um processo seletivo, quis apresentar uma solução completa e bem estruturada.
</h4>

<p align="center">
 <a href="#como-funciona">Como funciona</a> • 
 <a href="#tecnologias">Tecnologias</a> • 
 <a href="#autor">Autor</a>
</p>

## Como funciona

### Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas na sua máquina:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/), [PNPM](https://pnpm.io/) (Para PNPM você pode usar `corepack enable`), um editor como [VSCode](https://code.visualstudio.com/), e um cliente REST como [Insomnia](https://insomnia.rest/).

Além disso, o Docker é necessário para executar o banco de dados MySQL usando o [Docker Compose](https://docs.docker.com/compose/).

#### 01. Configurar o banco de dados

```bash
# Clone este repositório
$ git clone https://github.com/Artur-Poffo/Ambisis-Back.git ambisis-back

# Navegue até o diretório do projeto no terminal
$ cd ambisis-back

# Instale as dependências
$ pnpm install

# Inicialize o banco de dados
$ docker compose up -d
# Este comando cria e inicia um contêiner Docker com o banco de dados MySQL

# Renomeie o arquivo env.example para .env

# Execute as migrations
$ pnpm prisma migrate dev

# Pronto!

# Para parar o Docker, execute:
$ docker compose stop

# Para excluir o contêiner, execute:
$ docker compose down
```

#### 02. Executar a API

```bash
# Verifique se você está no diretório do projeto no terminal
$ cd ambisis-back

# Verifique se as dependências estão instaladas
$ pnpm install

# Inicie a API
$ pnpm start:dev
```

#### 03. Executar testes

```bash
# Execute os testes unitários
$ pnpm test

# Execute a cobertura de testes
$ pnpm test:coverage
```

---

## Tecnologias

As seguintes ferramentas foram utilizadas na construção do projeto:

- **Node.js**
- **TypeScript**
- **tsx**
- **tsup**
- **Fastify**
- **zod**
- **prisma**
- **vitest**
- **Docker**

> Veja o [package.json](https://github.com/Artur-Poffo/Ambisis-Back/blob/main/package.json)

---

## Autor

- _**Artur Poffo - Desenvolvedor**_

[![Linkedin Badge](https://img.shields.io/badge/-Artur-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/arturpoffo/)](https://www.linkedin.com/in/arturpoffo/)
[![Gmail Badge](https://img.shields.io/badge/-arturpoffop@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:tgmarinho@gmail.com)](mailto:arturpoffop@gmail.com)

---
