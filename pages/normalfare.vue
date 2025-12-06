<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col">
    <Navbar />

    <section class="pt-24 pb-12 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white relative overflow-hidden">
      <div class="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"></div>

      <div class="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div class="text-center mb-6">
          <div class="inline-block px-4 py-2 bg-blue-500/30 backdrop-blur-sm rounded-full text-sm font-medium mb-4 animate-fade-in">
            💰 Sri Lanka's Official Bus Fare Calculator
          </div>
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 animate-slide-down">
            Bus Fares by Route & Service Type
          </h1>
          <p class="text-lg text-blue-100 max-w-2xl mx-auto animate-fade-in">
            Get accurate fares for {{ allRoutesData.length }}+ routes based on latest government revisions.
          </p>
        </div>
      </div>
    </section>

    <section class="bg-white py-8 shadow-sm">
      <div class="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 text-center">
        <div class="p-4 rounded-xl bg-blue-50 shadow-md hover:shadow-lg transition-all transform hover:scale-105 cursor-default">
          <Users :size="32" class="mx-auto text-blue-600 mb-2" />
          <p class="text-xl sm:text-2xl font-bold text-blue-700">{{ allRoutesData.length }}+</p>
          <p class="text-gray-600 text-sm sm:text-base font-semibold">Routes Tracked</p>
        </div>
        <div class="p-4 rounded-xl bg-green-50 shadow-md hover:shadow-lg transition-all transform hover:scale-105 cursor-default">
          <Award :size="32" class="mx-auto text-green-600 mb-2" />
          <p class="text-xl sm:text-2xl font-bold text-green-700">Official</p>
          <p class="text-gray-600 text-sm sm:text-base font-semibold">Fare Stages Used</p>
        </div>
        <div class="p-4 rounded-xl bg-yellow-50 shadow-md hover:shadow-lg transition-all transform hover:scale-105 cursor-default">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mx-auto text-yellow-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p class="text-xl sm:text-2xl font-bold text-yellow-700">July 04, 2025</p>
          <p class="text-gray-600 text-sm sm:text-base font-semibold">Last Fare Update</p>
        </div>
      </div>
    </section>

    <main class="flex-1 px-4 sm:px-6 py-12">
      <div class="max-w-5xl mx-auto">
        <div class="flex flex-wrap justify-center gap-3 mb-8 animate-fade-in">
          <button
            v-for="lang in languages"
            :key="lang.code"
            @click="setLanguage(lang.code)"
            :class="['px-6 py-2 rounded-lg border-2 transition-all duration-300 font-medium transform active:scale-95 hover:scale-105',
              language === lang.code
                ? 'bg-blue-600 text-white border-blue-600 shadow-lg'
                : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400']"
          >
            {{ lang.label }}
          </button>
        </div>

        <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 sm:p-8 mb-10 border-2 border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300 animate-slide-up">
          <div class="flex items-start gap-4">
            <TrendingUp class="text-blue-600 flex-shrink-0 mt-1" :size="24" />
            <div>
              <h3 class="text-lg font-semibold text-blue-800 mb-3">💡 Quick Guide</h3>
              <p class="text-gray-700 text-sm sm:text-base leading-relaxed">{{ tips[language] || tips['en'] }}</p>
              <div class="bg-white rounded-lg p-3 mt-4 border border-blue-200">
                <p class="text-xs sm:text-sm text-gray-600 font-medium">
                  Example: Colombo ➜ Matara | කොළඹ ➜ මාතර | கொழும்பு ➜ மாத்தறை
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          ref="searchCardRef"
          class="bg-white rounded-3xl shadow-2xl p-8 sm:p-10 mb-10 border-2 border-gray-100 hover:shadow-2xl transition-all duration-300 animate-slide-up"
        >
          <h2 class="text-2xl sm:text-3xl font-extrabold text-blue-700 mb-8 text-center">
            🧮 Calculate Your Bus Fare
          </h2>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div class="relative" ref="originRef">
              <label class="block text-sm font-bold text-gray-800 mb-2">
                <MapPin class="inline mr-2" :size="18" />
                Starting Point
              </label>
              <input
                type="text"
                placeholder="Enter starting location..."
                :value="originQuery"
                @input="handleOriginChange"
                @focus="showOriginSuggestions = true"
                @keydown="handleKeyDown($event, 'origin')"
                class="w-full border-2 border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-md transition-all text-base hover:border-blue-400"
                autocomplete="off"
              />
              <ul v-if="showOriginSuggestions" class="absolute z-20 w-full max-h-48 overflow-y-auto bg-white border-2 border-gray-300 rounded-xl mt-2 shadow-xl animate-slide-down">
                <template v-if="filteredOriginSections.length > 0">
                  <li
                    v-for="(sec, index) in filteredOriginSections"
                    :key="`${sec}-${index}`"
                    @click="selectOrigin(sec)"
                    class="cursor-pointer px-4 py-3 hover:bg-blue-500 hover:text-white transition-all font-medium border-b border-gray-100 last:border-b-0 transform hover:scale-105 hover:pl-6"
                  >
                    <MapPin class="inline mr-2" :size="16" />
                    {{ sec }}
                  </li>
                </template>
                <template v-else>
                  <div class="px-3 py-4 text-center text-sm text-gray-500 flex items-center justify-center gap-1">
                    <AlertCircle :size="14" /> No sections found for "{{ debouncedOriginQuery }}"
                  </div>
                </template>
              </ul>
            </div>

            <div class="relative" ref="destinationRef">
              <label class="block text-sm font-bold text-gray-800 mb-2">
                <MapPin class="inline mr-2" :size="18" />
                Destination
              </label>
              <input
                type="text"
                placeholder="Enter destination..."
                :value="destinationQuery"
                @input="handleDestinationChange"
                @focus="showDestinationSuggestions = true"
                @keydown="handleKeyDown($event, 'destination')"
                class="w-full border-2 border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-md transition-all text-base hover:border-blue-400"
                autocomplete="off"
              />
              <ul v-if="showDestinationSuggestions" class="absolute z-20 w-full max-h-48 overflow-y-auto bg-white border-2 border-gray-300 rounded-xl mt-2 shadow-xl animate-slide-down">
                <template v-if="filteredDestinationSections.length > 0">
                  <li
                    v-for="(sec, index) in filteredDestinationSections"
                    :key="`${sec}-${index}`"
                    @click="selectDestination(sec)"
                    class="cursor-pointer px-4 py-3 hover:bg-blue-500 hover:text-white transition-all font-medium border-b border-gray-100 last:border-b-0 transform hover:scale-105 hover:pl-6"
                  >
                    <MapPin class="inline mr-2" :size="16" />
                    {{ sec }}
                  </li>
                </template>
                <template v-else>
                  <div class="px-3 py-4 text-center text-sm text-gray-500 flex items-center justify-center gap-1">
                    <AlertCircle :size="14" /> No sections found for "{{ debouncedDestinationQuery }}"
                  </div>
                </template>
              </ul>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-2">
            <button
              @click="swapOriginDestination"
              :disabled="!origin || !destination"
              class="flex items-center justify-center w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-semibold transform active:scale-95 hover:scale-105 shadow-md hover:shadow-lg"
            >
              <RefreshCw :size="18" class="mr-2" /> Swap
            </button>

            <button
              @click="clearSelections"
              class="flex items-center justify-center w-full sm:w-auto px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all duration-300 font-semibold transform active:scale-95 hover:scale-105 shadow-md hover:shadow-lg"
            >
              <Trash2 :size="18" class="mr-2" /> Clear
            </button>

            <button
              @click="calculateFare"
              :disabled="loading || !origin || !destination || origin === destination"
              class="flex-1 sm:flex-none flex items-center justify-center px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-bold transform active:scale-95 hover:scale-105 hover:from-blue-700 hover:to-blue-800"
            >
              <template v-if="loading">
                <Bus class="animate-spin mr-2" :size="20" /> Calculating...
              </template>
              <template v-else>
                <Zap :size="20" class="mr-2" /> Calculate Fare <ChevronRight :size="20" class="ml-2" />
              </template>
            </button>
          </div>
        </div>

        <div class="min-h-72">
          <div v-if="loading" class="bg-white rounded-3xl shadow-xl p-12 text-center border-2 border-blue-200 animate-fade-in">
            <Bus class="animate-bounce mx-auto text-blue-600 mb-4" :size="48" />
            <p class="text-gray-600 text-lg font-semibold">Calculating official fares for your routes...</p>
          </div>

          <div v-else-if="fareResults.length === 0" class="bg-white rounded-3xl shadow-lg p-12 text-center border-2 border-gray-200 animate-fade-in">
            <Bus class="text-gray-400 mx-auto mb-4" :size="48" />
            <p class="text-gray-600 text-lg font-semibold">
              {{ origin && destination
                ? "No common routes found between selected origin and destination. Try searching for a nearby main town."
                : "Enter your starting point and destination to find available bus fares." }}
            </p>
          </div>

          <div v-else class="space-y-6 animate-fade-in">
            <div class="text-center mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-200">
              <p class="text-2xl sm:text-3xl font-bold text-gray-900">
                ✓ Found <span class="text-blue-600 text-3xl sm:text-4xl">{{ fareResults.length }}</span> route{{ fareResults.length > 1 ? "s" : "" }}
              </p>
              <p class="text-gray-600 mt-3 text-sm sm:text-base font-semibold">
                {{ origin }} ➜ {{ destination }}
              </p>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div
                v-for="(fare, idx) in fareResults"
                :key="idx"
                class="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100 hover:shadow-2xl hover:border-blue-300 transition-all duration-300 transform hover:scale-105 animate-slide-up"
              >
                <div class="mb-6 pb-4 border-b-2 border-gray-200 flex justify-between items-start">
                  <div>
                    <h3 class="text-xl font-bold text-blue-700">{{ fare.route_name }}</h3>
                    <p class="text-sm text-gray-500 font-semibold mt-1">
                      Route #{{ normalizeRouteNo(fare.route_no) }}
                    </p>
                  </div>
                  <div class="bg-blue-100 px-3 py-1 rounded-full text-xs font-bold text-blue-600">
                    {{ Object.keys(fare).filter(k => k !== 'route_no' && k !== 'route_name').length }} Options
                  </div>
                </div>
                <div class="space-y-3 mt-4">
                  <div v-if="fare.normal !== undefined" class="flex justify-between items-center rounded-xl p-3 bg-yellow-50 text-yellow-800 border border-yellow-200 shadow-sm hover:shadow-md transition-all duration-200">
                    <p class="text-sm font-medium">Normal</p>
                    <p class="text-lg font-semibold">Rs. {{ fare.normal }}</p>
                  </div>
                  <div v-if="fare.semi !== undefined" class="flex justify-between items-center rounded-xl p-3 bg-blue-50 text-blue-800 border border-blue-200 shadow-sm hover:shadow-md transition-all duration-200">
                    <p class="text-sm font-medium">Semi Luxury</p>
                    <p class="text-lg font-semibold">Rs. {{ fare.semi }}</p>
                  </div>
                  <div v-if="fare.ac !== undefined" class="flex justify-between items-center rounded-xl p-3 bg-green-50 text-green-800 border border-green-200 shadow-sm hover:shadow-md transition-all duration-200">
                    <p class="text-sm font-medium">AC</p>
                    <p class="text-lg font-semibold">Rs. {{ fare.ac }}</p>
                  </div>
                  <div v-if="fare.su !== undefined" class="flex justify-between items-center rounded-xl p-3 bg-purple-50 text-purple-800 border border-purple-200 shadow-sm hover:shadow-md transition-all duration-200">
                    <p class="text-sm font-medium">Super Luxury</p>
                    <p class="text-lg font-semibold">Rs. {{ fare.su }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section class="py-12 mt-10">
          <div class="max-w-5xl mx-auto px-4 sm:px-6">
            <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 mb-10 text-center">
              🚌 Your Comprehensive Guide to Sri Lankan Bus Fares & Routes
            </h2>
            
            <p class="text-lg text-gray-700 mb-12 text-center leading-relaxed max-w-3xl mx-auto">
              Planning a journey across Sri Lanka? Our official bus fare calculator is your most reliable tool for estimating travel costs. We track over 500 routes, providing fares from the **latest government gazette**.
            </p>

            <div class="mb-12 p-8 bg-white border-4 border-blue-600 rounded-3xl shadow-2xl transform hover:scale-[1.01] transition-all duration-300">
              <div class="flex items-center mb-6">
                <Bus :size="48" class="text-blue-600 mr-4 flex-shrink-0" />
                <h3 class="text-2xl md:text-3xl font-bold text-blue-700">The Official Fare Stages System</h3>
              </div>
              <p class="text-gray-700 leading-relaxed text-base md:text-lg">
                Our calculator uses the official **Fare Stages** methodology, the backbone of Sri Lanka's public transport system. Every major stop along a bus route is designated as a 'Fare Stage'. The total fare is determined by counting the number of stages between your **Origin** and **Destination** and applying the corresponding gazetted fare for the chosen bus type.
                <br /><br />
                This ensures that the results you receive are compliant with the latest fare revisions issued by the National Transport Commission (NTC). If an AC or Semi-Luxury service does not directly stop at your exact point, we intelligently find the **Nearest Operational Stage** that services that bus type to provide the most accurate estimate.
              </p>
            </div>

            <h3 class="text-2xl font-semibold text-gray-800 mb-6 border-b pb-3">Types of Services: Choose Your Comfort</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">

              <div class="p-6 bg-yellow-50 rounded-2xl shadow-lg border border-yellow-200 hover:shadow-xl transition-all duration-200">
                <div class="flex items-center mb-4">
                  <Briefcase :size="32" class="text-yellow-600 mr-3" />
                  <h4 class="text-xl font-bold text-yellow-800">Normal (Budget)</h4>
                </div>
                <p class="text-gray-700 text-sm">
                  The standard, budget-friendly option. These buses stop frequently at all designated stages and adhere strictly to the **Minimum Fare** structure established by the government.
                </p>
              </div>

              <div class="p-6 bg-blue-50 rounded-2xl shadow-lg border border-blue-200 hover:shadow-xl transition-all duration-200">
                <div class="flex items-center mb-4">
                  <Gauge :size="32" class="text-blue-600 mr-3" />
                  <h4 class="text-xl font-bold text-blue-800">Semi Luxury (SL)</h4>
                </div>
                <p class="text-gray-700 text-sm">
                  Offers a slight upgrade in comfort, typically with limited stops compared to Normal buses. Fares are set at a regulated premium over the basic Normal fare structure.
                </p>
              </div>

              <div class="p-6 bg-green-50 rounded-2xl shadow-lg border border-green-200 hover:shadow-xl transition-all duration-200">
                <div class="flex items-center mb-4">
                  <Cloud :size="32" class="text-green-600 mr-3" />
                  <h4 class="text-xl font-bold text-green-800">Air Conditioned (LX)</h4>
                </div>
                <p class="text-gray-700 text-sm">
                  Provides a comfortable, air-conditioned journey, mostly on long-distance routes. These services offer faster travel due to being limited-stop services.
                </p>
              </div>

              <div class="p-6 bg-purple-50 rounded-2xl shadow-lg border border-purple-200 hover:shadow-xl transition-all duration-200">
                <div class="flex items-center mb-4">
                  <Crown :size="32" class="text-purple-600 mr-3" />
                  <h4 class="text-xl font-bold text-purple-800">Super Luxury (SU)</h4>
                </div>
                <p class="text-gray-700 text-sm">
                  The premium service tier, often featuring comfortable reclining seats, Wi-Fi, and minimal stops. Ideal for very long-haul inter-city travel.
                </p>
              </div>
            </div>
            
            <p class="text-center mt-10 text-xl font-bold text-gray-900 border-t pt-6">
              Use the calculator above to find the most accurate fare for your next journey today!
            </p>
          </div>
        </section>
        </div>
    </main>

    <button
      v-if="fareResults.length > 0"
      @click="scrollToSearch"
      class="fixed bottom-6 right-6 z-50 flex items-center px-5 py-3 bg-red-600 text-white rounded-full shadow-2xl hover:bg-red-700 transition-all duration-300 font-bold transform active:scale-95 hover:scale-105"
    >
      <RefreshCw :size="18" class="mr-2" /> New Search
    </button>

    <section class="bg-gray-100 py-12">
      <div class="max-w-5xl mx-auto px-4 sm:px-6">
        <h2 class="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-white p-6 rounded-xl shadow-md">
            <h3 class="font-bold text-lg text-blue-700 mb-2">How accurate is the distance information?</h3>
            <p class="text-gray-600 text-sm">Our data is updated regularly from official bus operators and transport authorities to ensure maximum accuracy for your journey planning based on gazetted fare stages.</p>
          </div>
          <div class="bg-white p-6 rounded-xl shadow-md">
            <h3 class="font-bold text-lg text-blue-700 mb-2">Can I book tickets directly?</h3>
            <p class="text-gray-600 text-sm">This platform provides fare calculation and route information only. You cannot book tickets directly here. Please contact the respective bus operators or use their official booking systems for ticket reservations.</p>
          </div>
          <div class="bg-white p-6 rounded-xl shadow-md">
            <h3 class="font-bold text-lg text-blue-700 mb-2">Which service type should I choose?</h3>
            <p class="text-gray-600 text-sm">Normal buses are budget-friendly, Semi coaches offer basic comfort, and AC buses provide premium experience with air conditioning.</p>
          </div>
          <div class="bg-white p-6 rounded-xl shadow-md">
            <h3 class="font-bold text-lg text-blue-700 mb-2">Is the travel time guaranteed?</h3>
            <p class="text-gray-600 text-sm">Travel times are estimates based on normal traffic conditions. Actual times may vary based on traffic and road conditions.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-blue-50 py-12 border-t-4 border-blue-600">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Why Choose Businfo.click?</h2>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <Award :size="40" class="mx-auto text-blue-600 mb-3" />
            <h3 class="font-bold mb-2">Most Comprehensive</h3>
            <p class="text-sm text-gray-600">All Sri Lankan bus routes in one place</p>
          </div>
          <div>
            <Zap :size="40" class="mx-auto text-blue-600 mb-3" />
            <h3 class="font-bold mb-2">Real-Time Data</h3>
            <p class="text-sm text-gray-600">Updated information 24/7</p>
          </div>
          <div>
            <Users :size="40" class="mx-auto text-blue-600 mb-3" />
            <h3 class="font-bold mb-2">User Friendly</h3>
            <p class="text-sm text-gray-600">Simple search in 3 languages</p>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script setup>
// Vue 3 Composition API imports
import { ref, reactive, computed, onMounted, watch } from 'vue';

// Nuxt 3 composable for SEO
import { useHead } from '#app'; 

// Lucide Icons import - CORRECTED: FastCharging replaced with Gauge
import { Bus, RefreshCw, Trash2, Zap, Award, Users, AlertCircle, TrendingUp, MapPin, ChevronRight, Briefcase, Gauge, Cloud, Crown } from 'lucide-vue-next';

// Data imports - assuming the paths are correct in your Nuxt structure
import allSectionsData from '~/data/all_section.json';
import fareStagesData from '~/data/fare_stages.json';
import allRoutesData from '~/data/allroutes.json';

// --- State Variables (Replacing React's useState) ---
const origin = ref('');
const destination = ref('');
const fareResults = ref([]);
const loading = ref(false);
const allSections = ref([]);
const mainTownSuggestions = ref([]);
const sectionMap = reactive({});
const fareStageMap = reactive({});
const routeMap = reactive({});
const showOriginSuggestions = ref(false);
const showDestinationSuggestions = ref(false);
const originQuery = ref('');
const destinationQuery = ref('');
const debouncedOriginQuery = ref('');
const debouncedDestinationQuery = ref('');
const searchCardRef = ref(null);

// 🌍 Language state
const language = ref('en');

// --- Refs (Replacing React's useRef) ---
const originRef = ref(null);
const destinationRef = ref(null);
let debounceTimer = null; // Storing the debounce timer in a standard variable

// --- Translations ---
const tips = {
  en: "Type your starting point and ending point here and press the Calculate button. This will show you all the routes you can travel and their fares for regular, semi-luxury, and air-conditioned buses.",
  si: "ඔබගේ ගමන් ආරම්භක ස්ථානය හා ගමන් අවසාන ස්ථානය මෙහි ටයිප් කර Calculate බොත්තම ඔබන්න. එවිට ඔබට ගමන්ගත හැකි සියලුම මාර්ග සහ ඒවායේ සාමාන්‍ය, අර්ධ සුඛෝපභෝගී හා වායුසමීකරණ බස් රථවල ගාස්තු සටහන් මෙයින් පෙන්වයි.",
  ta: "உங்கள் தொடக்கப் புள்ளி மற்றும் முடிவுப் புள்ளியை இங்கே தட்டச்சு செய்து கணக்கிடு பொத்தானை அழுத்தவும். இது நீங்கள் பயணிக்கக்கூடிய அனைத்து வழித்தடங்களையும், வழக்கமான, அரை சொகுசு மற்றும் குளிரூட்டப்பட்ட பேருந்துகளுக்கான கட்டணங்களையும் காண்பிக்கும்.",
};

// Language options
const languages = [
  { code: "en", label: "English" },
  { code: "si", label: "සිංහල" },
  { code: "ta", label: "தமிழ்" },
];

// --- Utility Functions ---

/**
 * Normalizes the route number by stripping leading zeros and standardizing delimiters.
 * @param {string | number} routeNo
 * @returns {string}
 */
const normalizeRouteNo = (routeNo) => {
  if (!routeNo) return "";
  const strRouteNo = String(routeNo).trim();
  const parts = strRouteNo.split(/([-/])/);
  return parts
    .map((part) => {
      if (part === "-" || part === "/") return part;
      const match = part.match(/^0*(\d+)(.*)$/);
      if (match) return match[1] + (match[2] || "");
      return part;
    })
    .join("");
};

/**
 * Debounce function (Adapted to Vue 3/JS context)
 * @param {function} func 
 * @param {number} delay 
 */
const debounce = (func, delay) => {
  return (...args) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(null, args), delay);
  };
};

