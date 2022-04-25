<template>
  <div>
    <SearchForm v-model="form" :formList="formList" @search="onSearch" />
    <Table ref="table" :tableColumns="tableColumns" />
  </div>
</template>

<script>
import SearchForm from "../components/search-form";
import Table from "../components/table";

export default {
  components: {
    SearchForm,
    Table,
  },

  data() {
    return {
      form: {},
      tableColumns: [],
      formList: [],
    };
  },

  methods: {
    onSearch(form) {
      this.$refs.table.search(form);
    },
  },

  created() {
    this.formList = JSON.parse(localStorage.getItem("formList")) || [];
    this.tableColumns = JSON.parse(localStorage.getItem("tableColumns")) || [];
    this.tableColumns.forEach(item => {
        item.formatter = eval(item.formatter)
        item.render = eval(item.render)
      })
  },
};
</script>

<style></style>
