const divListagem = document.getElementById('listagem');
const listaGenero = document.getElementById('genero');

const listaProduto = (srcImagem, descricaoPrduto, precoDoProduto) => {
  const infoProduto = document.createElement('div');
  const imagem = document.createElement('img');
  const tituloProduto = document.createElement('h2');
  const precoProduto = document.createElement('div');

  infoProduto.classList.add('col-md-3'); //Usa o classList.add quando o elemento recebe mais de uma classe
  infoProduto.classList.add('info');
  imagem.classList.add('rounded');
  imagem.classList.add('img_produto');
  imagem.classList.add('img_fluid');
  tituloProduto.className = 'desc_produto'; //Usa o classList.Name quando o elemento recebe apenas uma classe
  precoProduto.className = 'preco_produto';

  //Recebendo os parâmetros
  imagem.src = srcImagem;
  tituloProduto.innerText = descricaoPrduto.slice(0, 37) + '...';
  precoProduto.innerText = precoDoProduto;

  infoProduto.appendChild(imagem);
  infoProduto.appendChild(tituloProduto);
  infoProduto.appendChild(precoProduto);
  divListagem.appendChild(infoProduto);
}

const buscaProdutos = async (genero) => {
  const listaDeProdutos = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${genero}`);
  const listaDeProdutosJson = await listaDeProdutos.json();

}

window.onload = () => {
  // window.alert('Oii');
  buscaProdutos('camisa-infantil');
  listaProduto('https://http2.mlstatic.com/D_816181-MLB43115411443_082020-O.jpg', 'Camisa Floral', '125');
}