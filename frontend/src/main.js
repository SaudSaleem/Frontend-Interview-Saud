import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'

Vue.use(Vuex)
Vue.config.productionTip = false

const store = new Vuex.Store({
  state: {
    currentIndex: 0,
    standardImages:[ { src: require('./assets/product-image.jpeg'), alt: 'product image' },
    { src: require('./assets/product-image-back.jpeg'), alt: 'product image back' },
    { src: require('./assets/product-image-front.jpeg'), alt: 'product image front' },],
    largeImages: [
      { src: require('./assets/product-image-large.jpeg'), alt: 'product image large' },
      { src: require('./assets/product-image-back-large.jpeg'), alt: 'product image back large' },
      { src: require('./assets/product-image-front-large.jpeg'), alt: 'product image front large' },
    ],
    thumbnailImages: [
      { src: require('./assets/product-image-thumbnail.jpeg'), alt: 'product image thumbnail' },
      { src: require('./assets/product-image-back-thumbnail.jpeg'), alt: 'product image back thumbnail' },
      { src: require('./assets/product-image-front-thumbnail.jpeg'), alt: 'product image front thumbnail' },
    ]
  },
  mutations: {
    setCurrentIndex (state, index) {
      state.currentIndex = index
    }
  },
  getters: {
    getStandardImages: state => state.standardImages,
    getLargeImages:  state => state.largeImages,
    getThumbnailImages:  state => state.thumbnailImages,
    getcurrentIndex: state => state.currentIndex
  }

})


new Vue({
  render: h => h(App),
  store: store,
}).$mount('#app')
