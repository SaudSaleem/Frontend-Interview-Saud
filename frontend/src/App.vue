<template>
  <div class="py-0 box-border bg-slate-100 text-slate-950 w-full">
    <div>
      <div class="h-32 w-screen bg-white flex items-center pl-24 sm:pl-2">
        <img class="h-16" src="./assets/tbps-logo.webp" alt="company logo">
      </div>
      <div>
        <Product />
      </div>
    </div>
  </div>
</template>

<script>
import Product from './components/Product.vue'
import "./assets/tailwind.css"
export default {
  name: 'App',
  components: {
    Product
  }
}
</script>
