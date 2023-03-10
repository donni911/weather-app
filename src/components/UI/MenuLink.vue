<template>
  <li class="c-header__item">
    <router-link class="c-header__link" :to="{ name: item.linkName }">
      <div class="c-svg">
        <font-awesome-icon :icon="item.icon" />
      </div>
      {{ item.name }}</router-link
    >
    <counter :count="3" class="ml-auto z-10" />
  </li>
</template>

<script>
import Counter from "./Counter.vue";

export default {
  props: ["item"],
  components: {
    Counter,
  },
};
</script>

<style scoped></style>
