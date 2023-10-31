<template>
    <div style="position: relative;">
        <div class="image-slider">
            <div class="slider-container" @touchstart="touchStart">
                <img @click="prevImage" src="../assets/arrow-left.png" class="pointer" style="height: 20px;">
                <div class="image-container" @click.stop="openPopup" @mouseover="showHoverImage = true" @mouseout="showHoverImage = false" title="Click to open Popup">
                    <img :src="$store.getters.getStandardImages[$store.getters.getcurrentIndex].src" alt="Slider Image" class="zoom-in" />
                </div>
                <img @click="nextImage" src="../assets/arrow-right.png" class="pointer" style="height: 20px;">
            </div>
        </div>
        <div class="slider-dots">
            <span v-for="(_, index) in $store.getters.getStandardImages" :key="index"
                :class="{ 'dot': true, 'active-dot': $store.getters.getcurrentIndex === index }">
            </span>
        </div>
        <ImageZoom :showHoverImage="showHoverImage"  v-if="!isMobile()"/>
        <Popup v-model="isPopupOpen" />
    </div>
</template>
  
<script>
import Popup from './popup.vue';
import ImageZoom from './ImageZoom.vue';

export default {
    name: 'product-slider',
    components: { ImageZoom, Popup },
    data() {
        return {
            showHoverImage: false,
            isPopupOpen: false
        };
    },
    methods: {
        prevImage() {
            this.$store.commit('setCurrentIndex',(this.$store.getters.getcurrentIndex - 1) % this.$store.getters.getStandardImages.length);
        },
        nextImage() {
            this.$store.commit('setCurrentIndex',(this.$store.getters.getcurrentIndex + 1) % this.$store.getters.getStandardImages.length);
        },
        openPopup(){
            this.isPopupOpen = true;
        },
        touchStart (touchEvent) {
        if (touchEvent.changedTouches.length !== 1) {
          return;
        }
        const posXStart = touchEvent.changedTouches[0].clientX;
        addEventListener('touchend', (touchEvent) => this.touchEnd(touchEvent, posXStart), {once: true});
      },
      touchEnd (touchEvent, posXStart) {
        if (touchEvent.changedTouches.length !== 1) {
          return;
        }
        const posXEnd = touchEvent.changedTouches[0].clientX;
        if (posXStart < posXEnd) {
          this.prevImage(); // swipe right
        } else if (posXStart > posXEnd) {
          this.nextImage(); // swipe left
        }
      },
      isMobile(){
        return window.innerWidth <= 768
      }
    },


}
</script>
  
  
<style scoped>
.slider-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.image-slider {
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: white;
    height: 430px;

}

.image-container {
    min-width: 249px;
    min-height: 300px;
}
.image-container img {
    max-width: 100%;
    max-height: 300px;
}

.slider-dots {
    display: flex;
    justify-content: center;
    margin-top: 10px;
}

.dot {
    width: 8px;
    height: 8px;
    background-color: rgb(156, 152, 152);
    border-radius: 50%;
    margin: 0 5px;
    cursor: pointer;
}

.active-dot {
    background-color: rgb(192, 9, 9);
}

.zoom-in {
    cursor: zoom-in;
}
</style>
  