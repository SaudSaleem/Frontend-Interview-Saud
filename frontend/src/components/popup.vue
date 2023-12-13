<template>
  <div>
    <!-- The popup -->
    <div v-if="value"
      class="fixed top-0 left-0 w-full  bg-opacity-50 bg-black flex justify-center items-center z-50 sm:w-full popup-container h-full">
      <div class="popup-content bg-white p-3 rounded">
        <div class="flex justify-end md:hidden"><span @click.stop="closePopup"
            class="w-4 h-4 flex justify-center items-center text-xs border border-gray-500 border-solid  cursor-pointer">X</span>
        </div>
         <!-- show button for mobile screen only -->
         <button class="px-6 py-2 text-sm rounded border-2 border-solid border-slate-300 cursor-pointer md:block hidden" @click="closePopup">
          Back
         </button>
        <div class="flex gap-x-4 px-4 md:hidden">
          <span class="text-xs text-gray-500" :class="{ activeTab: type === 'VIDEOS', 'cursor-pointer': true }"
            @click.stop="$emit('setType', 'VIDEOS')">VIDEOS</span>
          <span class="text-xs text-gray-500" :class="{ activeTab: type === 'IMAGES', 'cursor-pointer': true }"
            @click.stop="$emit('setType', 'IMAGES')">IMAGES</span>
        </div>
        <!-- Images -->
        <div class="flex items-start mt-7 gap-5  px-12 sm:pl-0 justify-between flex-wrap" v-if="type == 'IMAGES'">
          <div @click="(e) => !isMobile() && addZoom(e, getSelectedAsset.id + 'popup')" @dblclick="(e) => isMobile() && addZoom(e, getSelectedAsset.id + 'popup')" :id="getSelectedAsset.id + 'popup'"
            class="cursor-zoom-in image-section img-container img-section-height" title="Click to zoom-in and zoom-out" :style="{
               backgroundImage: `url(${getSelectedAsset.src})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat',
            }">
          </div>
          <div class="detail-section">
            <span class="text-black mt-8 md:mt-0 text-md block md:hidden">
              {{ getSelectedAsset.detail.title }}
            </span>
            <span class="text-slate-500 mt-4 text-xs block md:hidden">
              Colour Name: {{ getSelectedAsset.detail.color }}
            </span>
            <span class="text-slate-500 mt-4 text-xs block md:hidden">
              Size Name: {{ getSelectedAsset.detail.size }}
            </span>
            <span class="text-slate-500 mt-4 text-xs block md:hidden">
              Pattern Name: {{ getSelectedAsset.detail.pattern }}
            </span>
            <div class="gap-3 flex flex-wrap pt-6">
              <div class="flex justify-center items-center  cursor-pointer p-1 b" @click.stop="setSelectedAsset(index)"
                :class="{ 'border-solid border-2 border-orange-700': $store.getters.getcurrentIndex === index, ' border-solid border border-gray-400': $store.getters.getcurrentIndex !== index }"
                v-for="(img, index) in $store.getters.getThumbnailImages.filter(asset => asset.type === 'image')"
                :key="index">
                <Thumbnail :img="img"></Thumbnail>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="flex items-start mt-7 gap-5  px-12 sm:pl-0 ">

          <video width="320" height="240" controls autoplay class="image-section">
            <source :src="getSelectedAsset.videoSrc" type="video/mp4">
            <source :src="getSelectedAsset.videoSrc" type="video/ogg">
            Your browser does not support the video tag.
          </video>
          <div class="detail-section">
            <div class="w-full p-1 bg-slate-200">
              <span class="text-bold text-sm">Videos for this product</span>
            </div>
            <div class="gap-3 flex pt-6">
              <div>
                <div class="flex gap-2 flex-wrap" v-for="(item, index) in $store.getters.getStandardAssets" :key="index">
                  <div class="flex justify-center items-center  cursor-pointer p-1 b"
                    @click.stop="setSelectedAsset(index)" v-if="item._for == 'video'"
                    :class="{ 'border-solid border-2 border-orange-700': $store.getters.getcurrentIndex === index, ' border-solid border border-gray-400': $store.getters.getcurrentIndex !== index }">
                    <Thumbnail :img="item" type="video" _class="w-28 h-full"></Thumbnail>
                  </div>

                  <div v-if="item._for == 'video'">
                    <span class="text-black text-md block ">
                      {{ item.detail.title }}
                    </span>
                    <span class="text-slate-500 mt-2 text-xs block">
                      {{ item.detail.subTitle }}
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
  
<script>

let container = null;
let ratio = null;

import Thumbnail from './Thumbnail.vue';
export default {
  name: 'pop-up',
  components: { Thumbnail },
  props: ['value','type'],
  emits: ['input', 'setType'],
  data() {
    return {
      zoomType: 'zoomout',
      zoomedIn: false
    }
  },
  methods: {
    closePopup() {
      this.$emit('input', false)
    },
    removeListiners() {
      this.$store.getters.getStandardAssets.forEach(asset => {
        let element = document.getElementById(asset.id + "popup");
        if (element) {
          element.removeEventListener('mousemove', this.zoomImg)
        }
      })
    },
    zoomImg(e) {
      let rect = e.target.getBoundingClientRect(),
        xPos = e.clientX - rect.left,
        yPos = e.clientY - rect.top,
        xPercent = xPos / (container.clientWidth / 100) + "%",
        yPercent = yPos / ((container.clientWidth * ratio) /100) + "%";
      console.log('yPos',yPos)
      let threshold = 0
      threshold = this.isMobile() ? 340 : 460;
      Object.assign(container.style, {
        backgroundPosition: yPos < threshold ? xPercent + " " + yPercent : 'bottom',
        backgroundSize: "cover",
        cursor: 'zoom-out'
      });
    },
    addZoom(e, target) {
      // not show image zoom for video
      if (this.getSelectedAsset._for === 'video') {
        return
      }
      this.removeListiners();
      // (A) GET CONTAINER + IMAGE SOURCE
      container = document.getElementById(target);
      let imgsrc = container.style.backgroundImage.replace(/url\((['"])?(.*?)\1\)/gi, '$2').split(',')[0];
      let img = new Image();
      img.src = imgsrc;
      ratio = img.naturalHeight / img.naturalWidth;
      // eslint-disable-next-line
      if (container.style.backgroundSize != "cover") {
        console.log('cover')
        this.zoomImg(e)
        !this.isMobile() && container.addEventListener('mousemove', this.zoomImg);

      }
      else {
        container.removeEventListener('mousemove', this.zoomImg);
        Object.assign(container.style, {
          backgroundPosition: "initial",
          backgroundSize: "contain",
          cursor: 'zoom-in',
        })
      }
    },

    resetZoom() {
      this.removeListiners();
      this.$store.getters.getStandardAssets.forEach(asset => {
        let element = document.getElementById(asset.id + "popup");
        if (element) {
          Object.assign(element.style, {
            backgroundPosition: "initial",
            backgroundSize: "contain",
            cursor: 'zoom-in',
          })
        }
      })

    },
    setSelectedAsset(index) {
      this.$store.commit('setCurrentIndex', index);
    },
    isMobile(){
      return window.innerWidth <= 768
    }
  },
  computed: {
    getSelectedAsset() {
      return this.$store.getters.getStandardAssets[this.$store.getters.getcurrentIndex]
    },
    getCurrentAssetType() {
      return this.$store.getters.getStandardAssets[this.$store.getters.getcurrentIndex]._for === 'image' ? 'IMAGES' : 'VIDEOS'
    }
  },
  updated() {
    if (this.$store.getters.getStandardAssets[this.$store.getters.getcurrentIndex]?._for == 'image') {
      this.$emit('setType', "IMAGES")
    }
    else {
      this.$emit('setType', "VIDEOS")
    }
    this.resetZoom()
  },
  watch: {
    type(val) {
      if (val == 'IMAGES') {
        let imgIndex = this.$store.getters.getStandardAssets.findIndex(asset => asset._for == 'image');
        if (imgIndex > -1) {
          this.setSelectedAsset(imgIndex)
        }
      }
      else {
        let videoIndex = this.$store.getters.getStandardAssets.findIndex(asset => asset._for == 'video');
        if (videoIndex > -1) {
          this.setSelectedAsset(videoIndex)
        }
      }
    },
  },
  mounted(){
    const imgContainer = document.getElementsByClassName('img-container')[0];
    // for mobile
    if(imgContainer && this.isMobile()){
      imgContainer.style.minWidth = 'revert-layer'
    } 
  }

};
</script>
  
<style scoped>
.popup-content {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  min-width: 90vw;
  min-height: 400px;
}

.activeTab {
  color: black !important;
  text-decoration: underline orange;
  text-underline-offset: 0.8em;
  text-decoration-thickness: 3px;
}

.image-section {
  width: 66%;
  max-width: 1000px;
  min-width: 400px;
}
.img-section-height{
  height: 500px;
}

.detail-section {
  width: 32%;
  max-width: 400px;
  min-width: 300px;
}

@media only screen and (max-width: 768px) {
  .popup-content {
    min-width: 95vw
  }
  .img-section-height{
    height: 49vh;
  }
}
</style>
  