<template>
  <div class="product-container">
    <Thumbnail />
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
  components:{
    Thumbnail,
    Slider,
    ProductDetail
  }
 
}
</script>


<style scoped>
.product-container{
  display: flex;
  flex-wrap: wrap;
  column-gap: 4%;
  padding-top: 60px;
}
.slider{
  width: 422px;
}
.product-detail{
  width: 544px;
}


</style>
