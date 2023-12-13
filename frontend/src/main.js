import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'


Vue.use(Vuex)
Vue.config.productionTip = false

const store = new Vuex.Store({
  state: {
    currentIndex: 0,
    standardAssets:[ { src: require('./assets/product-image.jpeg'), alt: 'product image', id:"img1", type:'image',  _for:'image', detail: {title: "Samsung Galaxy Tab S9 FE+ Tablet with S Pen, 128GB, Long-lasting Battery, Gray, 3 Year Manufacturer Extended Warranty (UK Version)", color: 'Gray', size: '128GB', pattern: 'S9FE+'} },
    { src: require('./assets/product-image-back.jpeg'), alt: 'product image back', id:"img2", type:'image',  _for:'image', detail: {title: "Samsung Galaxy Tab S9 FE+ Tablet with S Pen, 128GB, Long-lasting Battery, Gray, 3 Year Manufacturer Extended Warranty (UK Version)", color: 'Gray', size: '128GB', pattern: 'S9FE+'} },
    { src: require('./assets/product-image-front.jpeg'), alt: 'product image front', id:"img3", type:'image',  _for:'image', detail: {title: "Samsung Galaxy Tab S9 FE+ Tablet with S Pen, 128GB, Long-lasting Battery, Gray, 3 Year Manufacturer Extended Warranty (UK Version)", color: 'Gray', size: '128GB', pattern: 'S9FE+'} },
    { src: require('./assets/video1.png'), videoSrc: require('./assets/videos/single-click-zoom-desktop.mp4'), alt: 'product image front', id:"img4", type:'image', _for:'video', detail: {title: "Samsung  Tab S9 FE+ plus", subTitle: 'Sumsung Mobile (UK) - MI', color: 'Gray', size: '128GB', pattern: 'S9FE+'} },
  ],
    largeImages: [
      { src: require('./assets/product-image-large.jpeg'), alt: 'product image large', type:'image' },
      { src: require('./assets/product-image-back-large.jpeg'), alt: 'product image back large', type:'image' },
      { src: require('./assets/product-image-front-large.jpeg'), alt: 'product image front large', type:'image' },
    ],
    thumbnailImages: [
      { src: require('./assets/product-image-thumbnail.jpeg'), alt: 'product image thumbnail', type:'image' },
      { src: require('./assets/product-image-back-thumbnail.jpeg'), alt: 'product image back thumbnail', type:'image' },
      { src: require('./assets/product-image-front-thumbnail.jpeg'), alt: 'product image front thumbnail', type:'image' },
      { src: require('./assets/video-thumbail.png'), alt: 'product image front', id:"img4", type:'video' },
    ]
  },
  mutations: {
    setCurrentIndex (state, index) {
      // not show videos for mobile screen
      if(window.innerWidth <= 768){
        if(state.standardAssets[index] && state.standardAssets[index]._for == 'video') return;
      }
      state.currentIndex = index
    }
  },
  getters: {
    getStandardAssets: state => state.standardAssets,
    getLargeImages:  state => state.largeImages,
    getThumbnailImages:  state => state.thumbnailImages,
    getcurrentIndex: state => state.currentIndex
  }

})

new Vue({
  render: h => h(App),
  store: store,
}).$mount('#_app')
