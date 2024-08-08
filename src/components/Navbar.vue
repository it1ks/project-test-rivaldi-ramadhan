<template>
  <header
    :class="[
      'fixed w-full top-0 left-0 z-50 transition-all duration-300 ease-in-out',
      {
        '-translate-y-full': isHidden,
        'bg-orange-500 bg-opacity-70': isScrollingUp && !atTop,
        'bg-orange-500 bg-opacity-100': !isScrollingUp || atTop,
      },
    ]"
  >
    <nav class="flex items-center justify-between py-4 px-4 md:px-8">
      <img
        src="/assets/img/logo-white.png"
        alt="Logo"
        class="h-8 md:h-10 ml-2 md:ml-12"
      />

      <!-- Hamburger Menu Icon -->
      <div class="md:hidden">
        <button @click="toggleMenu" class="focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      <!-- Menu Items for Desktop -->
      <ul class="hidden md:flex space-x-4 md:space-x-9 text-white font-light">
        <li>
          <a href="#" class="relative group">
            Work
            <span
              class="absolute left-0 bottom-[-2px] w-full h-0.5 bg-white transform scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100"
            ></span>
          </a>
        </li>
        <li>
          <a href="#" class="relative group">
            About
            <span
              class="absolute left-0 bottom-[-2px] w-full h-0.5 bg-white transform scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100"
            ></span>
          </a>
        </li>
        <li>
          <a href="#" class="relative group">
            Services
            <span
              class="absolute left-0 bottom-[-2px] w-full h-0.5 bg-white transform scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100"
            ></span>
          </a>
        </li>
        <li>
          <a href="#" class="relative group">
            Ideas
            <span
              class="absolute left-0 bottom-[-2px] w-full h-0.5 bg-white transform scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100"
            ></span>
          </a>
        </li>
        <li>
          <a href="#" class="relative group">
            Careers
            <span
              class="absolute left-0 bottom-[-2px] w-full h-0.5 bg-white transform scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100"
            ></span>
          </a>
        </li>
        <li>
          <a href="#" class="relative group">
            Contact
            <span
              class="absolute left-0 bottom-[-2px] w-full h-0.5 bg-white transform scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100"
            ></span>
          </a>
        </li>
      </ul>

      <!-- Menu Items for Mobile -->
      <ul
        v-if="isMenuOpen"
        class="absolute top-full left-0 w-full bg-orange-500 bg-opacity-90 text-white font-light flex flex-col items-center space-y-4 py-4 md:hidden"
      >
        <li><a href="#" @click="toggleMenu">Work</a></li>
        <li><a href="#" @click="toggleMenu">About</a></li>
        <li><a href="#" @click="toggleMenu">Services</a></li>
        <li><a href="#" @click="toggleMenu">Ideas</a></li>
        <li><a href="#" @click="toggleMenu">Careers</a></li>
        <li><a href="#" @click="toggleMenu">Contact</a></li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      lastScrollTop: 0,
      isHidden: false,
      isScrollingUp: false,
      atTop: true,
      isMenuOpen: false,
    };
  },
  methods: {
    handleScroll() {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      this.isHidden = scrollTop > this.lastScrollTop;
      this.isScrollingUp = scrollTop < this.lastScrollTop;
      this.atTop = scrollTop === 0;
      this.lastScrollTop = scrollTop;
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style scoped>
header {
  transition: background-color 0.3s ease-in-out, transform 0.3s ease-in-out;
}

a {
  position: relative;
}

a span {
  transition: transform 0.3s ease-in-out;
}
</style>
