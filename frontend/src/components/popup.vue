<template>
  <div>
    <!-- The popup -->
    <div v-if="value" class="popup">
      <div class="popup-content ">
        <div style="display: flex;justify-content: end;"><span @click.stop="closePopup"
            class="close-icon pointer">X</span>
        </div>
        <div class="tabs">
          <span :class="{ activeTab: type === 'VIDEOS', 'pointer': true }" @click.stop="type = 'VIDEOS'">VIDEOS</span>
          <span :class="{ activeTab: type === 'IMAGES', 'pointer': true }" @click.stop="type = 'IMAGES'">IMAGES</span>
        </div>
        <div class="images-container" v-if="type == 'IMAGES'">
          <div style="overflow: hidden;max-height: 460px;" class="pointer" title="Click to zoom-in and zoom-out">
            <img @click.stop="zoomImg" id="img" :src="$store.getters.getLargeImages[$store.getters.getcurrentIndex].src"
              :alt="$store.getters.getLargeImages[$store.getters.getcurrentIndex].alt"
              style="max-height: 460px; width: 80%; " />
          </div>
          <div>
            <Thumbnail class="thumbnail-container" />
          </div>
        </div>
        <div v-else style="margin-top: 30px;">
        <iframe width="80%" height="315"
            src="https://youtube.com/embed/WVXSnChJOb0?autoplay=1&controls=0&showinfo=0&autohide=1" allow="autoplay; encrypted-media" allowfullscreen>
        </iframe>
          </div>

      </div>
    </div>
  </div>
</template>
  
<script>
import Thumbnail from './Thumbnail.vue';
export default {
  name: 'pop-up',
  components: { Thumbnail },
  props: ['value'],
  emits: ['input'],
  data() {
    return {
      type: 'IMAGES',
      zoomType: 'zoomout'
    }
  },
  methods: {
    closePopup() {
      this.$emit('input', false)
    },
    zoomImg() {
      const img = document.getElementById("img");
      if (this.zoomType === 'zoomout') {
        img.style.width = '100%';
        img.style.maxHeight = '560px'
        this.zoomType = 'zoomin'
      }
      else {
        img.style.width = '80%';
        img.style.maxHeight = '460px'
        this.zoomType = 'zoomout'
      }
    },
    zoomout() {
      const img = document.getElementById("map");
      const currWidth = img.clientWidth;
      img.style.width = (currWidth - 100) + "px";
    }
  },
  watch: {
    value() {
      this.type = 'IMAGES'
    }
  },
  mounted() {
    // window.addEventListener('click', this.closePopup )
  }
};
</script>
  
<style scoped>
.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.popup-content {
  background: white;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  min-width: 760px;
  min-height: 400px;
}

.close-icon {
  width: 16px;
  height: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: grey 1px solid;
  font-size: 12px;
}

.tabs {
  display: flex;
  column-gap: 16px;
}

.tabs span {
  color: grey;
  font-size: 12px;
}

.activeTab {
  color: black !important;
  text-decoration: underline orange;
  text-underline-offset: 0.8em;
  text-decoration-thickness: 3px;
}

.images-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 15%;
  margin-top: 30px;
  column-gap: 20px;
  row-gap: 20px;
}

.thumbnail-container {
  column-gap: 12px;
  row-gap: 12px;
  display: flex;
  flex-wrap: wrap;
}

@media only screen and (max-width: 768px) {
  .popup {
    width: 100%;
  }

  .popup-content {
    min-width: 95vw
  }

  .images-container {
    padding-left: 0px;
  }

}
</style>
  