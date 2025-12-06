<template>
  <footer class="bg-gray-900 text-gray-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">

        <!-- Branding -->
        <div class="space-y-4">
          <div class="flex items-center space-x-2">
            <div class="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
              <Bus class="text-white" :size="24" />
            </div>
            <h3 class="text-xl font-bold text-white">Businfo.click</h3>
          </div>

          <p class="text-sm text-gray-400">
            Your trusted companion for hassle-free bus travel across Sri Lanka.
            Real-time information at your fingertips.
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="text-white font-semibold mb-4">Quick Links</h4>
          <ul class="space-y-2 text-sm">
            <li><NuxtLink to="/" class="hover:text-blue-400">Home</NuxtLink></li>
            <li><NuxtLink to="/normalfare" class="hover:text-blue-400">Find Fares</NuxtLink></li>
            <li><NuxtLink to="/findroutes" class="hover:text-blue-400">Bus Routes</NuxtLink></li>
            <li><NuxtLink to="/about" class="hover:text-blue-400">About Us</NuxtLink></li>
          </ul>
        </div>

        <!-- Services -->
        <div>
          <h4 class="text-white font-semibold mb-4">Services</h4>
          <ul class="space-y-2 text-sm">
            <li><NuxtLink to="/normalfare" class="hover:text-blue-400">Normal Way Fares</NuxtLink></li>
            <li><NuxtLink to="/highwayfare" class="hover:text-blue-400">Expressway Fares</NuxtLink></li>
            <li><NuxtLink to="/findroutes" class="hover:text-blue-400">Route Planning</NuxtLink></li>
            <li><NuxtLink to="/contact" class="hover:text-blue-400">Contact Support</NuxtLink></li>
          </ul>
        </div>

        <!-- Legal -->
        <div>
          <h4 class="text-white font-semibold mb-4">Legal</h4>
          <ul class="space-y-2 text-sm">
            <li><NuxtLink to="/privacy" class="hover:text-blue-400">Privacy Policy</NuxtLink></li>
            <li><NuxtLink to="/terms" class="hover:text-blue-400">Terms of Service</NuxtLink></li>
            <li><NuxtLink to="/contact" class="hover:text-blue-400">Contact Us</NuxtLink></li>
          </ul>
        </div>
      </div>

      <!-- Footer Bottom -->
      <div class="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
        <p>© {{ currentYear }} Businfo.click. All rights reserved. Made with ❤️ for Sri Lankan travelers</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { Bus } from "lucide-vue-next";

const currentYear = new Date().getFullYear();
</script>
