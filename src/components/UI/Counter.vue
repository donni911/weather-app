<template>
  <div class="c-counter">
    <transition mode="out-in">
      <span :key="computedCounter" class="c-counter__count">
        {{ computedCounter }}</span
      >
    </transition>
  </div>
</template>

<script>
export default {
  props: ["count"],

  computed: {
    computedCounter() {
      return this.$props.count > 99 ? "99+" : this.$props.count;
    },
  },
};
</script>

<style>
.v-enter-from {
  transform: translateY(-100%);
}

.v-enter-active,
.v-leave-active {
  transition: var(--tansition);
  transition-property: opacity, transform;
  transition-delay: 150ms;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
