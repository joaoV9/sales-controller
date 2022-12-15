export class ProdutosRepository {

    _getLocalStorage
    _setLocalStorage

    constructor() {
        this._getLocalStorage = () => JSON.parse(localStorage.getItem('db')) ?? []
        this._setLocalStorage = (db) => localStorage.setItem("db", JSON.stringify(db))
        //console.log('Local Storage')
    }

    // CRUD - create read update delete

    // create = criar
    criar(produto) {
        let dbProduto = this._getLocalStorage()

        dbProduto.push(produto)
        this._setLocalStorage(dbProduto)
    }

    // read = ler
    ler() {
        return this._getLocalStorage()
    }

    // update = atualizar, editar
    atualizar(id, produtoAtualizada) {
        let dbProduto = this.ler()

        dbProduto[id] = produtoAtualizada
        this._setLocalStorage(dbProduto)
    }

    // delete
    apagar(id) {
        let dbProduto = this.ler()

        dbProduto.splice(id, 1)
        this._setLocalStorage(dbProduto)
    }

    // ler por id
    lerPorId(id) {
        const dbProduto = this.ler()
        return dbProduto[id]
    }

}
