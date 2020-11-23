## :memo: Resumo
API REST<br />
Rotas disponíveis na documentação swagger no arquivo `swagger.json` localizado em `.src/swagger.json`<br />
Também estando disponível a partir da rota [/swagger](http://localhost:3333/swagger) pelo navegador.

## Instalação
Use o git [clone](https://git-scm.com/docs/git-clone) para clonar o repositório. Então instale as dependencias com yarn.
```bash
git clone https://github.com/hugoms154/backend-egestor.git
cd backend-egestor

yarn install
```

Inicie o banco de dados executando:
```bash
yarn typeorm migration:run
```
O arquivo será criado no diretório `./src/database/db.sqlite`.

## :arrow_forward: Scripts disponíveis

### database: rodar novas migrations
```bash
yarn typeorm migration:run
```

### database: reveter última migration
```bash
yarn typeorm migration:revert
```

### server: Iniciar servidor
```bash
yarn dev:server
```
### tests: Testes automatizados
```bash
yarn test
```