// Debounced updaters
const debouncedOriginUpdate = debounce(() => {
  debouncedOriginQuery.value = originQuery.value;
}, 150);

const debouncedDestinationUpdate = debounce(() => {
  debouncedDestinationQuery.value = destinationQuery.value;
}, 150);

/**
 * Checks if a service type string contains the specified type.
 * @param {string} serviceTypeStr 
 * @param {string} typeToCheck 
 * @returns {boolean}
 */
const hasServiceType = (serviceTypeStr, typeToCheck) => {
  if (!serviceTypeStr) return false;
  const types = serviceTypeStr.split(",");
  return types.some((t) => t.trim() === typeToCheck);
};

/**
 * Gets all available service types for a given route number.
 * @param {string} routeNo 
 * @returns {string[]}
 */
const getAvailableServiceTypes = (routeNo) => {
  const sections = sectionMap[routeNo];
  if (!sections) return [];

  const types = new Set();
  Object.values(sections).forEach((section) => {
    if (section.service_type) {
      section.service_type.split(",").forEach((type) => {
        types.add(type.trim());
      });
    }
  });
  return Array.from(types);
};

/**
 * Finds the nearest section that offers a specific service type.
 * @param {string} routeNo 
 * @param {number} currentSectionId 
 * @param {('up'|'down')} direction 
 * @param {('origin'|'destination')} relativeTo 
 * @param {string} serviceType 
 * @returns {object | null}
 */
