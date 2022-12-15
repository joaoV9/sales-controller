import { Produto } from '../models/Produto.js'
import { ListaProdutos } from '../models/ListaProdutos.js'
import { ProdutosView } from '../views/ProdutosView.js'

// import { Mensagem } from '../models/Mensagem.js'
// import { MensagemView } from '../views/MensagemView.js'

import { Modal } from '../models/Modal.js'
import { ModalView } from '../views/ModalView.js'

import { ProdutosRepository } from '../repositories/ProdutosRepository.js'

export class ProdutoController {
    
    // atributos, propriedades
    _inputNome
    _inputPreco
    _inputQuantidade

    // metodos

    // construtor
    constructor () {
        this._inputNome   = document.querySelector('#nome')
        this._inputPreco  = document.querySelector('#preco')
        this._inputQuantidade   = document.querySelector('#quantidade')

        ////////////////////////////////////////////////
        // Repositorio
        this._produtosRepository = new ProdutosRepository()
        //console.log(this._produtoRepository)
        let lista = this._produtosRepository.ler()
        console.log(lista)
        ////////////////////////////////////////////////

        //criar lista de pessoas e view de Pessoas
        this._listaProdutos =  new ListaProdutos(lista)
        this._produtoView  =  new ProdutosView(document.querySelector('#dados'))
        this._produtosView.update(this._listaProdutos)
      
        // mensagem
        //this._mensagem = new Mensagem()
        // this._mensagemView = new MensagemView(document.querySelector('#mensagem'))
        // this._mensagemView.update(this._mensagem)

        // modal
        this._modal = new Modal()
        this._modalView = new ModalView(document.querySelector('#mensagemModal'))
        this._modalView.update(this._modal)

    }

    // adicionar produto
    adiciona(event) {

        event.preventDefault()
        const id = document.querySelector('#idProduto').value

        // se nao tiver id adiciona senao atualiza
        if(!id) {
            console.log('Não tem ID' + id)
            // adiciona novo produto na lista e atualizar a tela
            const produtoAdd = this._criaProduto()
            this._listaProdutos.adiciona(produtoAdd)
            //this._produtosView.update(this._listaProdutos)

            // adicionar no repositorio
            this._produtosRepository.criar(produtoAdd)
            this._produtosView.update(this._listaProdutos)

            // definir e atualizar mensagem
            // this._mensagem.texto = 'Produto cadastrado com sucesso!'
            // this._mensagemView.update(this._mensagem)
            
            // modal
            this._modalView.update(this._modal)


        } else {
            console.log('ID => ' + id)
            this.atualiza(id) // atualiza do controller
        }
        
    }
    
    // criar produto
    _criaPessoa() {
        return new Produto(
            this._inputNome.value,
            this._inputPreco.value,
            this._inputQuantidade.value
        )
    }
    
    // limpar formulario
    _limpaFormulario() {
        this._inputNome.value   = ''
        this._inputPreco.value  = ''
        this._inputQuantidade.value   = ''
    
        this._inputNome.focus()
    }

    preencheFormulario(nome, idade, peso, altura) {
        this._inputNome.value   = nome
        this._inputPreco.value  = idade
        this._inputQuantidade.value   = peso
    }

    apaga(id) {
        console.log('id a ser apagado ' + id)
        if(!id) {
            console.log('ID não foi informado')
            return
        }
        // se tem id pode apagar o registro
        //if(id) {
            console.log('ID ' + id)
            this._listaProdutos.remove(id) // remove da view
            this._produtosView.update(this._listaProdutos) // atualizar a view
        
            this._produtosRepository.apagar(id) // remove do repository
            console.log('ProdutoController Apagou')
        //}
    }

    atualiza(id) {
        // criar novo produto atualizado
        let produtoAtualizada = this._criaProduto()
        console.log(produtoAtualizada)

        // atualizar repositorio
        this._produtosRepository.atualizar(id, produtoAtualizada)
        console.log('Atualizou repositorio')

        // atualizar lista
        this._listaProdutos.atualiza(id, produtoAtualizada)
        console.log('Atualizou lista')

        // atualizar a view
        this._produtosView.update(this._listaProdutos)
        document.querySelector('#idProduto').value = null
    }

    buscaPorId(id) {
        let produtoEncontrada = this._produtosRepository.lerPorId(id)
        return produtoEncontrada
    }

}
