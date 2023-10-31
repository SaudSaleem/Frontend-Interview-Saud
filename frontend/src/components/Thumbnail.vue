<template>
    <div>
        <div class="img-box pointer" @click.stop="setSelectedImg(index)"
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

.img-box {
    padding: 3px;
    border: solid 3px gray;
    border-radius: 12px;
    display: flex;
    justify-content: center;
    align-items: center;

}

img {
    width: 70px;
    height: 100%;

}

.selected-img {
    border: solid 3px rgb(239, 3, 46);
}</style>
  