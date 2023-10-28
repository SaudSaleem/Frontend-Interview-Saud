<template>
    <div v-show="showHoverImage" class="image-zoom-container">
        <img :src="$store.getters.getLargeImages[$store.getters.getcurrentIndex].src" :alt="$store.getters.getLargeImages[$store.getters.getcurrentIndex].alt" style="width: 100%;max-height: 460px;" />
    </div>
</template>
  
<script>
export default {
    name: 'image-zoom',
    props: {
        showHoverImage: {
            type: Boolean,
            default: false
        },
    }
}
</script>
  
  
<style scoped>
.image-zoom-container {
    width: 400px;
    max-height: 600px;
    background-color: rgb(243, 243, 243);
    border: solid 3px red;
    position: absolute;
    top: 0px;
    left: 110%;
}
</style>
  