<template>
    <div class="flex flex-col gap-y-2 md:mt-3">
        <div class="flex justify-between">
            <span class="text-slate-600">{{ brandName }}</span>
            <span class="text-green-700">Hurry Limited Stock</span>
        </div>
        <span class="font-semibold text-lg  block">{{ brandFullName }}</span>
        <span class="font-semibold text-lg block"> €{{ price }}</span>
        <hr class="w-full">
        <div class="text-xs">
            <span class="font-bold">Sim:</span>
            <span> {{ sim }}</span>
        </div>
        <div class="text-xs">
            <span class="font-bold">Condition:</span>
            <span> {{ condition }}</span>
        </div>
        <div class="text-xs">
            <span class="font-bold">Colour:</span>
            <span> {{ colour }}</span>
        </div>
        <div class="text-xs">
            <span class="font-bold">Network:</span>
            <span> {{ network }}</span>
        </div>
        <div class="text-xs">
            <span class="font-bold">Storage:</span>
            <span> {{ storage }}</span>
        </div>
        <hr>
        <div class="flex gap-x-3 center md:self-center">
            <span class="cursor-pointer" @click="items = items - 1">-</span>
            <div class="w-8 flex justify-center items-center text-xs bg-gray-300">{{ getItems }}</div>
            <span class="cursor-pointer" @click="items = items + 1">+</span>
        </div>
        <button class="h-8 w-full max-w-lg md:w-4/5 md:self-center bg-amber-400 border-none rounded-sm mt-3 font-bold">Add to
            Basket</button>
    </div>
</template>
  
<script>
export default {
    name: 'product-detail',
    data() {
        return {
            brandName: 'SAMSUNG',
            brandFullName: 'Samsung Galaxy S23 Plus 5G',
            price: '880.00',
            items: 1,
            sim: 'DUAL SIM',
            condition: 'LIKE NEW',
            network: "UNLOCKED",
            colour: 'LAVENDER',
            storage: '512 GB'
        }
    },
    computed: {
        getItems() {
            if (this.items < 0) return 0;
            return this.items
        }
    }

}
</script>

  