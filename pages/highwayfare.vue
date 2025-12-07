<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { useHead } from '#app'; // Nuxt 3 SEO

// NOTE: Assuming allRoutesData and highwaySectionsData are available in the Nuxt environment
import allRoutesData from '../data/allroutes.json';
import highwaySectionsData from '../data/highway_sections.json';


// --- Icons (Assuming 'lucide-vue-next' or similar is installed) ---
import { Bus, RefreshCw, Trash2, Zap, Award, Users, AlertCircle, TrendingUp, MapPin, ChevronRight, X } from 'lucide-vue-next';


// --- SEO ---
useHead({
  title: 'Sri Lanka Expressway Bus Fare Calculator - Instant Fare Search | Businfo.click',
  meta: [
    { name: 'description', content: 'Instantly calculate accurate bus fares for all official expressway routes in Sri Lanka. Compare prices for different Expressway Service Classes (Luxury, Super Luxury, AC).' },
    { name: 'keywords', content: 'Sri Lanka expressway fare, highway bus price, E-Service fare calculator, AC Luxury bus fare, expressway route, SLTB, private bus fare, fare lookup, highway bus' },
    { property: 'og:title', content: 'Sri Lanka Expressway Bus Fare Calculator - Instant Fare Search | Businfo.click' },
    { property: 'og:description', content: 'Instantly calculate accurate bus fares for all official expressway routes in Sri Lanka. Compare prices for different Expressway Service Classes (Luxury, Super Luxury, AC).' },
    { property: 'og:type', content: 'website' },
  ],
  link: [
    { rel: 'canonical', href: 'https://businfo.click/highwayfare' },
  ],
});



// 1. State Management
const origin = ref('');
const destination = ref('');
const highwayResults = ref([]);
const loading = ref(false);
const searchAttempted = ref(false); // 👈 NEW STATE VARIABLE FOR LOGIC CONTROL
const allHighwaySections = ref([]);
const highwayMap = ref({});
const highwaySectionNameMap = ref({});
const showOriginSuggestions = ref(false);
const showDestinationSuggestions = ref(false);
const originQuery = ref('');
const destinationQuery = ref('');
const debouncedOriginQuery = ref('');
const debouncedDestinationQuery = ref('');

// 2. Template Refs
const searchCardRef = ref(null);
const originRef = ref(null);
const destinationRef = ref(null);
const debounceTimer = ref(null);

// 3. Derived State
const expressRoutesCount = computed(() => {
  return allRoutesData.filter((route) =>
    String(route.Route_No || "").startsWith("EX")
  ).length;
});

const sectionsCoveredCount = computed(() => highwaySectionsData.length);

// 4. Utility Functions (trimmed for brevity)
const normalizeRouteNo = (routeNo) => {
  if (!routeNo) return "";
  let str = String(routeNo).trim();
  const prefixMatch = str.match(/^([A-Za-z\s]+)?(.*)$/);
  let prefix = prefixMatch[1] ? prefixMatch[1].trim() : "";
  let mainPart = prefixMatch[2] || "";
  if (mainPart.startsWith("-") || mainPart.startsWith("/")) {
    mainPart = mainPart.slice(1);
  }
  const parts = mainPart.split(/([-/])/);
  const normalizedParts = parts.map((part) => {
    if (part === "-" || part === "/") return part;
    const match = part.match(/^0*(\d+)(.*)$/);
    if (match) return match[1] + (match[2] || "");
    return part;
  });
  return (prefix ? prefix + " " : "") + normalizedParts.join("");
};

const debounce = (func, delay) => {
  return (...args) => {
    clearTimeout(debounceTimer.value);
    debounceTimer.value = setTimeout(() => func.apply(null, args), delay);
  };
};

const getFilteredSuggestions = (query, allOptions) => {
  if (!query.trim()) return allOptions;
  const lowerCaseQuery = query.toLowerCase();
  const exactMatches = [];
  const startsWithMatches = [];
  const containsMatches = [];
  for (const section of allOptions) {
    const sectionLower = section.toLowerCase();
    if (sectionLower === lowerCaseQuery) {
      exactMatches.push(section);
    } else if (sectionLower.startsWith(lowerCaseQuery)) {
      startsWithMatches.push(section);
    } else if (sectionLower.includes(lowerCaseQuery)) {
      containsMatches.push(section);
    }
  }
  return [...exactMatches, ...startsWithMatches, ...containsMatches].slice(0, 50);
};

