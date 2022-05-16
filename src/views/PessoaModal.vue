<template>
  <v-row justify="center">
      <v-dialog
        v-model="mostrarModal"
        max-width="800px"
      >
        <v-card>
          <v-card-title>
            <span class="text-h5">{{ edicao ? "Editar Pessoa" : "Nova Pessoa" }}</span>
          </v-card-title>
          <v-form ref="form" lazy-validation @submit.prevent="salvar">
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="12" md="4">
                    <v-text-field
                      label="Id"
                      v-model="usuarioSelecionado.id"
                      v-if="usuarioSelecionado.id"
                      :disabled="edicao"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="8"></v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                      label="Nome *"
                      :rules="regras.regraNome"
                      v-model="usuarioSelecionado.name"
                      tabindex="1"
                      required
                    ></v-text-field>
                    <v-slider
                      class="mt-10"
                      label="Idade *"
                      v-model="usuarioSelecionado.age"
                      thumb-label
                      required
                      :rules="regras.regraIdade"
                      tabindex="2"
                    ></v-slider>
                  </v-col>
                  <v-col cols="12" sm="12" md="8">
                    <v-text-field
                      label="Email *"
                      v-model="usuarioSelecionado.email"
                      tabindex="3"
                      :rules="regras.regraEmail"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="4">
                    <v-text-field
                      label="Telefone *"
                      placeholder="(99) 99999-9999"
                      v-model="usuarioSelecionado.phone"
                      :rules="regras.regraTelefone"
                      tabindex="4"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                      label="Cidade *"
                      v-model="usuarioSelecionado.city"
                      :rules="regras.regraCidade"
                      tabindex="5"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              text
              color="blue darken-1"
              @click="fecharModalPessoa"
            >
              Fechar
            </v-btn>
            <v-btn color="blue darken-1" text type="submit">
              Salvar
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>

export default {
  props: {
    regras: Object,
    value: Boolean,
    usuarioSelecionado: Object,
    edicao: Boolean
  },
  computed: {
    mostrarModal: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  },
  methods: {
    salvar() {
      if(this.$refs.form.validate()) {
        if (this.usuarioSelecionado.id) this.$emit("editar", this.usuarioSelecionado);
        else this.$emit("cadastrar", this.usuarioSelecionado);
      } else {
        this.valido = false;
      }
    },
    fecharModalPessoa() {
      this.$refs.form.resetValidation();
      this.mostrarModal = false;
    }
  }
}
</script>