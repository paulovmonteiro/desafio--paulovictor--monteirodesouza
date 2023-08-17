class CaixaDaLanchonete {
    calcularValorDaCompra(metodoDePagamento, itens) {
        const cardapio = {
            cafe: { descricao: "Café", valor: 3.00 },
            chantily: { descricao: "Chantily (extra do Café)", valor: 1.50 },
            suco: { descricao: "Suco Natural", valor: 6.20 },
            sanduiche: { descricao: "Sanduíche", valor: 6.50 },
            queijo: { descricao: "Queijo (extra do Sanduíche)", valor: 2.00 },
            salgado: { descricao: "Salgado", valor: 7.25 },
            combo1: { descricao: "1 Suco e 1 Sanduíche", valor: 9.50 },
            combo2: { descricao: "1 Café e 1 Sanduíche", valor: 7.50 }
        };

        const extras = {
            chantily: "cafe",
            queijo: "sanduiche"
        };

        let total = 0;

        if (itens.length === 0) return "Não há itens no carrinho de compra!";
        if (!['debito', 'credito', 'dinheiro'].includes(metodoDePagamento)) return "Forma de pagamento inválida!";
        
        for (let item of itens) {
            const [codigo, quantidade] = item.split(',');

            if (!cardapio[codigo]) return "Item inválido!";
            if (!quantidade || Number(quantidade) <= 0) return "Quantidade inválida!";
            if (extras[codigo] && !itens.some(i => i.startsWith(extras[codigo]))) {
                return "Item extra não pode ser pedido sem o principal";
            }

            total += cardapio[codigo].valor * Number(quantidade);
        }

        if (metodoDePagamento === 'dinheiro') {
            total *= 0.95;
        } else if (metodoDePagamento === 'credito') {
            total *= 1.03;
        }

        return `R$ ${total.toFixed(2).replace('.', ',')}`;
    }
}

const caixa = new CaixaDaLanchonete();

// Exemplo 1: Compra de chantily sem café.
console.log(caixa.calcularValorDaCompra('debito', ['chantily,1'])); 
// Saída esperada: "Item extra não pode ser pedido sem o principal"

// Exemplo 2: Compra de café com chantily.
console.log(caixa.calcularValorDaCompra('debito', ['cafe,1','chantily,1'])); 
// Saída esperada: "R$ 4,50"

// Exemplo 3: Compra de combo e dois cafés
console.log(caixa.calcularValorDaCompra('credito', ['combo1,1','cafe,2'])); 
// Saída esperada: "R$ 15,96"

// Exemplo 4: Compra de um item inválido
console.log(caixa.calcularValorDaCompra('credito', ['item_invalido,1'])); 
// Saída esperada: "Item inválido!"

// Exemplo 5: Compra sem itens
console.log(caixa.calcularValorDaCompra('debito', [])); 
// Saída esperada: "Não há itens no carrinho de compra!"

// Exemplo 6: Compra com quantidade inválida
console.log(caixa.calcularValorDaCompra('debito', ['cafe,-1'])); 
// Saída esperada: "Quantidade inválida!"

// Exemplo 7: Compra de item extra sem o principal
console.log(caixa.calcularValorDaCompra('debito', ['chantily,1'])); 
// Saída esperada: "Item extra não pode ser pedido sem o principal"

// Exemplo 8: Forma de pagamento inválida
console.log(caixa.calcularValorDaCompra('paypal', ['cafe,1'])); 
// Saída esperada: "Forma de pagamento inválida!"
 