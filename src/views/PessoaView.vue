<template>
  <div>
    <p v-for="(pessoa, i) in pessoas" :key="i">
      {{pessoa.id}} - {{pessoa.nome}}
    </p>
  </div>
</template>
<script>
export default {
  data: function () {
    return {
      pessoas: []
    }
  },
  mounted () {
    const th = this
    th.$api.Pessoa.GetAll().then(function (response) {
      th.pessoas = response
    })
  }
}
</script>
