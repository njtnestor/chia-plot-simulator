<template>
  <b-form @submit.stop.prevent>
    <b-form-group
      label="CPU brand:"
    >
      <b-form-select v-model="pcInfo.cpuBrand" :options="cpuBrandOptions" />
    </b-form-group>
    <b-form-group
      label="CPU Model:"
    >
      <b-form-input v-if="newCpu" v-model="pcInfo.cpuModel" placeholder="New cpu model, Ej: 450xT" type="text" />
      <Multiselect
        v-else
        v-model="pcInfo.cpuModel"
        :disabled="!pcInfo.cpuBrand"
        track-by="model"
        label="model"
        :options="cpuModelOptions"
        :options-limit="5"
      />
    </b-form-group>
    <b-button v-if="!newCpu" class="mb-3" variant="primary" @click="pcInfo.cpuModel=undefined;newCpu=true">
      New CPU model
    </b-button>
    <b-button v-if="newCpu" class="mb-3" variant="secondary" @click="pcInfo.cpuModel=undefined;newCpu=false">
      Select Existent CPU Model
    </b-button>

    <b-form-group
      label="Ram Size(Gib):"
    >
      <b-form-input v-model="pcInfo.ramSize" type="number" placeholder="16" />
    </b-form-group>
    <b-form-group
      label="Ram Frecuency(Mhz):"
    >
      <b-form-input v-model="pcInfo.ramFrecuency" placeholder="2133" />
    </b-form-group>
    <b-button type="submit" variant="primary" @click="share">
      Submit
    </b-button>
  </b-form>
</template>

<script>
export default {
  data () {
    return {
      pcInfo: {
        cpuBrand: undefined,
        cpuModel: undefined,
        ramSize: undefined,
        ramFrecuency: undefined
      },
      cpuModelOptions: [],
      cpuBrandOptions: ['AMD', 'Intel'],
      newCpu: false
    }
  },
  watch: {
    'pcInfo.cpuBrand' (val) {
      this.getCpus(val)
    }
  },
  methods: {
    share () {
      this.$emit('share', this.pcInfo)
    },

    async getCpus (brand) {
      try {
        const result = await this.$store.dispatch('cpu/getAllCpus', brand)
        this.cpuModelOptions = result
      } catch (e) {
        console.log('error', e)
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
