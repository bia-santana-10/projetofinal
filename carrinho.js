// criar a funçao para mostrar o carrinho
function mostrarCarrinho() {
        let total= 0;
        // limpar a tabela e os detalhes do produtopara deixar vazio e iniciar a contagem a partir de 0
        document.querySelector("tbody").innerHTML = "";
              document.querySelector(".detalhes").innerHTML = "";
             
             // pegando os produtos do localestoragem convertendo para um objeto js
              const carrinho= JSON.parse(localStorage.getItem("carrinho"));
// verificando se o  carrinho esta vazio
if(carrinho !== null) {
        for(id in carrinho) {
                const produto = carrinho[id];
                        const tr = document.createElement("tr");
       tr.innerHTML = `
       <td>${produto.title}</td>
      <td>${produto.price.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})}</td>
      <td class="acao"></td>

       `;

       // botao para remover produto
       const btnRemover = document.createElement("button")
       // complemento de classe danger que deixa o botao com fundo vermelho e letra branca
       btnRemover.classList = "btn btn-danger";
       btnRemover.textContent ="remover do carrinho";
       btnRemover.addEventListener("click", () => removerCarrinho(id));
       tr.querySelector(".acao").append(btnRemover);
       total += produto.price;
       document.querySelector("tbody").append(tr);


                }
                if(total >0) {
                document.querySelector(".detalhes").innerHTML = `
                <h2> Detalhes do pedido </h2>
               <p>
               <!-- converter o total para real brasileiro -->
                total: ${total.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})} </p>
               
                `;
        const btnEncerrar = document.createElement("button");
        btnEncerrar.textContent = "Encerrar Compra";
        btnEncerrar.addEventListener("click", () => encerrar());
        document.querySelector(".detalhes").append(btnEncerrar);
                }
                
}

        }
        function encerrar() {
                localStorage.clear();
                alert("Obrigada pela confiança em adquir conosco!");
                mostrarCarrinho();

        }
        function removerCarrinho(id) {
                let carrinho = JSON.parse(localStorage.getItem("carrinho"));
                delete carrinho[id];
                
                // get pega o valor e set salva
                localStorage.setItem("carrinho", JSON.stringify(carrinho));
                alert("Produto removido");
                mostrarCarrinho();

        }
        mostrarCarrinho();
