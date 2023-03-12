<template>
  <button
    @click="$emit('clickEvent')"
    class="c-burger"
    :class="{ active: isOpen }"
  >
    <div class="c-burger__icon">
      <font-awesome-icon icon="fa-solid fa-bars" />
    </div>
  </button>
</template>

<script>
export default {
  props: ["isOpen"],
};
</script>
