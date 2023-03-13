<template>
  <div class="c-switcher__wrapper">
    <input
      @input="$emit('clickEvent')"
      :checked="modelValue"
      class="c-switcher"
      type="checkbox"
      role="switch"
      id="switch"
    />
    <label for="switch" class="c-switcher__label">Toggle</label>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: { type: Boolean },
  },
};
</script>
