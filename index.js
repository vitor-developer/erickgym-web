const API_URL = 'https://erickgym-6822.onrender.com/api/exercicios';

async function salvar_exercicio(e){
  e.preventDefault();
  const cx_nome = document.getElementById('cx-nome');
  const cx_descricao = document.getElementById('cx-descricao');
  const nome = cx_nome.value;
  const descricao = cx_descricao.value;

  const dados = {nome, descricao};

  const init = {
    method: 'POST',
    body: JSON.stringify(dados),
    headers: {
      "Content-Type": "application/json"
    }
  };

  const response = await fetch(API_URL, init);

  if (response.status === 201){
    alert('Exercício Cadastrado!');
    cx_nome.value = '';
    cx_nome.focus();
    const exercicio = await response.json();
    adicionar_exercicio_na_lista(exercicio);
  } else {
    alert('Erro ao salvar na API!');
    console.log(response);
  }
}

async function carregar_exercicios(){
  console.log('Carregando da API....');
  const response = await fetch(API_URL);
  const exercicios = await response.json();
  for (exercicio of exercicios){
    adicionar_exercicio_na_lista(exercicio);
  }
}

function adicionar_exercicio_na_lista(exercicio){
  const lst_exercicios = document.getElementById('lista-exercicio');
  const item = document.createElement('li');
  item.innerText = exercicio.nome;
  lst_exercicios.appendChild(item);
}