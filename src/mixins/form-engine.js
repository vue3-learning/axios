export default {
  data() {
    return {
      
    }
  },
  methods: {
    showResult() {
      this.data + 1
      return 123
    }
  },

  computed: {
    data() {
      return this.data
    },

    result() {
      return 1 + 2 + 3 + 4 + 5
    }
  }
}