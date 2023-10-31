<template>
  <div class="product-container">
    <Thumbnail class="thumbnail-container" />
    <Slider class="slider"></Slider>
    <ProductDetail class="product-detail"></ProductDetail>
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
  }

}
</script>

<style scoped>
.product-container {
  display: flex;
  flex-wrap: wrap;
  column-gap: 4%;
  padding-top: 60px;
}

.slider {
  width: 422px;
}

.product-detail {
  width: 544px;
  padding: 16px;
}

.thumbnail-container {
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  height: 70vh;
  min-width: 120px;
  align-items: center;
  padding-top: 8px;
}

@media only screen and (max-width: 1231px) {
  .product-container {
    justify-content: center;
  }

  .product-detail {
    width: 100%;
  }
}

@media only screen and (max-width: 768px) {
  .product-container {
    flex-direction: column;
    align-items: center;
    padding-top: 12px;
  }

  .slider {
    max-width: 100%;
  }

  .thumbnail-container {
    flex-direction: row;
    height: auto;
    margin-bottom: 20px;
    column-gap: 16px;
    row-gap: 16px;
    flex-wrap: wrap;
  }

  .product-detail {
    padding: 2px;
    padding-bottom: 12px;
  }
}</style>
