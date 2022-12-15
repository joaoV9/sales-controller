export class Produto {

    // atributos = variáveis ou características
    _nome   // tipo String
    _preco  // tipo Float ou Real
    _quantidade   // tipo Float ou Real
    _total// tipo Float ou Real

    static totalProdutos = 0 // atributo estático ou da class

    // metodos = funcoes ou comportamentos

    // método construtor
    constructor (nome, preco, quantidade) {
        
        this._nome = nome
        this._preco = preco
        this._quantidade = quantidade
        this._total = this.calculaTotal()
        Produto.totalProdutos += 1 // contador com incremento
    }

    // set total
    calculaTotal() {
        return (this.preco * this.quantidade).toFixed(2) // set
    }

    // get = pegar
    get nome() {
        return this._nome
    }

    get preco() {
        return this._preco
    }

    get quantidade() {
        return this._quantidade
    }

    get totalProdutos() {
        return Produto.totalProdutos
    }

    // set = configurar, editar, alterar
    set nome(novoNome) {
        this._nome = novoNome
    }

    set preco(novaPreco) {
        this._preco = novaPreco
    }

    set quantidade(novoQuantidade) {
        this._quantidade = novoQuantidade
    }

} // fim da class Produto
