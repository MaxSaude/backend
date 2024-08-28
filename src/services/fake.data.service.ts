import { faker } from '@faker-js/faker';

export function FakeDataService() {

    const empresa = faker.company.name();
    const cnpj = faker.number.int({min : 10000000000000, max: 99999999999999}).toString()
    const username = faker.internet.userName();

    const nome =  faker.person.fullName()
    .replace(/Mr. /g, '0')
    .replace(/Ms. /g, '')
    .replace(/Dr. /g, '')
    .replace(/Mrs. /g, '')
    .replace(/mr. /g, '')
    .replace(/ms. /g, '')
    .replace(/dr. /g, '')
    .replace(/mrs. /g, '')

    const senha = faker.internet.password()
    
    const email = FakeEmail(nome);

    const telefone = FakeTelefone()
    const tipoUser = fakeTipoUser()
    const situacao = fakeSituacao()
    const codigo = fakeCodigo()

    return {empresa, username, codigo, cnpj, nome, telefone, tipoUser, situacao}
}

function FakeEmail(nome: string) {

    const username = nome.replace(/ /g, '.').toLowerCase();

    const empresa = faker.company.name()
    .replace(/ /g, '')
    .replace(/-/g, '')
    .toLowerCase();

    const email = username+`${empresa}.com`

    return email
}

function FakeTelefone() {

    let dd = faker.number.int({min : 10, max: 70}).toString()
    let numero = faker.number.int({min : 10000000, max: 99999999}).toString()

    const telefone = dd + "9" + numero

    return telefone

}

function fakeTipoUser() {

    const randomNumber = Math.random();

    if (randomNumber < 0.1) {
        return "Professor";
    } else {
        return "Aluno";
    }

}

function fakeCodigo() {

    const { v4: uuidv4 } = require('uuid');

    return uuidv4();

}

function fakeSituacao() {

    const randomNumber = Math.random();

    if (randomNumber < 0.1) {
        return false;
    } else {
        return true;
    }

}
