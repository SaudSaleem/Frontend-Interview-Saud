<template>
    <div class="main-container">
        <div style="display:flex; justify-content: space-between;">
            <span class="brand-name">{{ brandName }}</span>
            <span class="limited-stock">Hurry Limited Stock</span>
        </div>
        <span class="branch-full-name display-block">{{ brandFullName }}</span>
        <span class="price display-block"> €{{ price }}</span>
        <hr>
        <div class="sim">
            <span class="bold">Sim:</span>
            <span> {{ sim }}</span>
        </div>
        <div class="condition">
            <span class="bold">Condition:</span>
            <span> {{ condition }}</span>
        </div>
        <div class="colour">
            <span class="bold">Colour:</span>
            <span> {{ colour }}</span>
        </div>
        <div class="network">
            <span class="bold">Network:</span>
            <span> {{ network }}</span>
        </div>
        <div class="storage">
            <span class="bold">Storage:</span>
            <span> {{ storage }}</span>
        </div>
        <hr>
        <div class="items">
            <span class="pointer" @click="items = items - 1">-</span>
            <div class="box">{{ getItems }}</div>
            <span class="pointer" @click="items = items + 1">+</span>
        </div>
        <button class="add-to-basket">Add to Basket</button>
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
  
  
<style scoped>
.main-container {
    display: flex;
    flex-direction: column;
    row-gap: 12px;
}

hr {
    width: 100%;
}

.limited-stock {
    color: green;
}

.brand-name {
    color: rgb(137, 132, 132);
}

.branch-full-name,
.price {
    font-weight: 600;
    font-size: 18px;
}

.items {
    display: flex;
    column-gap: 12px;
}

.items .box {
    width: 35px;
    height: 25px;
    background-color: rgb(200, 195, 195);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
}

.add-to-basket {
    width: 100%;
    height: 30px;
    background-color: rgb(249, 178, 14);
    border: none;
    border-radius: 2px;
}
.sim span, .condition span, .colour span, .network span, .storage span{
    font-size: 12px;
}
</style>
  