<template>
  <div class="dialogDemo"></div>
</template>

<script>
export default {
  name: 'DialogDemo',
  data() {
    return {}
  },
  components: {},
  mounted() {
    this.$showDialog({
      text: ['Dialog', 'Dialog', '12345678901234567890'], // 两行
      showTime: 5000,
      showMask: true
    })
  }
}
</script>

<style scoped lang="less"></style>
