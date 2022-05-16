<template>
  <div>
     <v-btn
      color="primary"
      elevation="2"
      @click.stop="abrirModalPessoa">
      NOVA PESSOA
    </v-btn>

    <v-data-table
      :headers="pessoas.headers"
      :items="pessoas.body"
      :items-per-page="5"
      class="elevation-1"
    >
      <template v-slot:[`item.edit`]="{ item }">
        <v-btn depressed color="primary" @click="abrirModalPessoa(item)">
          Editar
        </v-btn>
      </template>
      <template v-slot:[`item.delete`]="{ item }">
        <v-btn depressed color="error" @click="excluirUsuario(item)">
          Excluir
        </v-btn>
      </template>
    
    </v-data-table>

    <pessoa-modal 
      v-model="mostrarModal"
      :usuarioSelecionado="usuarioSelecionado"
      :regras="rules"
      :edicao="edicao"
      @cadastrar="cadastrar"
      @editar="editar"
    >
    </pessoa-modal>
    <pessoa-modal-exclusao
      v-model="modalExclusao"
      :usuarioId="usuarioSelecionado.id"
      @confirmaExclusao="confirmaExclusao"
    ></pessoa-modal-exclusao>


    <v-snackbar
      v-model="snackbar"
      :vertical="vertical"
    >
      {{ mensagem }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="indigo"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Fechar
        </v-btn>
      </template>
    </v-snackbar>

  </div>
</template>
<script>
import PessoaModal from './PessoaModal.vue'
import PessoaModalExclusao from './PessoaModalExclusao.vue'
export default {
  components: { PessoaModal, PessoaModalExclusao },
  data: () => ({
    rules: {
      regraNome: [
        v => !!v || 'Este campo é obrigatório',
      ],
      regraEmail: [
        v => !!v || 'Este campo é obrigatório',
        v => /.+@.+\..+/.test(v) || 'Formato de email inválido',
      ],
      regraIdade: [
        v => !!v || 'Este campo é obrigatório',
      ],
      regraCidade: [
        v => !!v || 'Este campo é obrigatório',
      ],
      regraTelefone: [
        v => !!v || 'Este campo é obrigatório',
        v => /(?:\()[0-9]{2}(?:\))\s?[0-9]{4,5}(?:-)[0-9]{4}$/.test(v) || 'Telefone inválido',
      ],
    },
    snackbar: false,
    mensagem: '',
    vertical: true,
    edicao: false,
    usuarioSelecionado: {},
    dialog: false,
    modalExclusao: false,
    mostrarModal: false,
    pessoas: [],
    name: '',
    email: '',
    city: '',
    phone: '',
    age: 0,
    id: 0
  }),
  mounted () {
    this.fetch()
  },
  methods: {
    fetch() {
       const th = this
        th.$api.Pessoa.GetAll().then((response) => {
          th.pessoas = response
        })
    },
    editar() {
      this.$api.Pessoa.Put(this.usuarioSelecionado.id, this.usuarioSelecionado).then((response) => {
        this.mostrarModal = false
        this.fetch();
        this.snackbar = true
        this.mensagem = 'Pessoa editada com sucesso'
      })
    },
    cadastrar() {
      this.$api.Pessoa.Post(this.usuarioSelecionado).then((response) => {
        this.mostrarModal = false
        this.fetch();
        this.snackbar = true
        this.mensagem = 'Pessoa cadastrada com sucesso'
      })
    },
    excluirUsuario(user) {
      this.modalExclusao = true;
      this.usuarioSelecionado = user;
    },
    confirmaExclusao() {
      const th = this;
      th.$api.Pessoa.Delete(th.usuarioSelecionado.id).then((response) => {
        this.modalExclusao = false
        this.fetch();
        this.snackbar = true
        this.mensagem = 'Pessoa excluída com sucesso'
      })
    },
    abrirModalPessoa(item) {
      if (item.id) {
        this.$api.Pessoa.GetById(item.id).then((response) => {
          this.usuarioSelecionado = response;
          this.edicao = true;
        })
        
      } else {
        this.usuarioSelecionado = {};
        this.edicao = false;
      }

      this.mostrarModal = true;
    }
  }
}
</script>
