API_URL = 'https://erickgym-gwwo.onrender.com/api/exercicios'

function main(){
  
  carregarExerciciosAPI()
}

async function carregarExerciciosAPI(){
  // Fazer chamada API (GET /api/exercicios)
  // URL: http://127.0.0.1:8000/api/exercicios
  const response = await fetch(API_URL)
  if (response.status === 200){
    // mostrar os exercicios na html (DOM)
    const exercicios = await response.json()
    for (let exercicio of exercicios){
      // criar e pendurar um item em ol
      adicionarItemNaLista(exercicio)
    }
  }else{
    alert('Requisição deu problema!')
  }
}


async function salvarClick(event){
  event.preventDefault()
  const cx_nome = document.getElementById('cx-nome')
  const cx_descricao = document.getElementById('cx-descricao')
  const nome = cx_nome.value
  const descricao = cx_descricao.value

  const dados = {nome, descricao}

  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dados)
  }

  const response = await fetch(API_URL, config)
  
  if (response.status === 201){
    const exercicio = await response.json()
    adicionarItemNaLista(exercicio)
    alert('Exercício cadastrado com sucesso!')
  }else{
    alert('Error ao cadastrar exercício!')
  }
  

  cx_nome.value = ''
  cx_nome.focus()
}


function adicionarItemNaLista(exercicio){
  const lista = document.getElementById('lst-exercicios')
  const item = document.createElement('li')
  item.innerText = `${exercicio.nome} (${exercicio.descricao})`
  lista.appendChild(item)
}

const btn_cadastrar = document.getElementById('btn-cadastrar')

btn_cadastrar.onclick = salvarClick



// salvarClick()
main()