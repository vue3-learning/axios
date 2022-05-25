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
          <el-form-item label="text">
            <el-input size="mini" v-model="column.text" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="align">
            <el-input size="mini" v-model="column.align" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="hide">
            <el-input size="mini" v-model="column.hide" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="onClick">
            <el-input size="mini" type="textarea" v-model="column.on.click" placeholder="请输入" />
          </el-form-item>
        </el-form>

        <el-tag slot="reference" class="mr-30">{{ column.text && column.text.trim() || '&nbsp;' }}</el-tag>
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

