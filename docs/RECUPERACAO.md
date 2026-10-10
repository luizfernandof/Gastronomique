# Recuperação da versão acadêmica

A cópia recuperada trouxe os módulos de usuários, cursos e disciplinas, aulas e itens,
pregões, revisão de requisições e listas de compras com exportação em PDF.
Os imports e templates do Angular estavam presentes. A infraestrutura Docker havia sido perdida.

## Correções aplicadas

- Dockerfiles multi-stage, `.dockerignore`, Nginx e exemplo de configuração `.env`.
- URL da API por ambiente em todos os serviços; prefixo `/backend` no Nginx sem conflito com rotas de tela.
- Configuração externa do MySQL, JWT, CORS e criação inicial de administrador.
- Compatibilidade JJWT/Java 17, papéis iniciais e cadastro público limitado a professores.
- Restrição de endpoints administrativos; hashes de senha omitidos das respostas JSON.
- Bloqueio de acesso com JWT de usuário desativado.
- Registro do diálogo de confirmação utilizado na gestão de usuários e aulas.
- Atualizações pelo ID da URL, salvamento do item de pregão alterado e correção de preço/valor total dos itens de aula.
- Paginação dos insumos pelo servidor, sem paginar duas vezes o mesmo resultado.
- Consolidação por valor do ID, deduplicação de aulas e rejeição de seleções inválidas.
- Transações para atualização dos itens e geração de listas de compras.
- Logotipo do PDF carregado do classpath, disponível também no JAR Docker.

## Validação realizada

- Compilação Angular de produção: passou.
- Verificação de imports e templates ausentes: nenhum encontrado.
- Configuração Docker Compose: validada.
- Testes Java adicionados para JWT, cadastro público e consolidação de compras.

**Limitação da validação:** os testes Java e a reconstrução dos containers não foram
executados pelo agente durante a recuperação, pois seu ambiente de execução não
disponibilizava Java e bloqueava o Docker daemon. Posteriormente, a saída do terminal
do responsável confirmou frontend e backend ativos e MySQL saudável. Isso confirma
a execução dos containers, mas não substitui a validação de ponta a ponta abaixo.

O Dockerfile da API executa os testes sem banco antes de empacotar:

```bash
./mvnw -Dtest=JwtUtilsTests,ListaDeCompraServiceTests,UserServiceTests test
```

## Aplicar no ambiente

Preserve o `.env` e o volume existente do MySQL. Recrie as imagens e containers:

```bash
docker compose up -d --build --force-recreate
docker compose ps
docker compose logs --tail=100 backend frontend
```

Recarregue a aplicação com `Ctrl+Shift+R`.

## Testes de integração pendentes

1. Entrar como administrador usando o e-mail e a senha configurados.
2. Cadastrar professor, ativá-lo em **Admin → Usuários** e testar seu login.
3. Cadastrar curso, disciplina, laboratório, pregão e insumo com preço no pregão.
4. Criar aula, adicionar e editar itens, verificando o valor total.
5. Enviar a aula para revisão; aprovar ou devolver pelo administrador.
6. Buscar aulas aprovadas por período e gerar a lista de compras.
7. Conferir as quantidades consolidadas e baixar o PDF.
8. Atualizar diretamente as páginas administrativas e os itens de uma aula.
9. Cadastrar mais de cinco insumos e verificar troca de página e tamanho da listagem.

## Históricos recuperados

O backup também continha repositórios Git internos apontando para a organização antiga.
Eles foram separados da árvore do projeto para permitir recuperação local,
mantendo o repositório atual na raiz como única referência do projeto. Esses backups
não fazem parte do conteúdo publicado.

O `.env` ainda aparece como rastreado pelo Git atual. Antes de publicar, retire-o do índice
sem apagar o arquivo local:

```bash
git rm --cached .env
```

O `.gitignore` evita que novos arquivos de segredo sejam adicionados.

Retirar o `.env` do índice não remove suas versões dos commits anteriores. Credenciais
que já tenham sido publicadas devem ser substituídas. A limpeza do histórico, se
necessária, é uma operação separada e não foi realizada nesta recuperação.
