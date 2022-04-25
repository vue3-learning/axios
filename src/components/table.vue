<template>
  <n-panel style="padding: 20px;">
    <n-table v-bind="tableProps" :columns="tableColumns" @page-change="search" v-loading="loading" />
  </n-panel>
</template>

<script>
export default {
  props: {
    tableColumns: {
      type: Array,
      default: () => []
    },
  },
  watch: {
    tableColumns: {
      handler(n, o) {
        console.log(n, o)
      },
      immediate: true,
      deep: true
    }
  },
  data() {
    return {
      loading: false,
      tableProps: {
        showPagination: true,
        paginationInfo: {
          index: 1,
          size: 15
        },
        paginationProps: {
          layout: 'total, prev, pager, next, jumper',
          background: true
        },
        // columns: [
        //   { align: 'center', type: 'index', label: '索引' },
        //   { align: 'center', prop: 'id', label: '商品编号' },
        //   { align: 'center', prop: 'title', label: '商品名称' },
        //   { align: 'center', prop: 'shopName', label: '店铺名称' },
        // ],
        data: null,
        total: null,
      }
    }
  },

  methods: {
    async search(form) {
      try {
        this.loading = true
        const { index, size } = this.tableProps.paginationInfo
        console.log(index,size)
        const params = {
          ...form,
          index: index - 1,
          size,
        }
        // const { data } = await this.$http.get('/merchant/welfare/section/productList', { params })
        const { data } = await this.$http({
          url: '/merchant/welfare/section/productList',
          method: 'get',
          params
        })
        this.tableProps.data = data.data.content
        this.tableProps.total = data.data.total
      } catch (e) {
        this.$log.error(e.message)
      } finally {
        this.loading = false
      }
    }
  },

  created() {
    this.search()
  }
}
</script>