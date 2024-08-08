<template>
  <div
    class="relative min-h-[500px] bg-center bg-cover bg-no-repeat z-10"
    style="background-image: url('/assets/img/background.jpg')"
  >
    <div
      class="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
      :style="{ transform: `translateY(${scrollPosition * 0.3}px)` }"
    >
      <h1 class="text-xl md:text-3xl font-bold text-white leading-tight">
        Ideas
      </h1>
      <p class="text-sm md:text-lg text-white mt-2">
        Where all our great things begin
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      scrollPosition: 0,
    };
  },
  methods: {
    handleScroll() {
      this.scrollPosition = window.scrollY;
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    this.handleScroll();
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style scoped>
.relative {
  clip-path: polygon(0 0, 100% 0, 100% 60%, 0 100%);
}
</style>
