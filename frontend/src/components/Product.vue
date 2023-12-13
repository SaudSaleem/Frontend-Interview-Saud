<template>
  <div class="flex flex-wrap pt-4  md:items-center md:justify-center md:gap-y-10 md:px-5">
    <div class="flex flex-col items-center gap-y-2 pt-2 md:flex-row md:h-screen md:mb-5 md:flex-wrap md:gap-4 md:hidden"
      style=" height: 70vh; min-width: 120px;">
      <div class="flex justify-center items-center rounded-xl cursor-pointer p-1 border-solid border border-gray-400"
        @click.stop="setSelectedImg(index)"
        :class="{ 'border-solid border-2 border-red-700': $store.getters.getcurrentIndex === index }"
        :style="{ boxShadow: $store.getters.getcurrentIndex === index ? '0 0 5px 2px #75b1e4' : 'none' }"
        style="width: 40px; height:52px"
        v-for="(img, index) in $store.getters.getThumbnailImages" :key="index">
        <Thumbnail :img="img"></Thumbnail>
      </div>
    </div>
    <Slider class="bg-white md:w-full"></Slider>
    <ProductDetail class="xl:w-full p-4 pl-11 md:p-1 pb-3 overflow-y-auto" style="width: 544px;"></ProductDetail>
  </div>
</template>
<script>
import Slider from './Slider.vue';
import Thumbnail from './Thumbnail.vue';
import ProductDetail from './ProductDetail.vue';
export default {
  name: 'product-conteiner',
  components: {
    Thumbnail,
    Slider,
    ProductDetail
  },
  methods: {
    setSelectedImg(index) {
      this.$store.commit('setCurrentIndex', index);
    },
    isMobile() {
            return window.innerWidth <= 768
    },
  }
}
</script>
