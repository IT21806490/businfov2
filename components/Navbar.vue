<template>
  <nav
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      isScrolled
        ? 'bg-white shadow-lg py-3'
        : 'bg-white/95 backdrop-blur-sm py-4'
    ]"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between">
        
        <!-- Logo -->
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
            <Bus class="text-white" :size="24" />
          </div>
          <div>
            <h1 class="text-xl font-bold text-gray-900">Businfo.click</h1>
            <p class="text-xs text-gray-500 hidden sm:block">Sri Lanka's #1 Bus Guide</p>
          </div>
        </div>

        <!-- Desktop Menu -->
        <div class="hidden md:flex items-center space-x-6">
          <NuxtLink to="/" class="text-gray-700 hover:text-blue-600 font-medium">Home</NuxtLink>
          <NuxtLink to="/normalfare" class="text-gray-700 hover:text-blue-600 font-medium">Fares</NuxtLink>
          <NuxtLink to="/findroutes" class="text-gray-700 hover:text-blue-600 font-medium">Routes</NuxtLink>
          <NuxtLink to="/normalwaytimes" class="text-gray-700 hover:text-blue-600 font-medium">Timetables</NuxtLink>

          <NuxtLink
            to="/normalfare"
            class="px-5 py-2.5 rounded-xl font-semibold text-white 
            bg-gradient-to-r from-blue-600 via-blue-700 to-blue-900 
            shadow-md hover:shadow-lg transition-all"
          >
            Normal Fares
          </NuxtLink>

          <NuxtLink
            to="/highwayfare"
            class="px-5 py-2.5 rounded-xl font-semibold text-white 
            bg-gradient-to-r from-orange-600 via-orange-700 to-orange-900 
            shadow-md hover:shadow-lg transition-all"
          >
            Highway Fares
          </NuxtLink>
        </div>

        <!-- Mobile Menu Toggle -->
        <button
          class="md:hidden p-2 text-gray-700"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor">
            <path
              v-if="isMobileMenuOpen"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
            <path
              v-else
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      <!-- Mobile Menu -->
      <div v-if="isMobileMenuOpen" class="md:hidden mt-4 pb-4 space-y-3">
        <NuxtLink to="/" class="block text-gray-700 hover:text-blue-600 font-medium">Home</NuxtLink>
        <NuxtLink to="/normalfare" class="block text-gray-700 hover:text-blue-600 font-medium">Fares</NuxtLink>
        <NuxtLink to="/findroutes" class="block text-gray-700 hover:text-blue-600 font-medium">Routes</NuxtLink>
        <NuxtLink to="/normalwaytimes" class="block text-gray-700 hover:text-blue-600 font-medium">Timetables</NuxtLink>

        <NuxtLink
          to="/normalfare"
          class="block px-5 py-2.5 rounded-xl font-semibold text-white text-center 
          bg-gradient-to-r from-blue-600 via-blue-700 to-blue-900 shadow-md 
          hover:shadow-lg transition-all"
        >
          Normal Fares
        </NuxtLink>

        <NuxtLink
          to="/highwayfare"
          class="block px-5 py-2.5 rounded-xl font-semibold text-white text-center 
          bg-gradient-to-r from-orange-600 via-orange-700 to-orange-900 shadow-md 
          hover:shadow-lg transition-all"
        >
          Highway Fares
        </NuxtLink>
      </div>

    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { Bus } from "lucide-vue-next"; // FIXED: correct lucide icon import

const isScrolled = ref(false);
const isMobileMenuOpen = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>
