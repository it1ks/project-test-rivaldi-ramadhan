<template>
  <div>
    <Navbar />
    <BannerSection bannerImage="/public/assets/img/background.jpg" />
    <PostGrid class="max-w-[1200px] m-auto" />
    <Footer />
  </div>
</template>

<script setup>
import Navbar from "./components/Navbar.vue";
import BannerSection from "./components/BannerSection.vue";
import PostGrid from "./components/PostGrid.vue";
import Footer from "./components/Footer.vue";
</script>

<style>
body {
  font-family: "Arial", sans-serif;
  background-color: #f8f8f8;
}
</style>
