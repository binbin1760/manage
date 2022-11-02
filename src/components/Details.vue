<template>
    <transition name="vdetails" appear>
        <div class="details">
             <slot></slot>
             <slot name="showdata"></slot>
        </div>
    </transition>
</template>

<script>
export default {
    data() {
        return {
            test:"1231"
        }
    },

}
</script>

<style>
    .details{
        width: 600px;
        height:848px;
        background: aqua;
        position: absolute;
        top: 0;
        right: 0;
    }
    /* 过度动画 */
    .vdetails-enter-active,.vdetails-leave-active{
        transition:transform .5s ease; 
    }
    .vdetails-enter,.vdetails-leave-to{
        transform: translateX(100%);  
    }
</style>