export class ListaProdutos {

    constructor(lista=[]) { // constructor() {
        this._produtos = lista // this._produtos = []
    }

    adiciona(produto) {
        this._produtos.push(produto)
    }

    remove(id) {
        this._produtos.splice(id, 1)
    }

    atualiza(id, produtoAtualizada) {
        this._produtos[id] = produtoAtualizada
    }

    // programacao defensiva retornar uma copia do array
    // usando o concat, passando o nosso array como parametro
    get produtos() {
        return [].concat(this._produtos)
    }

}
