<template>
  <div class="flex items-center space-x-2">
    <button
      class="pagination-button"
      :disabled="currentPage === 1"
      @click="changePage(1)"
    >
      «
    </button>
    <button
      class="pagination-button"
      :disabled="currentPage === 1"
      @click="changePage(currentPage - 1)"
    >
      ‹
    </button>
    <button
      v-for="page in paginationRange"
      :key="page"
      :class="['pagination-button', { active: page === currentPage }]"
      @click="changePage(page)"
    >
      {{ page }}
    </button>
    <button
      class="pagination-button"
      :disabled="currentPage === totalPages"
      @click="changePage(currentPage + 1)"
    >
      ›
    </button>
    <button
      class="pagination-button"
      :disabled="currentPage === totalPages"
      @click="changePage(totalPages)"
    >
      »
    </button>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(["page-changed"]);

const changePage = (page) => {
  if (page !== props.currentPage && page >= 1 && page <= props.totalPages) {
    emit("page-changed", page);
  }
};

const paginationRange = computed(() => {
  const totalPageNumbers = 3;
  let startPage = Math.max(1, props.currentPage - 1);
  let endPage = Math.min(props.totalPages, startPage + totalPageNumbers - 1);

  if (endPage - startPage < totalPageNumbers - 1) {
    startPage = Math.max(1, endPage - totalPageNumbers + 1);
  }

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return pages;
});
</script>

<style scoped>
.pagination-button {
  background-color: #f5f5f5;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.pagination-button:hover:not([disabled]) {
  background-color: #e0e0e0;
}

.pagination-button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.active {
  background-color: #ff6f00;
  color: white;
}
</style>
