let listagemProduto = [];
const divListagem = document.getElementById('listagem');
const listaGenero = document.getElementById('genero');
const listaOrdenacao = document.getElementById('ordem');
const pesquisa = document.getElementById('search');
const btnSearch = document.getElementById('btn-search');

btnSearch.addEventListener('click', () => {
  let textoPesquisa = pesquisa.value;

});

const pesquisaProduto = (textoPesquisa) => {
  divListagem.innerHTML = ''
  listagemProduto.filter((produto) => produto.title.contains(textoPesquisa));
}

listaGenero.addEventListener('change', async (event) => {
  let genero = event.target.value;                                              //capturando o valor do elemento selecionado          
  await buscaProdutos(genero);                                              //Uso do async/wait para garantir o carregamento completo do array
});

listaOrdenacao.addEventListener('change', async (event) => {
  let ordem = event.target.value;
  await ordenacaoPreco(ordem);                                                    //Uso do async /wait para garantir o carregamento completo do array
});


const listaProduto = (srcImagem, descricaoPrduto, precoDoProduto) => { //Criando elementos do DOM
  //Criando elementos
  const infoProduto = document.createElement('div');
  const imagem = document.createElement('img');
  const tituloProduto = document.createElement('h2');
  const precoProduto = document.createElement('div');

  //Adicionando classes
  infoProduto.classList.add('col-md-3'); //Usa o classList.add quando o elemento recebe mais de uma classe
  infoProduto.classList.add('info-produto');
  imagem.classList.add('rounded');
  imagem.classList.add('img_produto');
  imagem.classList.add('img_fluid');
  tituloProduto.className = 'desc_produto'; //Usa o classList.Name quando o elemento recebe apenas uma classe
  precoProduto.className = 'preco_produto';

  //Recebendo os parâmetros
  imagem.src = srcImagem;
  tituloProduto.innerText = descricaoPrduto.slice(0, 37) + '...';
  precoProduto.innerText = Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(precoDoProduto);// Moeda Local

  //Adicionando elementos ao DOM
  infoProduto.appendChild(imagem);
  infoProduto.appendChild(tituloProduto);
  infoProduto.appendChild(precoProduto);
  divListagem.appendChild(infoProduto);
}

const ordenacaoPreco = (ordem) => {
  if ((ordem === 'menor-preco')) {
    listagemProduto.sort((a, b) => a.price - b.price)
  };

  if ((ordem === 'maior-preco')) {
    listagemProduto.sort((a, b) => b.price - a.price)
  };
  preencheListaProdutos();
}

const buscaProdutos = async (genero) => {    //Poupulando o array com info das API
  const listaDeProdutos = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${genero}`);
  const listaDeProdutosJson = await listaDeProdutos.json();
  listagemProduto = listaDeProdutosJson.results;
  preencheListaProdutos();
}

preencheListaProdutos = () => {                   //Percorrrendo o array e inserindo os elementso da API  no DOM
  divListagem.innerHTML = '';
  listagemProduto.forEach((produto) => {
    const { thumbnail, title, price } = produto;
    listaProduto(thumbnail, title, price); //Inserindo informaçõea da API no DOM
  });//ForEach

}

window.onload = () => {
  // window.alert('Oii');
  buscaProdutos('camisa-infantil');
}