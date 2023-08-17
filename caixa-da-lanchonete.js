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

export { CaixaDaLanchonete };

 