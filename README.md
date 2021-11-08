# Linkapi Test
Nesse teste tive que criar uma APIRestful para integrar dois serviços: Pipedrive e Bling.
Sua integração deveria ser de modo a quando houver um mudança de **status** em uma Deal no Pipedrive para **'won'**, a mesma deveria ser salva no Bling, e em um banco de dados agrupando-as por data e valor.



## Overview
Para isso eu fiz uma API em Node utilizando Express como framework Web,  Cron para o agendamento de tasks, Docker para a criação do ambiente, além de mongo com o driver nativo para salvar os dados.

### Funcionamento
A API mantem salvos no banco dois tipos de dados, os Deals e os DailyDeals. E conforme a mesma está rodando, uma task é  agendada (A cada **45** segundos), para realizar uma busca na api do Pipedrive por deals com status 'won'.
Com a lista, a API checa se os mesmos já foram inseridos e os salva no banco além de envia-los para o Bling.

Para pegar os resultados do dia (DailyDeals), o usuário pode fazer uma requisição para listar os dados já salvos
```
localhost:3010/api/deals/list
```
Porem tal listagem pode estar defasada, já que a atualização é feita de 45 em 45 segundos. Para forçar a atualização dos dados da API, pode ser usada a rota
```java
localhost:3010/api/deals/forcedlist

// ou

localhost:3010/api/deals/refresh
// E Depois
localhost:3010/api/deals/list
```

  

## Instalação
### Variaveis de ambiente
No projeto tem um .env.model descrevendo as variaveis de ambiente necessárias mas em resumo
```bash
# Url do banco hospedado no Atlas
MONGO_URL =

# Token gerado no pipedrive
PIPEDRIVE_TOKEN = 

# Token para um usuário X com autorização de inserção de pedido
BLING_TOKEN = 
```
Além disso é necessário de um cadastro na plataforma Bling de um produto com código 001

### Sem Docker
```bash
# Para a instalação dos pacotes
npm install

# Para a execução
npm run build
npm run start
```
  

### Com Docker e Docker-Compose
```bash
npm run up
```

## Rotas

  
  

## Arquitetura
A arquitetura da API foi segundo os padrões do Clean Architecture, com certas adaptações para a falicitar o uso, como a adição de tasks na camada de Infra.

## Execução

### Primeira execução do list

Enquanto a task de atualização não for executada, nossa API está vazia

O retorno do request

<img src="https://github.com/LucasGobbs/linkapi_test/blob/master/images/request_vazio.png"  width="700" height="350">

O banco

<img src="https://github.com/LucasGobbs/linkapi_test/blob/master/images/dailydeals_db_vazio.png"  width="700" height="350">

O Bling

<img src="https://github.com/LucasGobbs/linkapi_test/blob/master/images/bling_vazio.png"  width="700" height="350">


### Após a execução da Task de atualização são adicionados os Deals retornados do Pipefy




O retorno do request

<img src="https://github.com/LucasGobbs/linkapi_test/blob/master/images/request_populado.png"  width="700" height="350">

O banco

<img src="https://github.com/LucasGobbs/linkapi_test/blob/master/images/banco_populado.png"  width="700" height="350">

O Bling

<img src="https://github.com/LucasGobbs/linkapi_test/blob/master/images/bling_populado.png"  width="700" height="350">
