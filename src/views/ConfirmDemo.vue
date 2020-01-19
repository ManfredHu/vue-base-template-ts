<template>
  <div class="dialogDemo"></div>
</template>

<script>
export default {
  name: 'ConfirmDemo',
  data() {
    return {
      isShow: true,
      showMask: true
    }
  },
  methods: {
    cacel(self) {
      console.log('取消', self)
      this.$hideConfirm()
    },
    sure(self) {
      console.log('确定')
      this.$hideConfirm()
    }
  },
  mounted() {
    this.$showConfirm({
      isShow: this.isShow,
      title: 'this is title',
      desc: 'this is description',
      lBtnEvent: this.cacel,
      rBtnEvent: this.sure
    })
  }
}
</script>

<style scoped lang="less"></style>