const findNearestSection = (routeNo, currentSectionId, direction, relativeTo, serviceType) => {
  const sections = sectionMap[routeNo];
  if (!sections) return null;

  const isOrigin = relativeTo === "origin";
  const isUp = direction === "up";
  // Logic from React: shouldGoBackward = (isOrigin && isUp) || (!isOrigin && !isUp);
  // This means: (Origin AND going UP) - OR - (Destination AND going DOWN)
  const shouldGoBackward = (isOrigin && isUp) || (!isOrigin && !isUp);

  let nearestSection = null;
  let bestDistance = Infinity;

  // We need to iterate over sections by their IDs, but sections are keyed by name.
  // Rebuild sections array for ID-based iteration/comparison
  const sectionsArray = Object.values(sections);

  for (const section of sectionsArray) {
    if (!hasServiceType(section.service_type, serviceType)) continue;

    const sectionId = section.section_id;

    if (shouldGoBackward) {
      if (sectionId < currentSectionId) {
        const distance = currentSectionId - sectionId;
        if (distance < bestDistance) {
          bestDistance = distance;
          nearestSection = section;
        }
      }
    } else {
      if (sectionId > currentSectionId) {
        const distance = sectionId - currentSectionId;
        if (distance < bestDistance) {
          bestDistance = distance;
          nearestSection = section;
        }
      }
    }
  }

  return nearestSection;
};

