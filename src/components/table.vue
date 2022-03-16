<template>
  <n-panel style="padding: 20px;">
    <n-table v-bind="tableProps" />
  </n-panel>
</template>

<script>
import http from '../http'

export default {
  data() {
    return {
      tableProps: {
        columns: [
          { align: 'center', type: 'index', label: '索引' },
          {
            align: 'center',
            prop: 'name',
            label: '姓名',
          },
          {
            align: 'center',
            prop: 'age',
            label: '年龄',
          },
        ],
        data: [
          { name: '胡勇', age: '30' },
          { name: '黄鹍', age: '18' },
        ]
      }
    }
  },

  created() {
    http.get('https://www.lujaja.com/ecp/u5/merchant/welfare/section/productList').then(res => {
      console.log(res)
    })
  }
}
</script>