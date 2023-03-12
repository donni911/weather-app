<template>
  <div class="c-card__block">
    <transition name="fade" mode="out-in">
      <h4 class="c-card__block__heading" :key="title">{{ title }}</h4>
    </transition>
    <transition name="fade" mode="out-in">
      <span class="c-card__block__description" :key="description">
        {{ description }}</span
      >
    </transition>
  </div>
</template>

<script>
export default {
  props: ["title", "description"],
};
</script>

<style scoped></style>
