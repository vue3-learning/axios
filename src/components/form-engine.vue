<template>
  <div>
    <div class="text-right">
      <el-button type="primary" size="small" @click="save">保存</el-button>
      <el-button type="primary" size="small" @click="preview">预览</el-button>
      <el-button size="small" @click="clear">清空</el-button>
    </div>

    <div class="row">
      <div class="col-3">
        <h3>组件</h3>
        <draggable
          class="dragArea list-group"
          :list="sourceElement"
          :group="{ name: 'people', pull: 'clone', put: false }"
          :clone="clone"
          @change="log"
        >
          <el-tag class="list-group-item" v-for="element in sourceElement" :key="element.id">
            {{ element.name }}
          </el-tag>
        </draggable>
      </div>

      <div class="col-3">
        <h3>表单项</h3>
        <draggable
          class="dragArea list-group"
          :list="formList"
          group="people"
          @change="log"
        >
          <formItemCard v-for="ele in formList" :form-item="ele" @remove-item="handleRemoveFormItem" />
        </draggable>
      </div>
      
      <hr />

      
      <div class="col-3">
        <h3>table 列</h3>
        
        <div class="mb-10">
          <el-button type="primary" size="mini" @click="addColumn('index')">添加索引列</el-button>
          <el-button type="primary" size="mini" @click="addColumn('common')">添加常规列</el-button>
          <el-button type="primary" size="mini" @click="addColumn('operator')">添加操作列</el-button>
        </div>
        <draggable
          class="dragArea list-group"
          :list="tableColumns"
          :group="{ put: false }"
        >
          <div class="list-group-item table-item" v-for="element in tableColumns" :key="element.id">
            <div>{{ element.label }}</div>
            <i class="el-icon-close" @click="handleRemoveTableColumn(element)"></i>
            <div>label:<input v-model="element.label" /></div>
            <div>align:<input v-model="element.align" /></div>
            <div>prop:<input v-model="element.prop" /></div>
            <div>formatter:<input v-model="element.formatter" /></div>
            <div>render:<input v-model="element.render" /></div>
          </div>
          
        </draggable>
      </div>
    </div>

  </div>
</template>

<script>
import draggable from "vuedraggable"
import { deepClone } from '../utils/copy'

import formItemCard from './form-item-card'

export default {
  name: "form-engine",

  components: {
    draggable,
    formItemCard,
  },

  data() {
    return {
      sourceElement: [
        { name: "输入框", code: 'input', type: 'input', placeholder: '请输入' },
        { name: "选择框", code: 'select', type: 'select', placeholder: '请选择' },
        { name: "月份选择", code: 'month', type: 'month', placeholder: '请选择' },
        { name: "时间范围选择", code: 'dateRange', type: 'dateRange', placeholder: '请选择' }
      ],
      form: {},
      formList: [],
      tableColumns: [],
      operator: [],
    };
  },
  methods: {
    log(evt) {
      window.console.log(evt);
    },
    addColumn(type) {
      if (type === 'index') {
        if (this.tableColumns.some(i => i.type === 'index')) {
          return this.$message.error('已经存在索引列，请勿重复添加')
        }
        this.tableColumns.unshift({ align: 'center', type: 'index', label: '序号' })
      } else if (type === 'common') {
        this.tableColumns.push({
          label: '列名',
          prop: '',
          align: 'center',
        })
      } else if (type === 'operator') {
        this.operator.push({
          text: '删除',
          // on: { click: ({ row }) => this.deleteProducts(row) }
        })
      }
    },
    clone(source) {
      return {
        name: source.name,
        type: source.type,
        label: ``,
        placeholder: source.placeholder,
        model: '',
        text: '',
        value: '',
        options: [],
        start: '',
        end: '',
      }
    },
    async save() {
      // this.tableColumns.forEach(item => {
      //   item.formatter = eval(item.formatter)
      //   item.render = eval(item.render)
      // })
      localStorage.setItem('formList', JSON.stringify(this.formList))
      localStorage.setItem('tableColumns', JSON.stringify(this.tableColumns))
    },
    async preview() {
      await this.save()
      this.$router.push({ name: 'Preview' })
    },
    async clear() {
      this.formList = []
      this.tableColumns = []
      await this.save()
    },
    handleRemoveFormItem(ele) {
      this.formList.splice(this.formList.indexOf(ele), 1)
    },
    handleRemoveTableColumn(ele) {
      this.tableColumns.splice(this.tableColumns.indexOf(ele), 1)
    },

  },

  created() {
    this.formList = JSON.parse(localStorage.getItem('formList')) || []
    this.tableColumns = JSON.parse(localStorage.getItem('tableColumns')) || []
  }
}
</script>
