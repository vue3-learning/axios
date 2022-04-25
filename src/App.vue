<script>
export default {
  name: 'App',

  data() {
    return {
      tabProps: {
        activeName: 'Home',
        tabs: [
          { label: '配置页', name: 'Home' },
          { label: '预览页', name: 'Preview' },
        ]
      }
    }
  },

  watch: {
    '$route'(to, from) {
      this.tabProps.activeName = to.name
    }
  },

  methods: {
    handleClick() {
      console.log(this.tabProps.activeName)
      this.$router.push({ name: this.tabProps.activeName })
    }
  },

  render() {

    return (
      <div id="app">
        <el-tabs
          type="border-card"
          value={this.tabProps.activeName}
          on-input={val => this.tabProps.activeName = val}
          on-tab-click={() => this.handleClick()}
        >
          {this.tabProps.tabs.map(tab => (
            <el-tab-pane
              label={tab.label}
              name={tab.name}
              key={tab.name}
            >
              <router-view />
            </el-tab-pane>
          ))}
        </el-tabs>
      </div>
    )
  }
}
</script>