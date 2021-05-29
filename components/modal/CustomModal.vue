<template>
  <modal
    class="customModal"
    :name="modalName"
    :draggable="draggable"
    :width="width"
    :click-to-close="clickToClose"
    :scrollable="true"
    :resizable="true"
    :max-height="600"
    height="auto"
  >
    <h4 v-if="name">
      {{ $t(name) }}
    </h4>
    <slot name="ModalContent" :extra="extraParams" />
  </modal>
</template>

<script>
export default {
  props: {
    modalName: {
      type: String,
      required: true
    },
    name: {
      type: String,
      default: undefined
    },
    clickToClose: {
      type: Boolean,
      default: true
    },
    draggable: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
      default: undefined
    }
  },
  data () {
    return {
      extraParams: undefined
    }
  },
  methods: {

  }

}
</script>

<style lang="scss">
.customModal .v--modal-box.v--modal{

    h4{
      border-bottom: 1px solid;
      padding-bottom: 8px;
      margin-bottom: 20px;
      text-align: center;
    }

    display: flex;
    flex-direction: column;
    justify-content: center;

    padding-left: 2rem;
    padding-right: 2rem;
    padding-top: 3rem;
    padding-bottom: 3rem;
}

</style>
