export default {
  name: 'activePafe',
  data () {
    return {
      path: ''
    }
  },
  computed: {
  },
  watch: {
    '$route': function (to, form) {
      this.path = to.meta.iframepath
    }
  },
  mounted () {
    // console.log(this.$route.meta.iframepath)
    this.path = this.$route.meta.iframepath
  },
  methods: {
  }
}
