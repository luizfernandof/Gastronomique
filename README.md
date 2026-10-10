# Gastronomique

## Gestão inteligente de insumos para aulas de Gastronomia

O Gastronomique é uma aplicação web criada para organizar o controle de insumos e apoiar o planejamento das aulas práticas de um curso de Gastronomia.

O projeto nasceu a partir de um problema operacional real: professores precisavam preparar requisições manualmente, a equipe administrativa precisava consolidar planilhas e o estoque era conferido de forma fragmentada. A proposta do sistema é transformar esse processo em um fluxo digital, rastreável e mais confiável.

> Projeto desenvolvido originalmente durante a graduação e preparado como parte do meu portfólio de desenvolvimento full stack.

## O problema

Em uma rotina de aulas práticas, uma única aula pode depender de dezenas de ingredientes, materiais e quantidades específicas. Quando as requisições são feitas em planilhas ou documentos separados, surgem problemas como:

- informações duplicadas ou divergentes;
- dificuldade para consolidar as necessidades de várias aulas;
- pouca visibilidade sobre o estoque disponível;
- risco de compras insuficientes ou desnecessárias;
- retrabalho na separação dos insumos para cada aula.

O Gastronomique foi pensado para centralizar essas informações e criar uma base para automatizar a tomada de decisão do setor responsável.

## O que o sistema oferece

### Já implementado

- autenticação de usuários com JWT;
- cadastro de professores e fluxo de ativação de usuários;
- controle de perfis de acesso;
- cadastro, consulta, edição e exclusão de insumos;
- cadastro, consulta, edição e exclusão de laboratórios;
- cadastro e manutenção de cursos e disciplinas;
- cadastro de pregões, seus insumos, preços e quantidades;
- gestão administrativa de usuários, ativação e perfis;
- criação de aulas e inclusão de insumos com cálculo de valores;
- envio de requisições para revisão, aprovação e devolução;
- seleção de aulas aprovadas por período;
- consolidação dos insumos em listas de compras;
- consulta dos itens de compra e exportação em PDF;
- validação de dados recebidos pela API;
- tratamento padronizado de erros;
- interface Angular com Angular Material;
- separação entre frontend, backend, regras de negócio e persistência.

### Em evolução

O fluxo de requisições e compras foi recuperado da versão acadêmica completa. A evolução prevista para o controle de estoque inclui:

- comparação entre demanda e estoque;
- entrada de mercadorias recebidas;
- separação de insumos por aula;
- baixa automática do estoque;
- histórico de movimentações e reservas de estoque.

Essa separação entre o que já está operacional e o que está planejado mantém o projeto tecnicamente honesto e deixa clara sua evolução natural como produto.

## Arquitetura

```text
gastronomique-front/
└── Angular 14 + Angular Material
    ├── autenticação e sessão
    ├── painéis por perfil
    ├── formulários e validações
    └── consumo de APIs HTTP

gastronomique-api/
└── Spring Boot 2.7 + Java 17
    ├── controllers REST
    ├── services de negócio
    ├── repositories Spring Data JPA
    ├── entidades do domínio
    ├── autenticação JWT
    └── tratamento global de exceções
```

## Stack

### Backend

- Java 17;
- Spring Boot 2.7;
- Spring Web;
- Spring Data JPA e Hibernate;
- Spring Security;
- JWT;
- Bean Validation;
- MySQL;
- Maven.

### Frontend

- Angular 14;
- TypeScript;
- Angular Material;
- RxJS;
- Reactive Forms;
- Karma/Jasmine para testes.

## Segurança

O backend utiliza autenticação stateless com JWT e senhas protegidas com BCrypt. As operações administrativas de criação, edição e exclusão são protegidas por perfil de acesso.

Segredos e credenciais não devem ser versionados. O `.env` é uma configuração local; somente o `.env.example`, sem segredos reais, deve ser publicado. Dependências, builds, logs e dados do banco também ficam fora do versionamento. A aplicação usa variáveis de ambiente para as configurações sensíveis:

```bash
DB_PASSWORD="sua-senha-do-mysql"
JWT_SECRET="uma-chave-base64-gerada-com-openssl"
FRONTEND_URL="http://localhost:4200"
```

Outras variáveis disponíveis:

```bash
DB_URL="jdbc:mysql://localhost/gastronomique?createDatabaseIfNotExist=true&serverTimezone=UTC"
DB_USERNAME="root"
JPA_DDL_AUTO="update"
JPA_SHOW_SQL="false"
JWT_EXPIRATION_MS="86400000"
```

Para uma instalação pública, recomenda-se usar HTTPS, um segredo JWT exclusivo, usuário de banco com permissões limitadas e `JPA_DDL_AUTO=validate` após a criação do schema.

## Como executar localmente

### Pré-requisitos

- Java 17;
- Node.js compatível com Angular 14;
- npm;
- MySQL;
- Git.

### 1. Banco de dados e backend

Crie um banco MySQL ou permita que a URL configurada faça isso automaticamente. Depois, configure as variáveis de ambiente:

