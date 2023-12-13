<template>
    <div  class="bg-white absolute top-0 z-30 border border-gray-500 border-solid  image-zoom-container" id="imgZoomContainerId"></div>
</template>
  
<script>
export default {
    name: 'image-zoom-container',
}
</script>
  
  
<style scoped>
.image-zoom-container {
    width: 750px;
    height: calc(100vh - 158px);
    left: 110%;
    visibility: hidden;
}
</style>
  