<template>
    <div class="relative">
        <div class="text-center flex flex-col justify-center slider">
            <div class="flex justify-between items-center" @touchstart="touchStart">
                <svg @click="prevImage" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                    class="fill-current rotate-90 h-8 w-8 lg:h-12 lg:w-12 text-blue-800 cursor-pointer mr-auto" style="">
                    <path fill-rule="evenodd"
                        d="M15.3 10.3a1 1 0 0 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 1.4-1.4l3.3 3.29 3.3-3.3z">
                    </path>
                </svg>
                <div class="image-container relative flex items-center justify-center" @click.stop="openPopup"
                    @mouseenter="showHoverImage = true; imageZoom(selectedAsset.id, 'imgZoomContainerId')"
                    @mouseleave="showHoverImage = false; removeZoomContainer('imgZoomContainerId')"
                    title="Click to open Popup">
                    <img :src="selectedAsset.src" alt="Product Image" :id="selectedAsset.id" class="max-h-72 cursor-pointer"
                        style="max-width: 98%;" v-if="selectedAsset.type === 'image'" />
                </div>
                <svg @click="nextImage" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                    class="fill-current rotate-90 h-8 w-8 lg:h-12 lg:w-12 text-blue-800 cursor-pointer ml-auto" style="">
                    <path fill-rule="evenodd"
                        d="M8.7 13.7a1 1 0 1 1-1.4-1.4l4-4a1 1 0 0 1 1.4 0l4 4a1 1 0 0 1-1.4 1.4L12 10.42l-3.3 3.3z"></path>
                </svg>
            </div>
        </div>
        <div class="flex justify-center my-2">
            <div v-for="(item, index) in $store.getters.getStandardAssets" :key="index" class="flex items-center">
                <span class="inline-block w-2 h-2 bg-gray-500 mx-1" style="border-radius: 50%;"
                    :class="{ 'bg-red-600': $store.getters.getcurrentIndex === index }" v-if="item._for === 'image'">
                </span>
                <div v-else class="cursor-pointer border-solid bg-white playback-icon ml-1 md:hidden"
                    :style="{ borderColor: $store.getters.getcurrentIndex === index ? 'transparent transparent transparent red' : 'transparent transparent transparent rgb(107 114 128)' }">
                </div>
            </div>

        </div>
        <ImageZoom :showHoverImage="showHoverImage" v-if="!isMobile()" />
        <Popup v-model="isPopupOpen" :type="assetType" @setType="(type) => setType(type)"></Popup>
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
            assetType: "IMAGES",
            showHoverImage: true,
            isPopupOpen: false,
            img: null,
            megnify: null,
            zoomContainer: null
        };
    },
    methods: {
        setType(type) {
            this.assetType = type;
        },
        prevImage() {
            this.$store.commit('setCurrentIndex', (this.$store.getters.getcurrentIndex - 1) % this.$store.getters.getStandardAssets.length);
        },
        nextImage() {
            this.$store.commit('setCurrentIndex', (this.$store.getters.getcurrentIndex + 1) % this.$store.getters.getStandardAssets.length);
        },
        openPopup() {
            this.isPopupOpen = true;
        },
        touchStart(touchEvent) {
            if (touchEvent.changedTouches.length !== 1) {
                return;
            }
            const posXStart = touchEvent.changedTouches[0].clientX;
            addEventListener('touchend', (touchEvent) => this.touchEnd(touchEvent, posXStart), { once: true });
        },
        touchEnd(touchEvent, posXStart) {
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
        isMobile() {
            return window.innerWidth <= 768
        },
        removeZoomContainer(containerId) {
            this.deleteElementsByClassName('img-zoom-lens');
            const zoomContainer = document.getElementById(containerId);
            if (zoomContainer) zoomContainer.style.visibility = 'hidden';
        },
        imageZoom(targetImgId, containerId) {
            // not show image zoom for video thubnail
            if (this.selectedAsset._for === 'video') {
                return
            }
            this.img = document.getElementById(targetImgId);
            this.zoomContainer = document.getElementById(containerId);
            if (this.zoomContainer) {
                this.zoomContainer.style.visibility = 'visible';
                // delete previously created lens container
                this.deleteElementsByClassName("img-zoom-lens");
                this.megnify = document.createElement("DIV");
                this.megnify.setAttribute("class", "img-zoom-lens");
                this.img.parentElement.insertBefore(this.megnify, this.img);
                const cx = this.zoomContainer.offsetWidth / this.megnify.offsetWidth;
                const cy = this.zoomContainer.offsetHeight / this.megnify.offsetHeight;
                this.zoomContainer.style.backgroundImage = "url('" + this.$store.getters.getLargeImages[this.$store.getters.getcurrentIndex].src + "')";
                this.zoomContainer.style.backgroundSize = "cover"
                this.zoomContainer.style.backgroundRepeat = "no-repeat"
                // this.zoomContainer.style.backgroundSize = (this.img.width * cx) + "px " + (this.img.height * cy) + "px";
                this.megnify.addEventListener("mousemove", (e) => this.moveMegnify(e, cx, cy));
                this.img.addEventListener("mousemove", (e) => this.moveMegnify(e, cx, cy));
                this.megnify.addEventListener("touchmove", (e) => this.moveMegnify(e, cx, cy));
                this.img.addEventListener("touchmove", (e) => this.moveMegnify(e, cx, cy));
            }
        },
        deleteElementsByClassName(className) {
            const elements = document.getElementsByClassName(className);
            const elementsArray = Array.from(elements);
            elementsArray.forEach((element) => {
                element.remove();
            });
        },
        getCursorPosition(e) {
            let x = 0, y = 0;
            e = e || window.event;
            const a = this.img.getBoundingClientRect();
            x = e.pageX - a.left;
            y = e.pageY - a.top;
            x = x - window.pageXOffset;
            y = y - window.pageYOffset;
            return { x: x, y: y };
        },
        moveMegnify(e, cx, cy) {
            e.preventDefault();
            const pos = this.getCursorPosition(e);
            let x = pos.x - (this.megnify.offsetWidth / 2);
            let y = pos.y - (this.megnify.offsetHeight / 2);
            if (x > this.img.width - this.megnify.offsetWidth) { x = this.img.width - this.megnify.offsetWidth; }
            if (x < 0) { x = 0; }
            if (y > this.img.height - this.megnify.offsetHeight) { y = this.img.height - this.megnify.offsetHeight; }
            if (y < 0) { y = 0; }
            this.megnify.style.left = x + "px";
            this.megnify.style.top = y + "px";
            this.zoomContainer.style.backgroundPosition = "-" + (x * cx) + "px -" + (y * cy) + "px";
        }


    },
    computed: {
        selectedAsset() {
            return this.$store.getters.getStandardAssets[this.$store.getters.getcurrentIndex];
        }
    }


}
</script>
<style>
.img-zoom-lens {
    position: absolute;
    border: 1px solid #d4d4d4;
    width: 150px;
    height: 150px;
    border: solid 2px red;
    background-color: rgb(219, 219, 252);
    opacity: 0.5;
    cursor: pointer;
}
</style>
<style scoped>
.image-container {
    min-width: 249px;
    min-height: 300px;
}

.playback-icon {
    width: 0;
    height: 0;
    border-width: 5px 0 5px 10px;
}

.slider {
    width: 430px;
    height: 430px;
}

@media only screen and (max-width: 450px) {
    .slider {
        width: 96%;
    }
}</style>
  