<template>
  <div class="column-item">
    <div class="column-item-wrapper">
      <el-popover
        placement="bottom"
        trigger="click"
        width="560"
        v-model="popoverVisible"
      >
        <el-form class="card-content" label-position="bottom" label-width="100px">
          <el-form-item label="label">
            <el-input size="mini" v-model="column.label" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="align">
            <el-input size="mini" v-model="column.align" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="prop">
            <el-input size="mini" v-model="column.prop" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="formatter">
            <el-input size="mini" type="textarea" v-model="column.formatter" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="render">
            <el-input size="mini" type="textarea" v-model="column.render" placeholder="请输入" />
          </el-form-item>
        </el-form>

        <el-tag slot="reference" class="mr-30">{{ column.label && column.label.trim() || '&nbsp;' }}</el-tag>
      </el-popover>
      <i class="el-icon-close" @click="$emit('remove-item', column)"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    column: {
      type: Object,
      default: () => ({})
    },
  },

  data() {
    return {
      popoverVisible: false
    }
  }
}
</script>

