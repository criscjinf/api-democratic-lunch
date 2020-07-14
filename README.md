# api-democratic-lunch
>> Api responsavel por registrar funcionários, resaurantes, registrar os votos, iniciar e finalizar votações
## Instalar dependências
```
npm install
```

### Rodar em ambiente de desenvolvimento
```
npm dev
```

### Rodar em ambiente de produção
```
npm start
```

### Para rodar testes unitários
```
npm test
```


## Endpoints:
 ### /restaurants:
    Methods: 
        - POST
            {
                "name": "string",
                "address": "string",
                "phone": "string"
            }
        - PUT/:id
            {
                "name": "string",
                "address": "string",
                "phone": "string"
            }
        - GET
            Permite filtrar pelos campos informados no POST
        - DELETE/:id 
            Remove um restaurante com id específico
        - DELETE
            Utilizado para limpar os dados durante
            testes de integração com Delphi
 ### /employees
    Methods: 
        - POST
            {
                "name": "string",
                "cpf": "string",
                "email": "string"
            }
        - PUT/:id
            {
                "name": "string",
                "cpf": "string",
                "email": "string"
            }
        - GET
            Permite filtrar pelos campos informados no POST
        - DELETE /:id
            Remove um funcionário com id específico
        - DELETE
            Utilizado para limpar os dados durante 
            testes de integração com Delphi

 ### /votings

     Methods: 
        - POST /:idvoting/vote
            {
                "restaurant_id": "string",
                "employer_id": "string"
            }
        - POST /currentvoting
            Retorna a votação que estiver ativa,
            caso nenhuma esteja ativa, não retorna nada

         - POST /currentvoting
            Retorna a votação que estiver ativa,
            caso nenhuma esteja ativa, não retorna nada

         - POST /endvoting
            Retorna a votação que estiver ativa,
            caso nenhuma esteja ativa, não retorna nada

        - GET 
            Trás a lista de todas as votaçoes ocorridas e não utiliza filtros
        - DELETE
            Utilizado para limpar os dados durante 
            testes de integração com Delphi





Observações:

>>Não implementado Path pois a biblioteca indy do delphi não suporta.<br><br>
>> Para não ter a implementaçao de banco de dados e permitir a simulação de uma api, permitindo gravar dados, implementei um sistema de classes que persistem os dados na memória enquanto a api estiver ativa.<br>
>>Em um projeto padrão teria feito com sequelize gerando os migrates do banco.<br>
>> Também poderia ter implementado utilizando Sqlite, mas achei interessante criar a estrutura de classes.

## Sobre os objetos de retorno da API
Alguns possuem um array chamado "lockedProperties" que utilizei apenas para não permitir que usuário externo altere as propriedades listadas ali (tipo campo virtual), com mais tempo teria tratado os objetos para não retornarem esta propriedade

## Vale destacar
| Caminho do arquivo | Destaque |
| - | - |
| src/classes/objecBase.js | Criada para permitir bloquear a alteração nos campos que forem inseridos na lista "lockedProperties" e permitir utilizar filtros e atualizar propriedades de forma dinâmica |
| repositories/votings.js | A classe "votings" aqui foi implementada com paterns Singleton somente para critério de exemplificação, podendo ter sido ao invés disto apenas uma extenciom da objectlist |
| __tests__/factories.js | Desenvolvida para fins de testes a classe factory baseado no paterns de mesmo nome, gerando instancias de objetos. |

# Observações finais
> O projeto em Delphi não contempla os cadastros de restaurantes, sendo registrados automaticamente alguns dados Fake.