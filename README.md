# UploadAi Api 

Backend da aplicação UploadAi desenvolvido durante o <i>Nlw IA</i>. Esta aplicação consiste em utilizar a IA da OpenAi (ChatGPT) para gerar títulos e descrições de vídeos

## Integração com OpenAi
Esta aplicação interage diretamente com a API da OpenAi onde a documentação pode ser encontrada [aqui]('https://platform.openai.com/docs/introduction').

## Rodando o servidor
Para poder rodar o servidor, é necessário possuir o [node]('https://nodejs.org/en') e o [docker]('https://www.docker.com/') instalados em seu sistema

### Banco de Dados
A aplicação foi desenvolvida utilizando banco de dados PostgreSQL. <br />
Utilize o comando abaixo para realizar a instalação do container Docker contendo a imagem da Bitname do PostgreSQL.
```bash
docker compose up -d
```

### Rodando o servidor HTTP
Utilizando o pnpm (<i>Node Package Manager</i>), instale todas as dependências da aplicação.

```bash
pnpm install
```

Depois de instalar as dependências, crie as tabelas no banco de dados e realize as migrations utilizando o Prisma, digitando o seguinte comando:
```bash
pnpm prisma migrate dev
```

Agora, a aplicação estará pronta para uso, digitando o comando:
```bash
pnpm start:dev
```

### Utilizando as credenciais e as variáveis de ambiente
O servidor utiliza de variáveis de ambiente para realizar a conexão com a OpenAi e o banco de dados. <br >
Você poderá utilizar suas próprias credenciais definindo as variáveis de ambiente a seguir:

```
# CHECK IF APP IS NOW DEVELOPING 
NODE_ENV=""

# DATABASE ENV
DATABASE_URL=""

# OPENAI KEY
OPENAI_KEY=
```

Realize uma cópia do arquivo <i>.env.example</i>, renomeando-o para apenas <i>.env</i>

## Stack Utilizada

- NodeJs
- Typescript
- Prisma ORM
- PostgreSQL
- OpenAi Ai Sdk
- Zod
