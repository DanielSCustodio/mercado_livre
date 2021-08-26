const divListagem = document.getElementById('listagem');
const listaGenero = document.getElementById('genero');

const listaProduto = (srcImagem, descricaoPrduto, precoProduto) => {
  const infoProduto = document.createElement('div');
  const imagem = document.createElement('img');
  const tituloProduto = document.createElement('h2');
  const precoProduto = document.createElement('div');
  infoProduto.classList.add('col-md-3');
  infoProduto.classList.add('info');


  imagem.classList.add('rounded');
  imagem.classList.add('img_produto');
  imagem.classList.add('img_fluid');
  imagem.src = srcImagem;

  tituloProduto.className = 'desc_produto';
  tituloProduto.innerText = descricaoPrduto.slice(0, 37) + '...';
  precoProduto.className = 'preco_produto';
}

const buscaProdutos = async (genero) => {
  const listaDeProdutos = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${genero}`);
  const listaDeProdutosJson = await listaDeProdutos.json();
  listaDeProdutosJson.forEach((produto) => {
    listaDeProdutos(produto.thumbnail, produto.title, produto.price);
  });
}

window.onload = () => {
  buscaProdutos('camisa-infantil');
}