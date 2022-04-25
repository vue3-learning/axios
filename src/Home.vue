<template>
  <div>
    <FormEngine />
    <SearchForm v-model="form" :formList="formList" />
  </div>
</template>

<script>
import FormEngine from './components/form-engine.vue'
import Table from './components/table.vue'
import SearchForm from './components/search-form.vue'

export default {
  name: 'Home',
  components: {
    FormEngine,
    Table,
    SearchForm
  },
  data() {
    return {
      form: {},
      formList: []
    }
  },
  methods: {
  },
}
</script>