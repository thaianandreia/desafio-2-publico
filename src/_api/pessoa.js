export default {
  GetAll: function () {
    return new Promise((resolve, reject) => {
      var pessoas = getListaPessoas()
      resolve(pessoas)
    })
  },
  GetById: function (id) {
    return new Promise((resolve, reject) => {
      var pessoas = getListaPessoas()
      resolve(pessoas.find(p => p.id === id))
    })
  },
  Post: function (data) {
    return new Promise((resolve, reject) => {
      var pessoas = getListaPessoas()
      // Insira aqui o seu código: adicionar item na lista

      setListaPessoas(pessoas)
      resolve(data)
    })
  },
  Put: function (id, data) {
    return new Promise((resolve, reject) => {
      var pessoas = getListaPessoas()
      // Insira aqui o seu código: encontre o item na lista e o altere
      setListaPessoas(pessoas)
      resolve(data)
    })
  },
  Delete: function (id) {
    return new Promise((resolve, reject) => {
      var pessoas = getListaPessoas()
      // Insira aqui o seu código: exclua o item da lista

      setListaPessoas(pessoas)
      resolve(id)
    })
  },
  ReiniciarLista: function () {
    localStorage.setItem('pessoas', JSON.stringify(carregaPessoas()))
  },
}

// Métodos internos
function getListaPessoas () {
  var pessoas = []
  try {
    if (localStorage.pessoas) { pessoas = JSON.parse(localStorage.pessoas) } else pessoas = carregaPessoas()
  } catch {
    localStorage.setItem('pessoas', JSON.stringify(carregaPessoas()))
  }

  return pessoas
}
function setListaPessoas (pessoas) {
  try {
    localStorage.setItem('pessoas', JSON.stringify(pessoas))
  } catch {
  }
}
function carregaPessoas () {
  return [
    { id: 1, nome: 'Maria Lúcia Santana', idade: 20, email: 'maria.lucia@gmail.com', telefone: '(47)34850-8287', cidade: 'Joinville' },
    { id: 2, nome: 'Paulo Agusto da Silva', idade: 30, email: 'paulo.augusto@yahoo.com', telefone: '(11) 26492-8474', cidade: 'Jundiaí' },
    { id: 3, nome: 'Maria Joaquina da Costa', idade: 25, email: 'maria.joaquina@gmail.com', telefone: '(83) 42069-5692', cidade: 'Sorocaba' },
    { id: 4, nome: 'Júlia Andrade Aquino', idade: 32, email: 'julia.andrade@hotmail.com', telefone: '(47)34850-8287', cidade: 'Itajaí' },
    { id: 5, nome: 'Matheus Cardoso Faria', idade: 45, email: 'matheus.cardoso@yahoo.com', telefone: '(31) 26441-2187', cidade: 'Joinville' },
    { id: 6, nome: 'Otávio Andrade', idade: 32, email: 'otavio.andrade@gmail.com', telefone: '(51) 78144-1699', cidade: 'Chapecó' },
    { id: 7, nome: 'Pedro José Vidal', idade: 43, email: 'pedro.jose@hotmail.com', telefone: '(95) 23511-8084', cidade: 'Joinville' },
    { id: 8, nome: 'Maria Luiza Pereira', idade: 12, email: 'maria.luiza@hotmail.com', telefone: '(84) 69919-3869', cidade: 'Maringá' },
    { id: 9, nome: 'Vinicius dos Santos', idade: 32, email: 'vinicius.santos@hotmail.com', telefone: '(79) 36607-8646', cidade: 'Joinville' },
    { id: 10, nome: 'Flávia Regina Pedrosa', idade: 34, email: 'flavia.regina@yahoo.com', telefone: '(83) 32878-5703', cidade: 'Rio de Janeiro' }
  ]
}
