<template>
  <div>
    <div class="instructions">
      <h4> {{ $t('ganttPage.infoModal.instructions.title') }} </h4>
      <ol>
        <li>{{ $t('ganttPage.infoModal.instructions.step1') }}</li>
        <li>{{ $t('ganttPage.infoModal.instructions.step2') }}</li>
      </ol>
      <img src="https://i.gyazo.com/a5d6cf01ff5b60ec286da99603c830f1.png" alt="">
    </div>
    <div>
      <h4 class="mt-4">
        {{ $t('ganttPage.infoModal.controls.title') }}
      </h4>
      <div>
        <b>{{ $t('ganttPage.infoModal.controls.zoomTitle') }}:</b>
        <kbd>{{ $t('ganttPage.infoModal.controls.zoomDescription') }}</kbd>
      </div>
      <div>
        <b>{{ $t('ganttPage.infoModal.controls.horizontalScrollTitle') }}:</b>
        <kbd>{{ $t('ganttPage.infoModal.controls.horizontalScrollDescription') }}</kbd>
      </div>
      <div>
        <b>{{ $t('ganttPage.infoModal.controls.reorderPlotsTitle') }}:</b>
        {{ $t('ganttPage.infoModal.controls.reorderPlotsDescription') }}
        <span>
          <b-button id="reorderExample" class="mt-2 text-decoration-none pl-0" variant="link" :active="true">
            {{ $t('ganttPage.infoModal.controls.example') }}
          </b-button>
          <b-tooltip placement="bottom-right" target="reorderExample" triggers="hover" variant="dark">
            <img src="https://i.gyazo.com/8020141cef055f19720406728d93e799.gif" alt="">
          </b-tooltip>
        </span>
      </div>

      <div>
        <b>{{ $t('ganttPage.infoModal.controls.orderByTitle') }}:</b>
        {{ $t('ganttPage.infoModal.controls.orderByDescription') }}
        <span>
          <b-button id="orderByExample" class="mt-2 text-decoration-none pl-0" variant="link" :active="true">
            {{ $t('ganttPage.infoModal.controls.example') }}
          </b-button>
          <b-tooltip placement="bottom-right" target="orderByExample" triggers="hover" variant="dark">
            <img src="https://i.gyazo.com/1939a510d3145e361d685cc3db601c53.gif" alt="">
          </b-tooltip>
        </span>
      </div>
      <div>
        <b>{{ $t('ganttPage.infoModal.controls.extraPlotInfoTitle') }}:</b>
        {{ $t('ganttPage.infoModal.controls.extraPlotInfoDescription') }}
        <span>
          <b-button id="extraPlotInfoExample" class="mt-2 text-decoration-none pl-0" variant="link" :active="true">
            {{ $t('ganttPage.infoModal.controls.example') }}
          </b-button>
          <b-tooltip placement="bottom-right" target="extraPlotInfoExample" triggers="hover" variant="dark">
            <img src="https://i.gyazo.com/6c968422e162e6d528453e4408cfb606.gif" alt="">
          </b-tooltip>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>

div{
  margin-bottom: 5px;
}
button{
  margin: 0 !important;
  margin-bottom: 2px !important;
  padding: 0 !important;
}
ol{
  padding-left: 18px;
}
.instructions{
  img{
    max-width: 100%;
  }
}
</style>
