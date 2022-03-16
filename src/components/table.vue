<template>
  <n-panel style="padding: 20px;">
    <n-table v-bind="tableProps" @page-change="search" v-loading="loading" />
  </n-panel>
</template>

<script>
import http from '../http'

export default {
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
        columns: [
          { align: 'center', type: 'index', label: '索引' },
          { align: 'center', prop: 'id', label: '商品编号' },
          { align: 'center', prop: 'title', label: '商品名称' },
          { align: 'center', prop: 'shopName', label: '店铺名称' },
        ],
        data: null,
        total: null,
      }
    }
  },

  methods: {
    async search() {
      try {
        // this.loading = true
        const { index, size } = this.tableProps.paginationInfo
        const params = {
          index: index - 1,
          size
        }
        const { data } = await http.get('/merchant/welfare/section/productList', { params })
        this.tableProps.data = data.data.content
        this.tableProps.total = data.data.total
        console.log(this.tableProps.data)
      } catch (e) {
        console.error(e)
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