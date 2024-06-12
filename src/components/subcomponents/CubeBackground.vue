<template>
    <template v-for="(n, index) in parseInt(props.cubesAmount)" :key="index">
        <div class="cube"></div>
    </template>
</template>

<script setup>
    const props = defineProps({
        cubesAmount: Number
    })
</script>

<style>
.cube {
  position: absolute;
  top: 80vh;
  left: 45vw;
  width: 10px;
  height: 10px;
  border: solid 1px #FFF;
  transform-origin: top left;
  transform: scale(0) rotate(0deg) translate(-50%, -50%);
  animation: cube 12s ease-in forwards infinite;
  z-index:10;
}
.cube:nth-child(2n) {
  border-color: #FFF ;
}
.cube:nth-child(2) {
  animation-delay: 1s;
  left: 25vw;
  top: 40vh;
}
.cube:nth-child(3) {
  animation-delay: 2s;
  left: 75vw;
  top: 50vh;
}
.cube:nth-child(4) {
  animation-delay: 3s;
  left: 90vw;
  top: 10vh;
}
.cube:nth-child(5) {
  animation-delay: 4s;
  left: 10vw;
  top: 85vh;
}
.cube:nth-child(6) {
  animation-delay: 5s;
  left: 50vw;
  top: 60vh;
}
.cube:nth-child(7) {
  animation-delay: 6s;
  left: 10vw;
  top: 10vh;
}
.cube:nth-child(8) {
  animation-delay: 7s;
  left: 90vw;
  top: 90vh;
}
.cube:nth-child(9) {
  animation-delay: 8s;
  left: 90vw;
  top: 45vh;
}
.cube:nth-child(10) {
  animation-delay: 9s;
  left: 5vw;
  top: 45vh;
}
/* Animate Background*/
@keyframes Gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
@keyframes cube {
  from {
    transform: scale(0) rotate(0deg) translate(-50%, -50%);
    opacity: 1;
  }
  to {
    transform: scale(20) rotate(960deg) translate(-50%, -50%);
    opacity: 0;
  }
}
</style>