// 5. Watchers
const debouncedUpdateOrigin = debounce(() => {
  debouncedOriginQuery.value = originQuery.value;
}, 150);

const debouncedUpdateDestination = debounce(() => {
  debouncedDestinationQuery.value = destinationQuery.value;
}, 150);

watch(originQuery, debouncedUpdateOrigin);
watch(destinationQuery, debouncedUpdateDestination);

// 6. Filtered Suggestions
const filteredOriginSections = computed(() =>
  getFilteredSuggestions(debouncedOriginQuery.value, allHighwaySections.value)
);

const filteredDestinationSections = computed(() =>
  getFilteredSuggestions(debouncedDestinationQuery.value, allHighwaySections.value)
);

// 7. Event Handlers
const selectOrigin = (val) => {
  origin.value = val;
  originQuery.value = val;
  showOriginSuggestions.value = false;
};

const selectDestination = (val) => {
  destination.value = val;
  destinationQuery.value = val;
  showDestinationSuggestions.value = false;
};

const swapOriginDestination = () => {
  const tempOrigin = origin.value;
  const tempOriginQuery = originQuery.value;
  origin.value = destination.value;
  originQuery.value = destinationQuery.value;
  destination.value = tempOrigin;
  destinationQuery.value = tempOriginQuery;
};

const clearSelections = () => {
  origin.value = '';
  destination.value = '';
  originQuery.value = '';
  destinationQuery.value = '';
  highwayResults.value = [];
  searchAttempted.value = false; // Reset search attempt
  showOriginSuggestions.value = false;
  showDestinationSuggestions.value = false;
};

const handleOriginChange = (e) => {
  const value = e.target.value;
  originQuery.value = value;
  origin.value = value;
  showOriginSuggestions.value = true;
};

const handleDestinationChange = (e) => {
  const value = e.target.value;
  destinationQuery.value = value;
  destination.value = value;
  showDestinationSuggestions.value = true;
};

const handleKeyDown = (e, type) => {
  if (e.key === "Escape") {
    if (type === "origin") showOriginSuggestions.value = false;
    else showDestinationSuggestions.value = false;
  }
};

const calculateHighwayFare = () => {
  if (!origin.value || !destination.value) {
    alert("Please select both origin and destination");
    return;
  }
  if (origin.value === destination.value) {
    alert("Origin and destination cannot be the same");
    return;
  }

  // Set the search state
  searchAttempted.value = true; // 👈 Mark search as attempted
  highwayResults.value = [];
  loading.value = true;

  setTimeout(() => {
    const upOrigin = origin.value.toUpperCase();
    const upDestination = destination.value.toUpperCase();
    const originRoutes = highwaySectionNameMap.value[upOrigin] || [];
    const destinationRoutes = highwaySectionNameMap.value[upDestination] || [];

    const possibleRoutes = {};
    originRoutes.forEach((o) => {
      const match = destinationRoutes.find((d) => d.route_no === o.route_no && d.service_type === o.service_type);
      if (match) {
        const key = `${o.route_no}-${o.service_type}`;
        possibleRoutes[key] = { route_no: o.route_no, service_type: o.service_type };
      }
    });

    const results = [];
    Object.values(possibleRoutes).forEach(({ route_no, service_type }) => {
      const fares = highwayMap.value[route_no]?.[service_type] || {};
      if (fares[upOrigin] !== undefined && fares[upDestination] !== undefined) {
        const routeInfo = allRoutesData.find(r => normalizeRouteNo(r.Route_No) === route_no);
        results.push({
          route_no,
          route_name: routeInfo ? `${routeInfo.Origin} ➜ ${routeInfo.Destination}` : "Unknown",
          highway: Math.abs(fares[upDestination] - fares[upOrigin]).toFixed(2),
          // Mapping service types for display
          service_type: service_type === "SUPER" ? "SUPER LUXURY" : service_type === "TEMP" ? "TEMPORARY SERVICE" : service_type,
        });
      }
    });

    results.sort((a, b) => a.route_no.localeCompare(b.route_no));
    highwayResults.value = results;
    loading.value = false;

    if (results.length > 0) {
      setTimeout(() => {
        if (searchCardRef.value) {
          window.scrollTo({ top: searchCardRef.value.offsetTop, behavior: 'smooth' });
        }
      }, 100);
    }
  }, 500);
};