/**
 * Resolves the full route name from the route number.
 * @param {string} routeNo 
 * @param {string} originName 
 * @param {string} destinationName 
 * @returns {string}
 */
const resolveRouteName = (routeNo, originName, destinationName) => {
  const routeInfo = routeMap[routeNo];
  if (routeInfo) {
    return `${routeInfo.Origin} ➜ ${routeInfo.Destination}`;
  }

  const fallbackRoute = Object.values(routeMap).find(
    (route) => route.Origin === originName && route.Destination === destinationName
  );

  if (fallbackRoute) {
    return `${fallbackRoute.Origin} ➜ ${fallbackRoute.Destination}`;
  }

  return "Unknown";
};


// --- Computed Properties ---

const getFilteredSuggestions = (query, allOptions) => {
  if (!query.trim()) {
    return mainTownSuggestions.value;
  }

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

  const results = [...exactMatches, ...startsWithMatches, ...containsMatches];
  return results.slice(0, 50);
};

const filteredOriginSections = computed(() =>
  getFilteredSuggestions(debouncedOriginQuery.value, allSections.value)
);

const filteredDestinationSections = computed(() =>
  getFilteredSuggestions(debouncedDestinationQuery.value, allSections.value)
);

// --- Methods/Handlers ---

const setLanguage = (code) => {
  language.value = code;
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
  origin.value = "";
  destination.value = "";
  originQuery.value = "";
  destinationQuery.value = "";
  fareResults.value = [];
  showOriginSuggestions.value = false;
  showDestinationSuggestions.value = false;
};

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

