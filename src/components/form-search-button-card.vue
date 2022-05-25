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
          <el-form-item label="name">
            <el-input size="mini" v-model="button.name" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="type">
            <el-input size="mini" v-model="button.type" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="onClick">
            <el-input size="mini" type="textarea" v-model="button.onClick" placeholder="请输入" />
          </el-form-item>
        </el-form>

        <el-tag slot="reference" class="mr-30">{{ button.name && button.name.trim() || '&nbsp;' }}</el-tag>
      </el-popover>
      <i class="el-icon-close" @click="$emit('remove-item', button)"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    button: {
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

