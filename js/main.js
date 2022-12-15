import { ProdutoController } from './api/controllers/ProdutoController.js'
import { ModalHelper } from './api/helpers/ModalHelper.js'

const produtoController = new ProdutoController()

// CONTROLAR ENVIO DO FORMULARIO E EXIBICAO NA TABELA
const formulario = document.querySelector('#formulario')

// escutador de evento no formulario
formulario.addEventListener('submit', (event) => {
    
    // adicionar produto
    produtoController.adiciona(event)
    
    ModalHelper.ocultarBotoes()
    ModalHelper.modal('Cadastro', 'Produto cadastrado ou atualizado!')
    
    // limpar formulario
    produtoController._limpaFormulario()

})

////// formulario formApagar
const formApagarEditar = document.querySelector('#formApagarEditar')
const btnApagar = document.querySelector('#btnApagar')
const btnEditar = document.querySelector('#btnEditar')

formApagarEditar.addEventListener('submit', (event) => {
    event.preventDefault()
})

btnApagar.addEventListener('click', () => {
    //console.log('Apagar')

    let id = document.querySelector('#id').value
    console.log('Apagar registro ' + id)

    document.querySelector('#id').value = null

    ////// INTERACOES COM A JANELA MODAL //////
    ModalHelper.mostrarBotoes()
    // abrir janela modal - titulo, mensagem
    ModalHelper.modal('Apagar registro', `Deseja apagar o registro ${id} ?`)

    // se cliar no botao sim
    document.querySelector('#sim').addEventListener('click', () => {
        produtoController.apaga(id)
        id = null // apagar o id IMPORTANTE!!!
        ModalHelper.closeModal()
        
    })
    ////// INTERACOES COM A JANELA MODAL //////

})

btnEditar.addEventListener('click', () => {
    //console.log('Editar')

    // rolar pagina para cima
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    })

    document.querySelector('#nome').focus()

    let id = document.querySelector('#id').value
    console.log('Editar registro ' + id)

    document.querySelector('#idProduto').value = id
    document.querySelector('#id').value = null

    let produto = produtoController.buscaPorId(id)
    //console.log(produto)

    if(produto) {
        let { _nome, _preco, _quantidade } = produto
        // preencher o formulario com os dados
        pessoaController.preencheFormulario(_nome, _preco, _quantidade)
    }

})

////// formulario formApagar

ModalHelper.fecharJanela()
