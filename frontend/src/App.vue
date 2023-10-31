<template>
  <div id="app">
    <div class="inner-container">
      <div class="header">
        <img src="./assets/tbps-logo.webp" alt="header image">
      </div>
      <div class="content-area">
        <Product />
      </div>
    </div>
  </div>
</template>

<script>
import Product from './components/Product.vue'

export default {
  name: 'App',
  components: {
    Product
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: #f7f7f7;
  box-sizing: border-box;
  padding: 0px 6px 0px 6px;
}

.inner-container {
  width: 100%;
  background-color: #e9ecec;
}

.header {
  width: 100%;
  height: 120px;
  background-color: white;
  padding-left: 15%;
  display: flex;
  align-items: center;
}

.header img {
  height: 70px;
}

.display-block {
  display: block;
}

.bold {
  font-weight: bold;
}

.pointer {
  cursor: pointer;
}
@media only screen and (max-width: 768px){

  .header {
    padding-left: 0px;
    justify-content: center;
  }
}

</style>
