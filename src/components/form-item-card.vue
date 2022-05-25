<template>
  <div class="form-item" @click="handleSelectFormItem(formItem)">
    <div class="position-r">
      <el-popover
        placement="bottom"
        trigger="click"
        width="560"
        v-model="popoverVisible"
      >
        <el-form class="card-content" label-position="right" label-width="100px">
          <el-form-item label="label">
            <el-input size="mini" v-model="formItem.label" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="placeholder">
            <el-input size="mini" v-model="formItem.placeholder" />
          </el-form-item>
          <el-form-item label="model">
            <el-input size="mini" v-model="formItem.model" />
          </el-form-item>
          <template v-if="formItem.type === 'select'">
            <el-form-item label="options">
              <el-button type="text" @click="formItem.options.push({ label: '', value: '' })">添加</el-button>
              <div v-for="item in formItem.options" class="options">
                <div class="options-label">
                  <span class="name">label</span>
                  <span class="options-input">
                    <el-input size="mini" class="" v-model="item.label" />
                  </span>
                </div>
                <div class="options-value">
                  <span class="name">value</span>
                  <span class="options-input">
                    <el-input size="mini" class="" v-model="item.value" />
                  </span>
                </div>

                <i class="el-icon-close" @click.stop="handleRemoveFormItemOptions(item)" />
              </div>
            </el-form-item>
          </template>
          <template v-if="formItem.type === 'dateRange'">
            <el-form-item label="start">
              <el-input size="mini" v-model="formItem.start" />
            </el-form-item>
            <el-form-item label="end">
              <el-input size="mini" v-model="formItem.end" />
            </el-form-item>
          </template>
        </el-form>


        <div slot="reference">
          <el-tag class="mr-10">{{ formItem.label && formItem.label.trim() || '&nbsp;' }}</el-tag>
          <el-tag class="mr-30">{{ formItem.name }}</el-tag>
        </div>
        
      </el-popover>
      <i class="el-icon-close" @click.stop="handleRemoveFormItem(formItem)"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    formItem: {
      type: Object,
      default: () => ({})
    },

  },

  data() {
    return {
      popoverVisible: false,
    }
  },

  methods: {
    handleSelectFormItem(item) {
      console.log(item)
    },
    handleRemoveFormItem(item) {
      this.$emit('remove-item', item)
    },
    handleRemoveFormItemOptions(item) {
      this.formItem.options.splice(this.formItem.options.indexOf(item), 1)
    }
  }
}
</script>
