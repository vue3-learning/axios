<template>
  <div>
    <SearchForm v-model="form" :formList="formList" :slotButtonList="formSearchBtnList" @search="onSearch" />
    <Table ref="table" :tableColumns="tableColumns" :tableOperators="tableOperators" />
  </div>
</template>

<script>
import SearchForm from "../components/search-form";
import Table from "../components/table";
import { transform } from '@babel/standalone'

export default {
  components: {
    SearchForm,
    Table,
  },

  data() {
    return {
      form: {},
      tableColumns: [],
      tableOperators: [],
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
    this.formSearchBtnList = JSON.parse(localStorage.getItem("formSearchBtnList")) || [];
    this.tableColumns = JSON.parse(localStorage.getItem("tableColumns")) || [];
    this.tableOperators = JSON.parse(localStorage.getItem("tableOperators")) || [];

    const options = {
      "presets": [
        require('@vue/babel-preset-jsx'),
        'es2015'
      ]
    }

    this.tableColumns.forEach((item) => {
      if (item.formatter) {
        item.formatter = eval(transform(item.formatter, options).code);
      } else {
        item.formatter = eval(item.formatter)
      }
      if (item.render) {
        item.render = eval(transform(item.render, options).code);
      } else {
        item.render = eval(item.render)
      }
    });

    this.tableOperators.forEach((item) => {
      if (item.on.click) {
        item.on.click = eval(transform(item.on.click, options).code);
      } else {
        item.on.click = eval(item.on.click)
      }
    });
  },
};
</script>