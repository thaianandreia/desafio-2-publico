<template v-slot:top>
  <v-dialog v-model="modalExclusao" max-width="600px">
    <v-card>
      <v-card-title class="text-h5">Tem certeza que deseja remover essa pessoa?</v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red darken-1" text @click="fecharModalExclusao">Não</v-btn>
        <v-btn color="blue darken-1" text @click="confirmaExclusao($event)">Sim</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  computed: {
    modalExclusao: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  },
  props: {
    value: Boolean,
    usuarioId: Number
  },
  methods: {
    fecharModalExclusao() {
      this.modalExclusao = false;
    },
    confirmaExclusao() {
      this.$emit("confirmaExclusao", this.usuarioId);
    }
  }
}
</script>