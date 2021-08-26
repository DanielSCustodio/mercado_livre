const divListagem = document.getElementById('listagem');
const listaGenero = document.getElementById('genero');

listaGenero.addEventListener('change', async (event) => {
  let genero = event.target.value;                                              //capturando o valor do elemento selecionado          
  await buscaProdutos(genero);                                              //Busca produto é assincrona, necessita do async/await
});

const listaProduto = (srcImagem, descricaoPrduto, precoDoProduto) => {
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

const buscaProdutos = async (genero) => {
  divListagem.innerHTML = '';
  const listaDeProdutos = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${genero}`);
  const listaDeProdutosJson = await listaDeProdutos.json();
  const DadosProduto = listaDeProdutosJson.results;
  DadosProduto.forEach((produto) => {
    const { thumbnail, title, price } = produto;
    listaProduto(thumbnail, title, price); //Inserindo informaçõea da API no DOM
  });//ForEach

}

window.onload = () => {
  // window.alert('Oii');
  buscaProdutos('camisa-infantil');
}