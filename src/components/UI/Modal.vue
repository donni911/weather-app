<template>
  <div style="padding: 0px 20px">
    <button @click="showModal = true">Open Modal</button>
    <transition name="fade">
      <div v-if="modalIsOpen">
        <div class="c-modal-overlay" @click="closeModal"></div>
        <div class="c-modal">
          <h2 class="c-modal-title">Oh ooh...</h2>
          <p class="c-modal-description">
            You can add only five(5) blocks ! <br />
          </p>

          <p class="c-modal-description">
            If you want to add a new one, you should delete one that you have.
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
