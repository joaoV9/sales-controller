import { View } from '..views/View.js'

export class ProdutosView extends View {

    constructor(elemento) {
        super(elemento)
    }

    template(model) {
        return `
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th> <th>Preço</th> <th>Quantidade</th>
                    </tr>
                </thead>
                <tbody>
                    ${model.produtos.map((produto, indice) => {
                    return `
                        <tr>
                            <td>
                                ${indice}
                            </td>
                            <td>${produto._nome}</td>
                            <td>${produto._preco}</td>
                            <td>${produto._quantidade}</td>
                        </tr>
                    `
                }).join('')}
                </tbody>
            </table>
        `
    }

    // nao precisa do metodo update aqui pq vc herda da super class
}
