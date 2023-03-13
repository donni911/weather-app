<template>
  <div>
    <transition name="fade">
      <div v-if="modalIsOpen">
        <div class="c-modal-overlay" @click="closeModal"></div>
        <div class="c-modal">
          <h2 class="c-modal-title">
            <slot name="title"></slot>
          </h2>
          <p class="c-modal-description">
            <slot name="description"></slot>
          </p>
          <button class="c-modal-btn c-modal-btn--submit" @click="confirmModal">
            Confirm
          </button>
          <button class="c-modal-btn c-modal-btn--decline" @click="closeModal">
            Cancel
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: ["modalIsOpen"],

  methods: {
    closeModal() {
      this.$emit("closeModal");
    },

    confirmModal() {
      this.closeModal();
      this.$emit("modal-confirmed");
    },
  },
};
</script>