const scrollToSearch = () => {
  if (searchCardRef.value) {
    window.scrollTo({ top: searchCardRef.value.offsetTop, behavior: 'smooth' });
  }
};

// 8. Lifecycle Hook (onMounted and onUnmounted for cleanup)
onMounted(() => {
  // Data Initialization Logic (omitted for brevity)
  const hMap = {};
  const hNameMap = {};
  const uniqueHighwaySections = new Set();
  highwaySectionsData.forEach((h) => {
    const routeNo = normalizeRouteNo(h.route_no);
    const service = h.service_type || "Unknown";
    if (!hMap[routeNo]) hMap[routeNo] = {};
    if (!hMap[routeNo][service]) hMap[routeNo][service] = {};
    hMap[routeNo][service][h.section_name.toUpperCase()] = h.fare;
    uniqueHighwaySections.add(h.section_name);
    const secKey = h.section_name.toUpperCase();
    if (!hNameMap[secKey]) hNameMap[secKey] = [];
    hNameMap[secKey].push({ route_no: routeNo, service_type: service, fare: h.fare });
  });
  highwayMap.value = hMap;
  highwaySectionNameMap.value = hNameMap;
  allHighwaySections.value = Array.from(uniqueHighwaySections).sort();

  // Handle Click Outside Logic (omitted for brevity)
  const handleClickOutside = (event) => {
    if (originRef.value && !originRef.value.contains(event.target)) showOriginSuggestions.value = false;
    if (destinationRef.value && !destinationRef.value.contains(event.target)) showDestinationSuggestions.value = false;
  };
  document.addEventListener("mousedown", handleClickOutside);
  onUnmounted(() => {
    document.removeEventListener("mousedown", handleClickOutside);
    clearTimeout(debounceTimer.value);
  });
});
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col">
    <Navbar /> 

    <section class="pt-24 pb-12 bg-gradient-to-br from-orange-600 via-orange-700 to-orange-900 text-white relative overflow-hidden">
      <div class="absolute top-0 right-0 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 left-0 w-96 h-96 bg-orange-400/20 rounded-full blur-3xl"></div>

      <div class="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div class="text-center mb-6">
          <div class="inline-block px-4 py-2 bg-orange-500/30 backdrop-blur-sm rounded-full text-sm font-medium mb-4 animate-fade-in">
            ✅ Verified Expressway Fare Data
          </div>
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 animate-slide-down">
            Instant Expressway Bus Fare Lookup
          </h1>
          <p class="text-base sm:text-lg text-orange-100 max-w-2xl mx-auto animate-fade-in">
            Access accurate and up-to-date bus fares for all official expressway routes across Sri Lanka.
          </p>
        </div>
      </div>
    </section>

    <section class="bg-white py-6 sm:py-8 shadow-sm">
      <div class="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 text-center">
        <div class="p-4 rounded-xl bg-orange-50 shadow-md hover:shadow-lg transition-all transform hover:scale-105 cursor-default">
          <Bus :size="30" class="mx-auto text-orange-600 mb-2" />
          <p class="text-xl sm:text-2xl font-bold text-orange-700">{{ expressRoutesCount }}</p>
          <p class="text-sm font-semibold text-gray-600">Total Expressway Routes</p>
        </div>
        <div class="p-4 rounded-xl bg-green-50 shadow-md hover:shadow-lg transition-all transform hover:scale-105 cursor-default">
          <Award :size="30" class="mx-auto text-green-600 mb-2" />
          <p class="text-xl sm:text-2xl font-bold text-green-700">{{ sectionsCoveredCount }}</p>
          <p class="text-sm font-semibold text-gray-600">Route Segments Mapped</p>
        </div>
        <div class="p-4 rounded-xl bg-yellow-50 shadow-md hover:shadow-lg transition-all transform hover:scale-105 cursor-default">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mx-auto text-yellow-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p class="text-xl sm:text-2xl font-bold text-yellow-700">July 04, 2025</p>
          <p class="text-sm font-semibold text-gray-600">Latest Fare Data</p>
        </div>
      </div>
    </section>

    <main class="flex-1 px-4 sm:px-6 py-8 sm:py-12">
      <div class="max-w-5xl mx-auto">
        
        <div class="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-5 sm:p-8 mb-8 sm:mb-10 border-2 border-orange-200 shadow-lg hover:shadow-xl transition-all duration-300 animate-slide-up">
          <div class="flex items-start gap-3 sm:gap-4">
            <TrendingUp class="text-orange-600 flex-shrink-0 mt-1" :size="24" />
            <div>
              <h3 class="text-lg font-semibold text-orange-800 mb-2 sm:mb-3">🚌 Route Analysis Guide</h3>
              <p class="text-gray-700 text-sm leading-relaxed">
                Enter your **Expressway Origin** and **Destination** stops below. Our system will analyze all possible **Expressway Service Classes** (e.g., Super Luxury, Luxury) to provide the most precise fare calculation.
              </p>
              <div class="bg-white rounded-lg p-3 mt-3 sm:mt-4 border border-orange-200">
                <p class="text-xs sm:text-sm text-gray-600 font-medium">
                  Quick Search Example: **KADAWATHA** ➜ **MATARA**
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          ref="searchCardRef"
          class="bg-white rounded-3xl shadow-2xl p-6 sm:p-10 mb-10 border-2 border-gray-100 hover:shadow-2xl transition-all duration-300 animate-slide-up"
        >
          <h2 class="text-xl sm:text-3xl font-extrabold text-orange-700 mb-6 sm:mb-8 text-center">
            Expressway Fare Lookup Tool
          </h2>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div class="relative" ref="originRef">
              <label class="block text-sm font-bold text-gray-800 mb-2">
                <MapPin class="inline mr-2" :size="18" />
                Origin (Expressway Starting Point)
              </label>
              <input
                type="text"
                placeholder="Enter starting location..."
                :value="originQuery"
                @input="handleOriginChange"
                @focus="showOriginSuggestions = true"
                @keydown="e => handleKeyDown(e, 'origin')"
                class="w-full border-2 border-gray-300 rounded-xl p-3 sm:p-4 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 shadow-md transition-all text-base hover:border-orange-400"
                autocomplete="off"
              />
              <ul
                v-if="showOriginSuggestions"
                class="absolute z-20 w-full max-h-48 overflow-y-auto bg-white border-2 border-gray-300 rounded-xl mt-2 shadow-xl animate-slide-down"
              >
                <template v-if="filteredOriginSections.length > 0">
                  <li
                    v-for="(sec, index) in filteredOriginSections"
                    :key="`${sec}-${index}`"
                    @click="selectOrigin(sec)"
                    class="cursor-pointer px-4 py-3 hover:bg-orange-500 hover:text-white transition-all font-medium border-b border-gray-100 last:border-b-0 transform hover:scale-105 hover:pl-6 text-sm"
                  >
                    <MapPin class="inline mr-2" :size="16" />
                    {{ sec }}
                  </li>
                </template>
                <div v-else class="px-3 py-4 text-center text-sm text-gray-500 flex items-center justify-center gap-1">
                  <AlertCircle :size="14" /> No matching expressway sections found.
                </div>
              </ul>
            </div>

            <div class="relative" ref="destinationRef">
              <label class="block text-sm font-bold text-gray-800 mb-2">
                <MapPin class="inline mr-2" :size="18" />
                Destination (Expressway End Point)
              </label>
              <input
                type="text"
                placeholder="Enter destination..."
                :value="destinationQuery"
                @input="handleDestinationChange"
                @focus="showDestinationSuggestions = true"
                @keydown="e => handleKeyDown(e, 'destination')"
                class="w-full border-2 border-gray-300 rounded-xl p-3 sm:p-4 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 shadow-md transition-all text-base hover:border-orange-400"
                autocomplete="off"
              />
              <ul
                v-if="showDestinationSuggestions"
                class="absolute z-20 w-full max-h-48 overflow-y-auto bg-white border-2 border-gray-300 rounded-xl mt-2 shadow-xl animate-slide-down"
              >
                <template v-if="filteredDestinationSections.length > 0">
                  <li
                    v-for="(sec, index) in filteredDestinationSections"
                    :key="`${sec}-${index}`"
                    @click="selectDestination(sec)"
                    class="cursor-pointer px-4 py-3 hover:bg-orange-500 hover:text-white transition-all font-medium border-b border-gray-100 last:border-b-0 transform hover:scale-105 hover:pl-6 text-sm"
                  >
                    <MapPin class="inline mr-2" :size="16" />
                    {{ sec }}
                  </li>
                </template>
                <div v-else class="px-3 py-4 text-center text-sm text-gray-500 flex items-center justify-center gap-1">
                  <AlertCircle :size="14" /> No matching expressway sections found.
                </div>
              </ul>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-8">
            <button
              @click="swapOriginDestination"
              :disabled="!origin || !destination"
              class="flex items-center justify-center px-4 sm:px-6 py-3 border border-orange-500 text-orange-600 rounded-xl font-semibold transition-colors duration-300 hover:bg-orange-50 disabled:opacity-50 disabled:cursor-not-allowed text-base w-full sm:w-auto"
            >
              <RefreshCw :size="20" class="mr-2" />
              Swap Locations
            </button>
             <button
              @click="clearSelections"
              :disabled="!origin && !destination && !searchAttempted"
              class="flex items-center justify-center px-4 sm:px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold transition-colors duration-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed text-base w-full sm:w-auto"
            >
              <Trash2 :size="20" class="mr-2" />
              Clear Search
            </button>
            <button
              @click="calculateHighwayFare"
              :disabled="!origin || !destination || loading"
              class="flex items-center justify-center px-4 sm:px-8 py-3 bg-orange-600 text-white rounded-xl font-bold text-lg shadow-lg hover:bg-orange-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed relative overflow-hidden w-full sm:w-auto"
            >
              <template v-if="loading">
                <Zap :size="20" class="animate-spin mr-2" />
                Calculating Fares...
              </template>
              <template v-else>
                <Zap :size="20" class="mr-2" />
                Calculate Route Fare
              </template>
              <span v-if="!loading" class="absolute right-0 top-0 h-full w-1/4 bg-white/20 blur-sm animate-pulse-short"></span>
            </button>
          </div>

          <div v-if="loading" class="text-center py-8">
            <div class="animate-pulse text-orange-600 font-medium">Analyzing the best expressway routes and fares...</div>
            <div class="mt-4 flex justify-center items-center">
              <div class="w-6 h-6 border-4 border-t-4 border-orange-200 border-t-orange-600 rounded-full animate-spin"></div>
            </div>
          </div>

          <div v-if="!loading && highwayResults.length > 0" class="mt-8 sm:mt-10 pt-4 sm:pt-6 border-t-2 border-orange-100">
            <h3 class="text-xl sm:text-2xl font-bold text-gray-800 mb-6 flex items-center justify-center text-center">
              <TrendingUp :size="24" class="text-green-600 mr-2 flex-shrink-0" />
              {{ highwayResults.length }} Matching Expressway Fare Options Found
            </h3>

            <div class="space-y-4">
              <div
                v-for="(result, index) in highwayResults"
                :key="index"
                class="bg-white border border-gray-200 p-4 sm:p-5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 sm:gap-4"
              >
                <div class="flex-1 w-full">
                  <div class="flex items-start mb-1 sm:mb-2">
                    <Bus :size="20" class="text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                    <div class="min-w-0 flex-1">
                        <p class="text-lg font-bold text-gray-900 truncate">
                            Route Number: {{ result.route_no }}
                        </p>
                    </div>
                    <ChevronRight :size="16" class="text-gray-400 mx-2 flex-shrink-0 mt-0.5 hidden sm:block" />
                    <span
                      :class="`text-xs font-semibold px-2 py-1 sm:px-3 rounded-full ${
                        result.service_type.includes('SUPER') ? 'bg-red-100 text-red-800' :
                        result.service_type.includes('TEMP') ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      } flex-shrink-0 mt-0.5`"
                    >
                      {{ result.service_type }}
                    </span>
                  </div>
                  <p class="text-sm text-gray-600 font-medium ml-0 sm:ml-7 truncate">
                    <MapPin :size="16" class="inline mr-1 text-gray-400" />
                    Full Route: {{ result.route_name }}
                  </p>
                </div>

                <div class="text-left sm:text-right flex flex-col items-start md:items-end w-full md:w-auto border-t md:border-t-0 pt-3 md:pt-0 mt-3 md:mt-0 border-gray-100">
                  <p class="text-sm font-medium text-gray-500">Expressway Fare</p>
                  <p class="text-2xl sm:text-3xl font-extrabold text-green-600">
                    Rs. {{ result.highway }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div v-if="!loading && highwayResults.length === 0 && searchAttempted" class="text-center py-8 sm:py-10 bg-red-50 border-2 border-red-200 rounded-xl mt-8 sm:mt-10">
            <X :size="48" class="text-red-500 mx-auto mb-4" />
            <h3 class="text-lg sm:text-xl font-bold text-red-800 mb-2">No Direct Expressway Route Found</h3>
            <p class="text-sm sm:text-base text-gray-600 max-w-lg mx-auto px-2">
              We could not find a direct expressway bus route connecting **{{ origin }}** and **{{ destination }}** in our current data. Please check the spelling or try alternative stops.
            </p>
          </div>

          <div v-if="!loading && highwayResults.length === 0 && !searchAttempted" class="text-center py-8 sm:py-10 bg-gray-50 border-2 border-gray-200 rounded-xl mt-8 sm:mt-10">
            <Users :size="48" class="text-gray-500 mx-auto mb-4" />
            <h3 class="text-lg sm:text-xl font-bold text-gray-800 mb-2">Start Your Expressway Search</h3>
            <p class="text-sm sm:text-base text-gray-600 max-w-lg mx-auto px-2">
              Please enter the **Origin** and **Destination** expressway stops and click **Calculate** to find the fare.
            </p>
          </div>
        </div>
      </div>
    </main>

    <button
      v-if="highwayResults.length > 0"
      @click="scrollToSearch"
      class="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center px-4 py-2 sm:px-5 sm:py-3 bg-red-600 text-white rounded-full shadow-2xl hover:bg-red-700 transition-all duration-300 font-bold transform active:scale-95 hover:scale-105 text-sm sm:text-base"
    >
      <RefreshCw :size="16" class="mr-2" /> New Search
    </button>

    <section class="bg-gray-100 py-8 sm:py-12">
      <div class="max-w-5xl mx-auto px-4 sm:px-6">
        <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">Frequently Asked Questions (FAQ)</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div class="bg-white p-5 sm:p-6 rounded-xl shadow-md">
            <h3 class="font-bold text-lg text-blue-700 mb-2">How current is the fare data?</h3>
            <p class="text-gray-600 text-sm">Our fare data is regularly updated based on official announcements from major bus operators and transport authorities covering **expressway** services.</p>
          </div>
          <div class="bg-white p-5 sm:p-6 rounded-xl shadow-md">
            <h3 class="font-bold text-lg text-blue-700 mb-2">What service types are calculated?</h3>
            <p class="text-gray-600 text-sm">The calculator includes fares for available **Expressway Service Classes**, such as AC Luxury and Super Luxury services, based on route data.</p>
          </div>
          <div class="bg-white p-5 sm:p-6 rounded-xl shadow-md">
            <h3 class="font-bold text-lg text-blue-700 mb-2">What if a route is not found?</h3>
            <p class="text-gray-600 text-sm">If no direct route is found, it means no **expressway service** exists between those exact stops, or the data is temporarily unavailable. Please verify the stop names.</p>
          </div>
          <div class="bg-white p-5 sm:p-6 rounded-xl shadow-md">
            <h3 class="font-bold text-lg text-blue-700 mb-2">Does this site sell tickets?</h3>
            <p class="text-gray-600 text-sm">No, this platform only provides **expressway fare** and route information. For ticket purchases, please contact the respective bus operator directly.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-blue-50 py-8 sm:py-12 border-t-4 border-blue-600">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <h2 class="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Why Trust Our Data?</h2>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div class="p-2">
            <Award :size="36" class="mx-auto text-blue-600 mb-3" />
            <h3 class="font-bold mb-2">Comprehensive Data Sets</h3>
            <p class="text-sm text-gray-600">Extensive coverage of all official expressway bus routes.</p>
          </div>
          <div class="p-2">
            <Zap :size="36" class="mx-auto text-blue-600 mb-3" />
            <h3 class="font-bold mb-2">High Availability</h3>
            <p class="text-sm text-gray-600">Instant results powered by efficient, reliable infrastructure.</p>
          </div>
          <div class="p-2">
            <Users :size="36" class="mx-auto text-blue-600 mb-3" />
            <h3 class="font-bold mb-2">User-Centric Design</h3>
            <p class="text-sm text-gray-600">A clean, intuitive interface designed for all users.</p>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<style>
  @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
  @keyframes slide-down { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes slide-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  .animate-fade-in { animation: fade-in 0.5s ease-in-out; }
  .animate-slide-down { animation: slide-down 0.5s ease-in-out; }
  .animate-slide-up { animation: slide-up 0.5s ease-in-out; }
  .animate-pulse-short {
      animation: pulse-short 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
  @keyframes pulse-short {
      0%, 100% { opacity: 0.2; }
      50% { opacity: 0.5; }
  }
</style>