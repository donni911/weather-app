<template>
  <div class="c-counter">
    <transition mode="out-in" name="fade-up">
      <span :key="count" class="c-counter__count"> {{ count }}</span>
    </transition>
  </div>
</template>

<script>
export default {
  props: ["count"],
};
</script>