const handleOriginChange = (e) => {
  const value = e.target.value;
  originQuery.value = value;
  const exactMatch = allSections.value.find((section) => section.toLowerCase() === value.toLowerCase());
  if (exactMatch) {
    origin.value = exactMatch;
  } else {
    origin.value = value;
  }
  showOriginSuggestions.value = true;
  debouncedOriginUpdate();
};

const handleDestinationChange = (e) => {
  const value = e.target.value;
  destinationQuery.value = value;
  const exactMatch = allSections.value.find((section) => section.toLowerCase() === value.toLowerCase());
  if (exactMatch) {
    destination.value = exactMatch;
  } else {
    destination.value = value;
  }
  showDestinationSuggestions.value = true;
  debouncedDestinationUpdate();
};

const handleKeyDown = (e, type) => {
  if (e.key === "Escape") {
    if (type === "origin") {
      showOriginSuggestions.value = false;
    } else {
      showDestinationSuggestions.value = false;
    }
  }
};

const scrollToSearch = () => {
  if (searchCardRef.value) {
    window.scrollTo({ top: searchCardRef.value.offsetTop, behavior: 'smooth' });
  }
};

const calculateFare = () => {
  if (!origin.value || !destination.value) {
    alert("Please select both origin and destination");
    return;
  }
  if (origin.value === destination.value) {
    alert("Origin and destination cannot be the same");
    return;
  }

  loading.value = true;
  
  // Simulated asynchronous calculation
  setTimeout(() => {
    const results = [];

    Object.keys(sectionMap).forEach((routeNo) => {
      const originSec = sectionMap[routeNo][origin.value];
      const destSec = sectionMap[routeNo][destination.value];

      if (originSec && destSec) {
        const direction = originSec.section_id < destSec.section_id ? "up" : "down";

        const sectionDiffNormal = Math.abs(destSec.section_id - originSec.section_id);
        const normalFareData = fareStageMap[sectionDiffNormal];
        const normalFare = normalFareData?.normal;

        const availableServices = getAvailableServiceTypes(routeNo);

        let semi = null;
        let ac = null;
        let superLuxury = null;

        // Logic for Semi-Luxury (SL)
        if (availableServices.includes("SL")) {
          let nearOrigin = hasServiceType(originSec.service_type, "SL")
            ? originSec
            : findNearestSection(routeNo, originSec.section_id, direction, "origin", "SL");

          let nearDestination = hasServiceType(destSec.service_type, "SL")
            ? destSec
            : findNearestSection(routeNo, destSec.section_id, direction, "destination", "SL");

          if (nearOrigin && nearDestination) {
            const sectionDiff = Math.abs(nearDestination.section_id - nearOrigin.section_id);
            const semiFareData = fareStageMap[sectionDiff];
            semi = semiFareData?.semi;
          }
        }

        // Logic for AC (LX)
        if (availableServices.includes("LX")) {
          let nearOrigin = hasServiceType(originSec.service_type, "LX")
            ? originSec
            : findNearestSection(routeNo, originSec.section_id, direction, "origin", "LX");

          let nearDestination = hasServiceType(destSec.service_type, "LX")
            ? destSec
            : findNearestSection(routeNo, destSec.section_id, direction, "destination", "LX");

          if (nearOrigin && nearDestination) {
            const sectionDiff = Math.abs(nearDestination.section_id - nearOrigin.section_id);
            const acFareData = fareStageMap[sectionDiff];
            ac = acFareData?.ac;
          }
        }

        // Logic for Super Luxury (SU)
        if (availableServices.includes("SU")) {
          let nearOrigin = hasServiceType(originSec.service_type, "SU")
            ? originSec
            : findNearestSection(routeNo, originSec.section_id, direction, "origin", "SU");

          let nearDestination = hasServiceType(destSec.service_type, "SU")
            ? destSec
            : findNearestSection(routeNo, destSec.section_id, direction, "destination", "SU");

          if (nearOrigin && nearDestination) {
            const sectionDiff = Math.abs(nearDestination.section_id - nearOrigin.section_id);
            const suFareData = fareStageMap[sectionDiff];
            superLuxury = suFareData?.super;
          }
        }

        const routeName = resolveRouteName(routeNo, origin.value, destination.value);

        const fareEntry = {
          route_no: routeNo,
          route_name: routeName,
        };

        if (normalFare !== undefined && normalFare !== null) {
          fareEntry.normal = normalFare;
        }
        if (semi !== undefined && semi !== null) {
          fareEntry.semi = semi;
        }
        if (ac !== undefined && ac !== null) {
          fareEntry.ac = ac;
        }
        if (superLuxury !== undefined && superLuxury !== null) {
          fareEntry.su = superLuxury;
        }

        if (fareEntry.normal || fareEntry.semi || fareEntry.ac || fareEntry.su) {
          results.push(fareEntry);
        }
      }
    });

    results.sort((a, b) => a.route_no.localeCompare(b.route_no));
    fareResults.value = results;
    loading.value = false;

    // Scroll to results/search card after calculation
    setTimeout(() => {
      if (results.length > 0 && searchCardRef.value) {
        window.scrollTo({ top: searchCardRef.value.offsetTop, behavior: 'smooth' });
      }
    }, 100);
  }, 500);
};

