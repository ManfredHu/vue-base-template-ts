<template>
  <div>
    <button v-tap="showSucToast">展示已成功</button>
    <button v-tap="showLoadingToast">展示加载中</button>
  </div>
</template>

<script>
export default {
  name: 'ToastDemo',
  components: {},
  methods: {
    showSucToast() {
      this.$showToast() // default to show suc toast
    },
    showLoadingToast() {
      this.$showToast({
        type: 'loading',
        text: ['数据加载中', '数据加载中2'],
        showTime: 5000
      }) // default to show suc toast
    }
  },
  mounted() {
    this.$showToast() // default to show suc toast
  }
}
</script>

<style lang="less" scoped></style>