```bash
cd gastronomique-api

export DB_USERNAME="root"
export DB_PASSWORD="sua-senha"
export JWT_SECRET="$(openssl rand -base64 64 | tr -d '\n')"
export FRONTEND_URL="http://localhost:4200"

./mvnw spring-boot:run
```

A API será iniciada, por padrão, em `http://localhost:8080`.

### 2. Frontend

Em outro terminal:

```bash
cd gastronomique-front
npm ci
npm start
```

A aplicação será disponibilizada em `http://localhost:4200`.

## Executando com Docker Compose

O repositório também possui uma implantação composta por três containers:

- `db`: MySQL com volume persistente;
- `backend`: API Spring Boot;
- `frontend`: Angular compilado e servido pelo Nginx.

Na primeira instalação, copie o exemplo e preencha os valores. Se já existe um `.env`, preserve-o e atualize apenas as configurações necessárias:

```bash
cp .env.example .env
```

Configuração mínima:

```env
DB_PASSWORD=troque-esta-senha
MYSQL_ROOT_PASSWORD=troque-esta-senha-raiz
JWT_SECRET=cole-a-chave-base64-gerada
FRONTEND_URL=http://localhost:4200
BACKEND_PORT=8080
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=troque-esta-senha
ADMIN_NAME=Administrador
```

Suba o ambiente com:

```bash
docker compose up -d --build
```

O frontend ficará disponível em `http://localhost:4200`. O Nginx encaminha as chamadas da aplicação para o backend, e o backend acessa o banco pelo nome do serviço `db` dentro da rede do Compose.

Gere a chave JWT com `openssl rand -base64 64 | tr -d '\n'`. No LXC, configure `FRONTEND_URL` com a origem usada no navegador (por exemplo, `http://IP_DO_LXC:4200`).

No build de produção, as requisições usam `/backend`. O Nginx remove esse prefixo e encaminha o restante para a API. Assim, rotas de tela como `/admin/listagem/usuarios` e `/aula/itens/1` continuam abrindo corretamente quando a página é recarregada.

Na primeira inicialização, a API cria automaticamente os papéis `ADMIN` e `PROFESSOR`. Se `ADMIN_EMAIL` e `ADMIN_PASSWORD` estiverem definidos, também cria uma conta administrativa ativa. Novos cadastros de professores permanecem inativos até serem aprovados no menu **Admin → Usuários**.

O bootstrap cria a conta apenas se o e-mail ainda não existir; alterar `ADMIN_PASSWORD` no `.env` não redefine a senha de uma conta já cadastrada.

Para acompanhar os logs:

```bash
docker compose logs -f backend frontend
```

Para parar os containers sem remover os dados do banco:

```bash
docker compose down
```

O volume `mysql_data` só deve ser removido quando a perda dos dados for intencional:

```bash
docker compose down -v
```

## Estrutura de domínio

Os principais conceitos do sistema são:

- **Insumo:** produto ou material utilizado nas aulas;
- **Laboratório:** ambiente onde a aula prática acontece;
- **Curso:** formação à qual uma disciplina pertence;
- **Disciplina:** componente curricular relacionado às aulas;
- **Aula:** evento que concentra disciplina, professor, laboratório e data;
- **Item de aula:** insumo e quantidade necessários para uma aula;
- **Pregão:** agrupamento de itens destinado ao processo de compra.

## Qualidade e decisões técnicas

O projeto foi estruturado com responsabilidades separadas para facilitar manutenção e evolução:

- controllers concentram a entrada HTTP;
- services concentram regras de negócio;
- repositories abstraem o acesso ao banco;
- DTOs de autenticação isolam os contratos de login e cadastro;
- validações evitam dados inválidos na entrada;
- tratamento global padroniza respostas de erro;
- configuração por ambiente evita acoplamento a uma máquina específica.

Há testes unitários de JWT, cadastro público de professores e consolidação de listas de compras. Para executá-los sem depender do MySQL:

```bash
cd gastronomique-api
./mvnw -Dtest=JwtUtilsTests,ListaDeCompraServiceTests,UserServiceTests test
```

O Dockerfile da API executa esses testes antes de empacotar a aplicação. O build do frontend usa a configuração de produção. O registro das correções e das verificações já realizadas está em [Recuperação da versão acadêmica](docs/RECUPERACAO.md); os testes de integração ali listados ainda precisam ser concluídos.

## Próximos passos

O próximo ciclo natural do projeto é ampliar o controle de estoque e a cobertura de testes:

1. adicionar saldo e movimentações de estoque;
2. calcular necessidades de compra considerando o saldo disponível;
3. controlar recebimento, separação e baixa;
4. ampliar testes automatizados de integração e regras de negócio.

## Objetivo do portfólio

Mais do que um CRUD acadêmico, o Gastronomique representa uma tentativa de traduzir um processo administrativo real em uma solução de software evolutiva. O projeto demonstra experiência com:

- levantamento e modelagem de domínio;
- desenvolvimento full stack;
- APIs REST;
- autenticação e autorização;
- persistência relacional;
- validação e tratamento de erros;
- organização de código por responsabilidades;
- evolução incremental de um produto a partir de uma necessidade concreta.

## Licença

Este projeto é disponibilizado para fins de portfólio e estudo.