// --- Lifecycle Hook (Initial setup) ---
onMounted(() => {
  // Initialize Maps and Sections
  const sMap = {};
  const uniqueSections = new Set();
  allSectionsData.forEach((sec) => {
    const normalizedRouteNo = normalizeRouteNo(sec.route_no);
    if (!sMap[normalizedRouteNo]) sMap[normalizedRouteNo] = {};
    sMap[normalizedRouteNo][sec.section_name] = sec;
    uniqueSections.add(sec.section_name);
  });

  const fMap = {};
  fareStagesData.forEach((f) => {
    fMap[f.fare_stage] = f;
  });

  const rMap = {};
  allRoutesData.forEach((r) => {
    const normalizedRouteNo = normalizeRouteNo(r.Route_No);
    rMap[normalizedRouteNo] = r;
  });

  // Assign to reactive variables
  Object.assign(sectionMap, sMap);
  Object.assign(fareStageMap, fMap);
  Object.assign(routeMap, rMap);

  const mainTowns = ["COLOMBO", "KANDY", "GALLE", "JAFFNA", "ANURADHAPURA", "KURUNEGALA", "BADULLA", "TRINCOMALEE", "MATARA", "BATTICALOA"];
  
  const allUniqueSections = Array.from(uniqueSections).sort();
  allSections.value = allUniqueSections;
  
  // Filter the unique sections to find only the main towns
  mainTownSuggestions.value = allUniqueSections.filter(section => 
    mainTowns.includes(section.toUpperCase())
  ).sort();

  // Setup click outside listener
  const handleClickOutside = (event) => {
    if (originRef.value && !originRef.value.contains(event.target)) {
      showOriginSuggestions.value = false;
    }
    if (destinationRef.value && !destinationRef.value.contains(event.target)) {
      showDestinationSuggestions.value = false;
    }
  };
  
  document.addEventListener("mousedown", handleClickOutside);
  
  // Cleanup listener on unmount
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
    clearTimeout(debounceTimer);
  };
});

