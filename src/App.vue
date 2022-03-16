<template>
  <v-app>
     <v-app-bar
      app
      color="primary"
      dark
    >
      <h3>Desafio 2</h3>
      <v-btn small text class="ml-auto" @click="reiniciar">Reiniciar Lista de Pessoas</v-btn>
    </v-app-bar>
    <v-main>
      <v-container fill-height fluid>
        <v-layout row >
          <v-card width="100%" flat class="ma-4" >
            <pessoa-view/>
          </v-card>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import PessoaView from './views/PessoaView.vue';

export default {
  name: 'App',

  components: {
    PessoaView,
  },

  data: () => ({
    //
  }),
  methods: {
    reiniciar () {
      this.$api.Pessoa.ReiniciarLista()
      location.reload()
    }
  }
};
</script>
