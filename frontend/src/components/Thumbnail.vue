<template>
    <div class="thumbnail-container">
        <div class="img-box pointer" @click="setSelectedImg(index)"
            :class="{ 'img-box': true, 'selected-img': $store.getters.getcurrentIndex === index }"
            v-for="(img, index) in $store.getters.getThumbnailImages" :key="index">
            <img :src="img.src" alt="" />
        </div>

    </div>
</template>
  
<script>
export default {
    name: 'thumbnail-component',
    methods: {
        setSelectedImg(index) {
            this.$store.commit('setCurrentIndex', index);
        }
    }
}
</script>
  
  
<style scoped>
.thumbnail-container {
    display: flex;
    flex-direction: column;
    row-gap: 8px;
    height: 100vh;
    min-width: 120px;
    align-items: center;
    padding-top: 8px;
}

.img-box {
    width: 80%;
    height: 100px;
    border: solid 3px gray;
    border-radius: 12px;
    display: flex;
    justify-content: center;
    align-items: center;

}

img {
    width: 96%;
    height: 96%;
}

.selected-img {
    border: solid 3px rgb(239, 3, 46);
}</style>
  