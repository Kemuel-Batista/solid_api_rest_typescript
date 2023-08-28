/**
 * DTO -> Data Transfer Object
 * Quando iremos transferir um objeto de uma camada para outra, utilizamos DTO
 * Ou seja, dentro do controller estamos na camada de infraestrutura, 
 * Camada externa, camada que faz conexão com algum protocolo ex: (HTTP)
 * Ai mudamos para uma camada interna (domínio) nisso precisamos ter um
 * formato que será transferido entre uma camada ou outra
*/
export interface ICreateUserRequestDTO {
    name: string;
    email: string;
    password: string;
}