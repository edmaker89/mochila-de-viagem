const form = document.getElementById('novoItem');
const lista = document.getElementById("lista")

//invés de criar um array vazio, vamos criar ele com os itens do localStorage
// js aceita esse tipo de criação de constantes com o pipe
// como o localStorage armazena string, para a gente tralhar com esses elementos precisamos transformar em JSON com JSON.parse()
const itens = JSON.parse(localStorage.getItem("itens")) || []


//a variavel pegou os dados do localStorage agora precisa iterar sobre ela
itens.forEach( (elemento) => {
    criaElemento(elemento)
})

form.addEventListener("submit", (evento) => {
    //necessario interromper o comportamento, nesse caso de enviar tipo get
    evento.preventDefault()
    
    //o target tem um component elements que nos ajuda a buscar os dados
    // dentro de desse objeto sem ter que passar numero de indice
    // nome do input
    // console.log(evento.target.elements['nome'].value);
    // console.log(evento.target.elements['quantidade'].value);

    //uma das formas de buscar os elementos, mas não é a melhor pois é fixa
    // console.log(evento.target[0].value)
    // console.log(evento.target[1].value)
    const nome = evento.target.elements['nome']
    const quantidade = evento.target.elements['quantidade']

     // preparando para armazenar um json no localstorage
    // 1 - Criar o Objeto no formato
    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    //vai receber o Objeto pronto
    criaElemento(itemAtual)

    //2 - colocar o objeto em um array => itens = [{"nome": nome, "quantidade": quantidade }, {"nome": nome, "quantidade": quantidade }]
    itens.push(itemAtual)
    //3 - agora que ja esta no formato, transformar o json em string armazenar no localStorage
    localStorage.setItem("itens", JSON.stringify(itens))

    // localStorage ideal para salvar conteudos de interface, não utilizar para dados sensiveis LGPD

    // limpa os inputs
    nome.value = "" 
    quantidade.value = ""

})

function criaElemento(item) {

    // precisa criar um elemento igual a esse
    //<li class="item"><strong>3</strong>Meia</li>
    const novoItem = document.createElement('li')
    novoItem.classList.add("item")
    
    const numeroItem = document.createElement('strong')
    numeroItem.innerHTML = item.quantidade

    // para inserir um elemento dentro do outro deve-se usar appendChild()
    // pq esse é um Objecto html
    // novoItem = <li> .appendChild -> coloca a numeroItem.innerHTML = <strong>
    novoItem.appendChild(numeroItem)

    // coloca o texto do input nome no innerhtml que vai depois da tag Strong
    novoItem.innerHTML += item.nome

    // coloca o item da lista feita, dentro da lista
    lista.appendChild(novoItem)


   
}