// --- Nuxt 3 SEO Meta (Enhanced with Schema Markup) ---
useHead({
  title: 'Official Bus Fare Calculator Sri Lanka - Routes, Types & Fares',
  meta: [
    { 
      name: 'description', 
      content: 'Get the latest official bus fares for over 500 Sri Lankan bus routes. Calculate Normal, Semi-Luxury, AC, and Super Luxury bus fares accurately between any two sections. Your essential guide to SLTB and private bus travel in Sri Lanka.' 
    },
    { name: 'keywords', content: 'Sri Lanka bus fare, bus route calculator, SLTB bus fares, private bus fares, AC bus fare, semi luxury fare, Sri Lanka travel, businfo, bus travel Sri Lanka' },
    { property: 'og:title', content: 'Official Bus Fare Calculator Sri Lanka - Routes, Types & Fares' },
    { property: 'og:description', content: 'Get the latest official bus fares for over 500 Sri Lankan bus routes. Calculate Normal, Semi-Luxury, AC, and Super Luxury bus fares accurately.' },
    { property: 'og:type', content: 'website' },
    // Add canonical link for best practice
    { rel: 'canonical', href: 'https://businfo.click/normalfare' }
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How accurate is the distance information?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Our data is updated regularly from official bus operators and transport authorities to ensure maximum accuracy for your journey planning based on gazetted fare stages."
            }
          },
          {
            "@type": "Question",
            "name": "Can I book tickets directly?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "This platform provides fare calculation and route information only. You cannot book tickets directly here. Please contact the respective bus operators or use their official booking systems for ticket reservations."
            }
          },
          {
            "@type": "Question",
            "name": "Which service type should I choose?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Normal buses are the most budget-friendly, Semi Luxury coaches offer basic comfort with a slightly higher fare, and AC buses (Luxury/Super Luxury) provide a premium, air-conditioned experience at the highest fare rate."
            }
          },
          {
            "@type": "Question",
            "name": "Is the travel time guaranteed?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Travel times provided are only estimates based on typical schedules and normal traffic conditions. Actual times may vary significantly due to traffic congestion, road conditions, and unexpected delays."
            }
          }
        ]
      }),
    },
  ],
});
</script>

<style scoped>
/* Scoped styles ensure animations only apply to this component */
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slide-down {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.5s ease-in-out;
}

.animate-slide-down {
  animation: slide-down 0.5s ease-in-out;
}

.animate-slide-up {
  animation: slide-up 0.5s ease-in-out;
}
</style>