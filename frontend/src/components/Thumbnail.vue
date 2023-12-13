<template>
    <div>
        <img :src="img.src" alt="thumbnail" :class=_class />
    </div>
</template>
  
<script>
export default {
    name: 'thumbnail-component',
    props: {
        img:{
            
        },
        _class:{
            default:'w-10 h-full'
        },
    },
}
</script>

  