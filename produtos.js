// função para chamar a exibição dos produtos
function mostrarProdutos(){
   
   // faz a requisição dos produtos da api que irá ser listar 12 produtos
    fetch("https://api.mercadolibre.com/sites/MLB/search?q=notebooks&limit=13")
// vai transformar no objeto json que estão alocados os produtos 
.then(resposta => resposta.json())

// aguardando os produtos carregarem, ou seja quando tudo eestiver transformados em json joga o resultado na variavel  produtos
.then(produtos => {
// o looping forEch roda para produto ate terminar 12 produtos.
    produtos.results.forEach(produto => {
        // cria um elemento htmk nesse caso div para armazenar em coluna, criando a coluna para fixar na linha criada no html
        const coluna= document.createElement("div")
/* recurso do boodstrap para auxiliar no grid como são 12 produtos vai criar 4 colunas
 como o grid tem 12 colunas colocando4 vai ficar a divisão 4 colulnas por 3 linhas somando 12 espaços. class list cria  no html uma nova class */
         coluna.classList="col-4     "
 // inserir um elemento no html ou seja inserindo a coluna no html
         // elemento inserido dentro da coluna ou seja produto dentro da coluna
 coluna.innerHTML = `
         <div class="card">

         <img src="${produto.thumbnail}" class="card-img-top" alt= "${produto.title}">

         <div class="card-body">
<h2 class="card-title">${produto.title}</h2>
<p class="card-text"><strong>${produto.price.toLocaleString("pt-BR", {style: "currency", currency:"BRL"})}</strong></p>

</div>
         </div>
         `

         // criando o botao para adicionar o produto no localstorage 
                 const botao = document.createElement("a")
botao.hhref = "#"
botao.classList = "btn btn-promary"
botao.textContent ="Comprar"
botao.setAttribute("aria-label", "clique  para adicionar ao carrinho")
botao.addEventListener("click", e => {
    e.preventDefault()
    adicionarCarrinho( produto.id, {title: produto.title, price: produto.price})
})
coluna.querySelector(".card-body").append(botao)

// cria o elemento na class rowo appdend adiciona no final
         document.querySelector(".produtos .row").append(coluna)
        })
})}
mostrarProdutos()

function adicionarCarrinho(id, produto){

// converte em json o item escolhido pelo usuario e guarda no localestorage
let carrinho = JSON.parse(localStorage.getItem("carrinho")) 

// se o carrinho estiver vazio 
if(carrinho === null){
    carrinho = {}
}


// se adicionar no carrinho um produto comparado com id buscado na api  existente sera adicionado no carrinho
if(carrinho[id] === undefined){
carrinho[id] = produto
localStorage.setItem("carrinho", JSON.stringify(carrinho))
alert("Produto adicionado ao carrinho");
}
}