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
      resolve(pessoas.body.find(p => p.id === id))
    })
  },
  Post: function (data) {
    return new Promise((resolve, reject) => {
      var pessoas = getListaPessoas()
      const maxId = pessoas.body.reduce(
        (max, item) => (item.id > max ? item.id : max),
        pessoas.body[0].id
      );
      
      const newData = {
        ...data,
        id: maxId + 1
      }

      pessoas.body.push(newData);
      setListaPessoas(pessoas)
      resolve(pessoas)
    })
  },
  Put: function (id, data) {
    return new Promise((resolve, reject) => {
      var pessoas = getListaPessoas()
      const pessoaIndex = pessoas.body.findIndex(pessoa => pessoa.id === id);
      
      pessoas.body[pessoaIndex] = data;

      setListaPessoas(pessoas)
      resolve(data)
    })
  },
  Delete: function (id) {
    return new Promise((resolve, reject) => {
      var pessoas = getListaPessoas()
      const index = pessoas.body.findIndex(pessoa => pessoa.id === id);

      if(index >= 0) {
        pessoas.body.splice(index, 1);
      } else {
        return
      }

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
  return {
    headers: [
      {
        text: 'Id',
        align: 'start',
        sortable: false,
        value: 'id',
      },
      {
        text: 'Nome',
        align: 'start',
        sortable: false,
        value: 'name',
      },
      {
        text: 'Idade',
        align: 'start',
        sortable: false,
        value: 'age',
      },
      {
        text: 'E-mail',
        align: 'start',
        sortable: false,
        value: 'email',
      },
      {
        text: 'Telefone',
        align: 'start',
        sortable: false,
        value: 'phone',
      },
      {
        text: 'Cidade',
        align: 'start',
        sortable: false,
        value: 'city',
      },
      { text: "Editar", value: "edit", sortable: false, filterable: false },
      { text: "Excluir", value: "delete", sortable: false, filterable: false },
    ],

    body: [
      { id: 1, name: 'Maria Lúcia Santana', age: 20, email: 'maria.lucia@gmail.com', phone: '(47)34850-8287', city: 'Joinville' },
      { id: 2, name: 'Paulo Agusto da Silva', age: 30, email: 'paulo.augusto@yahoo.com', phone: '(11) 26492-8474', city: 'Jundiaí' },
      { id: 3, name: 'Maria Joaquina da Costa', age: 25, email: 'maria.joaquina@gmail.com', phone: '(83) 42069-5692', city: 'Sorocaba' },
      { id: 4, name: 'Júlia Andrade Aquino', age: 32, email: 'julia.andrade@hotmail.com', phone: '(47)34850-8287', city: 'Itajaí' },
      { id: 5, name: 'Matheus Cardoso Faria', age: 45, email: 'matheus.cardoso@yahoo.com', phone: '(31) 26441-2187', city: 'Joinville' },
      { id: 6, name: 'Otávio Andrade', age: 32, email: 'otavio.andrade@gmail.com', phone: '(51) 78144-1699', city: 'Chapecó' },
      { id: 7, name: 'Pedro José Vidal', age: 43, email: 'pedro.jose@hotmail.com', phone: '(95) 23511-8084', city: 'Joinville' },
      { id: 8, name: 'Maria Luiza Pereira', age: 12, email: 'maria.luiza@hotmail.com', phone: '(84) 69919-3869', city: 'Maringá' },
      { id: 9, name: 'Vinicius dos Santos', age: 32, email: 'vinicius.santos@hotmail.com', phone: '(79) 36607-8646', city: 'Joinville' },
      { id: 10, name: 'Flávia Regina Pedrosa', age: 34, email: 'flavia.regina@yahoo.com', phone: '(83) 32878-5703', city: 'Rio de Janeiro' }
    ]
  }
}
