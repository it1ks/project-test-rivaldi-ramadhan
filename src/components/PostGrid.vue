<template>
  <div class="container mx-auto px-4 mt-10">
    <div
      class="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-4 sm:space-y-0"
    >
      <p class="font-medium text-sm">
        Showing {{ (currentPage - 1) * perPage + 1 }} -
        {{ Math.min(currentPage * perPage, totalItems) }} of {{ totalItems }}
      </p>
      <div
        class="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4"
      >
        <div class="flex items-center space-x-2">
          <label for="show-per-page" class="text-sm font-medium"
            >Show per page:</label
          >
          <select
            v-model="perPage"
            id="show-per-page"
            @change="fetchPosts"
            class="form-select"
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>
        <div class="flex items-center space-x-2">
          <label for="sort" class="text-sm font-medium">Sort by:</label>
          <select
            v-model="sortBy"
            id="sort"
            @change="fetchPosts"
            class="form-select"
          >
            <option value="-published_at">Newest</option>
            <option value="published_at">Oldest</option>
          </select>
        </div>
      </div>
    </div>

    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      <div
        v-for="post in posts"
        :key="post.id"
        class="flex flex-col rounded-xl bg-white text-gray-700 shadow-md overflow-hidden"
      >
        <div class="relative overflow-hidden rounded-t-xl">
          <img
            :src="post.small_image[0]?.url || 'fallback-image.jpg'"
            alt="Post Thumbnail"
            class="w-full h-40 object-cover"
            @error="handleImageError"
          />
        </div>
        <div class="p-4">
          <p class="text-sm text-gray-500 mb-2">
            {{ formatDate(post.published_at) }}
          </p>
          <h4 class="text-base font-semibold text-gray-700 line-clamp-3">
            {{ post.title }}
          </h4>
        </div>
      </div>
    </div>

    <div class="mt-6 flex justify-center">
      <Pagination
        :currentPage="currentPage"
        :totalPages="totalPages"
        @page-changed="fetchPosts"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import axios from "axios";
import Pagination from "./Pagination.vue";

const currentPage = ref(1);
const perPage = ref(10);
const sortBy = ref("-published_at");
const totalPages = ref(0);
const posts = ref([]);
const totalItems = ref(0);

const fetchPosts = (page = currentPage.value) => {
  axios
    .get("https://suitmedia-backend.suitdev.com/api/ideas", {
      params: {
        "page[number]": page,
        "page[size]": perPage.value,
        append: ["small_image", "medium_image"],
        sort: sortBy.value,
      },
    })
    .then((response) => {
      posts.value = response.data.data;
      totalItems.value = response.data.meta.total;
      totalPages.value = Math.ceil(totalItems.value / perPage.value);
      currentPage.value = page;
    })
    .catch((error) => {
      console.error("Error fetching posts:", error);
    });
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const handleImageError = (event) => {
  event.target.src = "fallback-image.jpg";
};

onMounted(() => {
  fetchPosts();
});

watch([sortBy, perPage], () => {
  fetchPosts();
});
</script>

<style scoped>
.form-select {
  padding: 0.5rem;
  border-radius: 0.375rem;
  border: 1px solid #d1d5db;
  outline: none;
}

.form-select:focus {
  border-color: #6b7280;
  box-shadow: 0 0 0 1px #6b7280;
}

label {
  margin-right: 0.5rem;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
