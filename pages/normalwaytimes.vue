<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <Navbar />

    <section class="pt-24 pb-12 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white relative overflow-hidden">
      <div class="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"></div>

      <div class="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div class="text-center mb-6 transition-all duration-700">
          <div class="inline-block px-4 py-2 bg-blue-500/30 backdrop-blur-sm rounded-full text-sm font-medium mb-4 shadow-inner">
            🚍 Sri Lanka's #1 Bus Timetable Finder
          </div>
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 tracking-tight">
            Normal Bus Timetables & Schedules in Sri Lanka
          </h1>
          <p class="text-lg text-blue-100 max-w-2xl mx-auto">
            Get instant access to over {{ groupedTimetables.length }}+ up-to-date normal bus schedules, routes, and departure times across the island.
          </p>
        </div>
      </div>
    </section>
    
    <section class="bg-white py-8 shadow-md border-b">
      <div class="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 px-4 text-center">
        <div class="p-4 rounded-xl bg-blue-50 border border-blue-200 shadow-lg transition-all transform hover:scale-[1.02] cursor-pointer">
          <Users :size="32" class="mx-auto text-blue-600 mb-2" />
          <p class="text-2xl font-extrabold text-blue-800">{{ groupedTimetables.length }}+</p>
          <p class="text-gray-600 text-sm font-semibold">Verified Timetables</p>
        </div>
        <div class="p-4 rounded-xl bg-green-50 border border-green-200 shadow-lg transition-all transform hover:scale-[1.02] cursor-pointer">
          <Star :size="32" class="mx-auto text-green-600 mb-2" />
          <p class="text-2xl font-extrabold text-green-800">99%</p>
          <p class="text-gray-600 text-sm font-semibold">Uptime & Accuracy</p>
        </div>
        <div class="p-4 rounded-xl bg-yellow-50 border border-yellow-200 shadow-lg transition-all transform hover:scale-[1.02] cursor-pointer">
          <Award :size="32" class="mx-auto text-yellow-600 mb-2" />
          <p class="text-2xl font-extrabold text-yellow-800">Multi-Lingual</p>
          <p class="text-gray-600 text-sm font-semibold">Sinhala, Tamil, English</p>
        </div>
      </div>
    </section>

    <main class="flex-1 px-4 sm:px-6 py-12">
      <div class="max-w-5xl mx-auto">
        <div class="flex flex-wrap justify-center gap-3 mb-8 transition-all duration-700">
          <button
            v-for="lang in languages"
            :key="lang.code"
            @click="language = lang.code"
            :class="[
              'px-6 py-2 rounded-full border-2 transition-all duration-300 font-bold transform active:scale-95 hover:scale-105 shadow-md text-sm sm:text-base',
              language === lang.code
                ? 'bg-blue-600 text-white border-blue-600 ring-4 ring-blue-300'
                : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'
            ]"
          >
            {{ lang.label }}
          </button>
        </div>

        <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 sm:p-8 mb-10 border-2 border-blue-200 shadow-xl transition-all duration-700">
          <div class="flex items-start gap-4">
            <TrendingUp class="text-blue-600 flex-shrink-0 mt-1 animate-pulse" :size="28" />
            <div>
              <h3 class="text-xl font-extrabold text-blue-800 mb-3">💡 Quick Guide: How to Find Your Schedule</h3>
              <p class="text-gray-700 text-sm sm:text-base leading-relaxed mb-4">{{ tips[language] || tips['en'] }}</p>
              <div class="bg-white rounded-xl p-4 border border-blue-200 shadow-inner">
                <p class="text-sm text-gray-600 font-medium flex items-center flex-wrap">
                  <span class="font-bold text-blue-700 mr-2 flex-shrink-0">Example:</span> 
                  <span class="truncate">Colombo ➜ Kandy</span> 
                  <span class="mx-2 text-gray-400 hidden sm:inline">|</span>
                  <span class="truncate hidden sm:inline">කොළඹ ➜ මහනුවර</span> 
                  <span class="mx-2 text-gray-400 hidden sm:inline">|</span> 
                  <span class="truncate hidden sm:inline">கொழும்பு ➜ கண்டி</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          ref="searchCardRef"
          class="bg-white rounded-3xl shadow-2xl p-6 sm:p-10 mb-10 border-2 border-gray-100 ring-4 ring-blue-100 hover:ring-blue-200 transition-all duration-700"
        >
          <h2 class="text-2xl sm:text-3xl font-extrabold text-blue-700 mb-8 text-center border-b pb-4">
            🔎 Find Your Bus Route
          </h2>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div class="relative" ref="originRef">
              <label class="block text-sm font-bold text-gray-800 mb-2">
                <MapPin class="inline mr-2 text-red-500" :size="18" />
                Starting Point (Origin)
              </label>
              <input
                type="text"
                placeholder="e.g., Colombo, Kandy..."
                v-model="origin"
                @focus="showOriginSuggestions = true"
                class="w-full border-2 border-gray-300 rounded-xl p-3 sm:p-4 focus:ring-4 focus:ring-blue-200 focus:border-blue-500 shadow-lg transition-all text-base hover:border-blue-400 font-medium"
                autocomplete="off"
              />
              <ul v-if="showOriginSuggestions && originSuggestions.filter(o => o.toLowerCase().includes(origin.toLowerCase())).length > 0" class="absolute z-20 w-full max-h-48 overflow-y-auto bg-white border-2 border-blue-300 rounded-xl mt-2 shadow-2xl animate-slide-down">
                <li
                  v-for="(o, idx) in originSuggestions.filter((o) => o.toLowerCase().includes(origin.toLowerCase()))"
                  :key="idx"
                  @click="selectOrigin(o)"
                  class="cursor-pointer px-4 py-3 hover:bg-blue-500 hover:text-white transition-all font-medium border-b border-gray-100 last:border-b-0 flex items-center text-sm sm:text-base"
                >
                  <MapPin :size="16" class="mr-2 opacity-70" />
                  {{ o }}
                </li>
              </ul>
            </div>

            <div class="relative" ref="destinationRef">
              <label class="block text-sm font-bold text-gray-800 mb-2">
                <MapPin class="inline mr-2 text-green-500" :size="18" />
                Destination Point
              </label>
              <input
                type="text"
                placeholder="e.g., Galle, Jaffna..."
                v-model="destination"
                @focus="showDestinationSuggestions = true"
                class="w-full border-2 border-gray-300 rounded-xl p-3 sm:p-4 focus:ring-4 focus:ring-blue-200 focus:border-blue-500 shadow-lg transition-all text-base hover:border-blue-400 font-medium"
                autocomplete="off"
              />
              <ul v-if="showDestinationSuggestions && destinationSuggestions.filter(d => d.toLowerCase().includes(destination.toLowerCase())).length > 0" class="absolute z-20 w-full max-h-48 overflow-y-auto bg-white border-2 border-blue-300 rounded-xl mt-2 shadow-2xl animate-slide-down">
                <li
                  v-for="(d, idx) in destinationSuggestions.filter((d) => d.toLowerCase().includes(destination.toLowerCase()))"
                  :key="idx"
                  @click="selectDestination(d)"
                  class="cursor-pointer px-4 py-3 hover:bg-blue-500 hover:text-white transition-all font-medium border-b border-gray-100 last:border-b-0 flex items-center text-sm sm:text-base"
                >
                  <MapPin :size="16" class="mr-2 opacity-70" />
                  {{ d }}
                </li>
              </ul>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-4">
            <button
              @click="swapOriginDestination"
              :disabled="!origin || !destination"
              class="flex items-center justify-center w-full sm:w-auto px-6 sm:px-8 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-extrabold transform active:scale-95 hover:scale-[1.01] shadow-xl hover:shadow-2xl ring-4 ring-purple-100 disabled:ring-0 text-sm sm:text-base"
            >
              <RefreshCw :size="18" class="mr-2" /> Swap Locations
            </button>

            <button
              @click="clearSelections"
              class="flex items-center justify-center w-full sm:w-auto px-6 sm:px-8 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all duration-300 font-semibold transform active:scale-95 hover:scale-[1.01] shadow-lg hover:shadow-xl text-sm sm:text-base"
            >
              <Trash2 :size="18" class="mr-2" /> Clear Search
            </button>
          </div>
        </div>

        <div class="min-h-96">
          <div v-if="isLoading" class="bg-white rounded-3xl shadow-lg p-12 text-center border-2 border-gray-200">
            <Loader2 class="text-blue-500 mx-auto mb-4 animate-spin" :size="48" />
            <p class="text-blue-700 text-xl font-bold mb-2">
              Loading Timetables...
            </p>
            <p class="text-gray-600 text-base">
              Please wait while we fetch the latest normal bus schedules.
            </p>
            <div class="mt-8 space-y-6">
                <div class="h-24 bg-gray-100 rounded-xl animate-pulse"></div>
                <div class="h-24 bg-gray-100 rounded-xl animate-pulse"></div>
            </div>
          </div>

          <div v-else>
              <div v-if="filteredTimetables.length === 0 && (origin || destination)" class="bg-white rounded-3xl shadow-lg p-12 text-center border-2 border-red-200 transition-all duration-300">
                <AlertCircle class="text-red-500 mx-auto mb-4" :size="48" />
                <p class="text-red-700 text-xl font-bold mb-2">
                  Journey Not Found
                </p>
                <p class="text-gray-600 text-base">
                  No normal bus timetables were found for this journey. Please double-check your spelling or try broader locations.
                </p>
              </div>

              <div v-else class="space-y-6 transition-all duration-700">

                <div class="text-center mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-200 shadow-lg">
                  <p class="text-2xl sm:text-3xl font-extrabold text-gray-900">
                    ✓ Found <span class="text-blue-600 text-3xl sm:text-4xl">{{ filteredTimetables.length }}</span> relevant timetable{{ filteredTimetables.length !== 1 ? "s" : "" }}
                  </p>
                  <p class="text-sm text-gray-500 mt-2">Showing results {{ indexOfFirstCard + 1 }} - {{ Math.min(indexOfLastCard, filteredTimetables.length) }}</p>
                </div>

                <div
                  v-for="(route, index) in currentCards"
                  :key="route.key"
                  class="bg-white rounded-3xl shadow-xl p-6 sm:p-8 border-2 border-gray-200 hover:shadow-2xl hover:border-blue-400 transition-all duration-300 relative overflow-hidden"
                >
                  <div v-if="index === 0 && currentPage === 1" class="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-4 py-1 rounded-bl-xl shadow-md transform rotate-3 translate-x-2 -translate-y-2">
                      BEST MATCH
                  </div>

                  <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 border-b pb-4 border-gray-100">
                    <div class="mb-3 sm:mb-0">
                      <h3 class="text-xl sm:text-3xl font-extrabold text-gray-800 flex items-center flex-wrap">
                        <Bus class="text-blue-600 mr-3 flex-shrink-0" :size="30" />
                        {{ route.origin }}
                        <ArrowRight class="mx-2 text-blue-500 flex-shrink-0" :size="24" />
                        {{ route.destination }}
                      </h3>
                      <p v-if="route.via" class="text-sm text-purple-600 mt-2 ml-10 font-bold flex items-center p-1 px-3 bg-purple-50 rounded-full max-w-fit border border-purple-200">
                        <Split class="mr-1" :size="16" /> via {{ route.via }}
                      </p>
                    </div>

                    <div class="bg-blue-600 text-white font-extrabold text-lg sm:text-xl px-5 py-2 rounded-full shadow-2xl flex items-center ring-4 ring-blue-100">
                      <Hash class="mr-1" :size="20" /> Route {{ route.route_no }}
                    </div>
                  </div>

                  <div class="mt-4">
                    <h4 class="text-lg sm:text-xl font-bold text-gray-700 mb-4 flex items-center border-b-2 border-green-100 pb-2">
                      <Clock class="text-green-600 mr-2" />
                      Available Departure Times ({{ route.schedules.length }})
                    </h4>

                    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                      <div
                        v-for="(schedule, schIndex) in (expandedRoutes[route.key] ? route.schedules : route.schedules.slice(0, 12))"
                        :key="schIndex"
                        class="bg-green-50 rounded-xl p-3 sm:p-4 text-center border-2 border-green-200 hover:bg-green-100 transition-all duration-200 shadow-md transform hover:scale-[1.02]"
                      >
                        <span class="text-xl sm:text-2xl font-extrabold text-gray-900 block">
                          {{ schedule.departure_time }}
                        </span>
                        <p class="text-xs text-gray-600 mt-1 flex items-center justify-center font-medium">
                          <MapPin :size="12" class="mr-1 text-blue-500" />
                          from {{ schedule.from }}
                        </p>
                      </div>
                    </div>

                    <button
                      v-if="route.schedules.length > 12"
                      @click="toggleScheduleExpansion(route.key)"
                      class="w-full mt-6 p-3 bg-blue-600 text-white font-extrabold rounded-xl shadow-lg hover:bg-blue-700 active:scale-[0.98] transition-all flex items-center justify-center ring-2 ring-blue-300 text-sm sm:text-base"
                    >
                      <template v-if="expandedRoutes[route.key]">
                        <ChevronUp :size="20" class="mr-2" /> Show Less (Showing {{ route.schedules.length }} total times)
                      </template>
                      <template v-else>
                        <ChevronDown :size="20" class="mr-2" /> Show All {{ route.schedules.length }} Times
                      </template>
                    </button>
                  </div>
                </div>

              </div>
          </div>
        </div>

        <div v-if="filteredTimetables.length > cardsPerPage && !isLoading" class="flex justify-center items-center space-x-3 mt-10 p-4 bg-white rounded-xl shadow-lg border-t border-gray-100">
          <button
            @click="goToPrevPage"
            :disabled="currentPage === 1"
            class="p-3 bg-blue-600 text-white rounded-full disabled:bg-gray-300 disabled:text-gray-500 hover:bg-blue-700 transition-colors transform active:scale-95 shadow-xl disabled:shadow-none"
            aria-label="Previous Page"
          >
            <ChevronRight :size="20" class="transform rotate-180" />
          </button>

          <span class="text-base sm:text-lg font-extrabold text-gray-700 bg-gray-100 px-5 py-2 rounded-full shadow-inner border border-gray-200">
            Page <strong class="text-blue-600">{{ currentPage }}</strong> of <strong class="text-blue-600">{{ totalPages }}</strong>
          </span>

          <button
            @click="goToNextPage"
            :disabled="currentPage === totalPages"
            class="p-3 bg-blue-600 text-white rounded-full disabled:bg-gray-300 disabled:text-gray-500 hover:bg-blue-700 transition-colors transform active:scale-95 shadow-xl disabled:shadow-none"
            aria-label="Next Page"
          >
            <ChevronRight :size="20" />
          </button>
        </div>
      </div>
    </main>

    <section class="bg-white py-16 shadow-inner">
      <div class="max-w-5xl mx-auto px-4 sm:px-6">
        <h2 class="text-3xl sm:text-4xl font-extrabold text-blue-800 mb-10 text-center">Why Trust Businfo.click?</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div class="p-6 bg-blue-50 rounded-xl shadow-lg border-t-4 border-blue-600 transform hover:scale-[1.03] transition-all duration-300">
            <ShieldCheck :size="48" class="mx-auto text-blue-600 mb-4" />
            <h3 class="font-bold text-xl text-gray-900 mb-2">Verified Data Sources</h3>
            <p class="text-gray-600 text-sm">We aggregate timetable data from official government and private bus operator sources, ensuring the highest level of accuracy for your travel planning.</p>
          </div>
          <div class="p-6 bg-green-50 rounded-xl shadow-lg border-t-4 border-green-600 transform hover:scale-[1.03] transition-all duration-300">
            <Clock :size="48" class="mx-auto text-green-600 mb-4" />
            <h3 class="font-bold text-xl text-gray-900 mb-2">Real-Time Reliability</h3>
            <p class="text-gray-600 text-sm">Our platform is updated daily. Check the latest departure times and route changes, saving you time and avoiding last-minute surprises.</p>
          </div>
          <div class="p-6 bg-purple-50 rounded-xl shadow-lg border-t-4 border-purple-600 transform hover:scale-[1.03] transition-all duration-300">
            <Globe :size="48" class="mx-auto text-purple-600 mb-4" />
            <h3 class="font-bold text-xl text-gray-900 mb-2">Serving All of Sri Lanka</h3>
            <p class="text-gray-600 text-sm">From major cities to rural towns, our database covers hundreds of normal bus routes across every province, making us your complete travel companion.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-gray-100 py-12">
      <div class="max-w-5xl mx-auto px-4 sm:px-6">
        <h2 class="text-3xl font-extrabold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500">
            <h3 class="font-bold text-lg text-blue-700 mb-2 flex items-center"><MessageSquare :size="20" class="mr-2" /> How accurate is the distance information?</h3>
            <p class="text-gray-600 text-sm">Our data is updated regularly from official bus operators to ensure maximum accuracy for your journey planning. Times are estimates, but highly reliable.</p>
          </div>
          <div class="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500">
            <h3 class="font-bold text-lg text-blue-700 mb-2 flex items-center"><MessageSquare :size="20" class="mr-2" /> Can I book tickets directly?</h3>
            <p class="text-gray-600 text-sm">Businfo.click is an information provider. We help you find routes; please contact the bus operators or use their specific booking systems directly for reservations.</p>
          </div>
          <div class="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500">
            <h3 class="font-bold text-lg text-blue-700 mb-2 flex items-center"><MessageSquare :size="20" class="mr-2" /> Which service type should I choose?</h3>
            <p class="text-gray-600 text-sm">**Normal buses** are budget-friendly. **Semi coaches** offer better comfort. **AC buses** provide a premium, air-conditioned experience.</p>
          </div>
          <div class="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500">
            <h3 class="font-bold text-lg text-blue-700 mb-2 flex items-center"><MessageSquare :size="20" class="mr-2" /> Is the travel time guaranteed?</h3>
            <p class="text-gray-600 text-sm">Travel times are estimates based on normal conditions. Actual times may vary based on traffic congestion, roadwork, and weather conditions.</p>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useHead } from '#imports'; // Nuxt 3 composable for SEO

import timetableNormal from '../data/timetable_normal.json';

// Import Lucide icons
import {
  Bus, RefreshCw, Trash2, MapPin, Clock, TrendingUp, ArrowRight, ChevronRight,
  Star, Award, Users, Zap, AlertCircle, ChevronDown, ChevronUp, Split, Hash,
  ShieldCheck, Globe, Loader2, MessageSquare
} from 'lucide-vue-next';


// ----------------- SEO Implementation -----------------

// Set Page SEO Metadata
useHead({
  title: 'Normal Bus Timetables Sri Lanka | Schedules & Routes | Businfo.click',
  meta: [
    { name: 'description', content: 'Find all normal bus timetables and schedules in Sri Lanka instantly. Search by origin and destination for the most up-to-date routes and departure times for normal bus services.' },
    { name: 'keywords', content: 'Sri Lanka normal bus, SLTB schedules, normal bus timetable, bus routes Sri Lanka, intercity normal bus, Colombo to Kandy normal bus, Sri Lankan transport' },
    { property: 'og:title', content: 'Normal Bus Timetables Sri Lanka | Schedules & Routes | Businfo.click' },
    { property: 'og:description', content: 'The most comprehensive list of normal bus timetables and schedules for all routes in Sri Lanka. Search, find, and plan your journey easily.' },
    { property: 'og:type', content: 'website' },
    { rel: 'canonical', href: 'https://businfo.click/normalwaytimes' },
  ],
  // Schema.org Structured Data for FAQPage
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
              "text": "Our data is updated regularly from official bus operators to ensure maximum accuracy for your journey planning. Times are estimates, but highly reliable."
            }
          },
          {
            "@type": "Question",
            "name": "Can I book tickets directly?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Businfo.click is an information provider. We help you find routes; please contact the bus operators or use their specific booking systems directly for reservations."
            }
          },
          {
            "@type": "Question",
            "name": "Which service type should I choose?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Normal buses are budget-friendly. Semi coaches offer better comfort. AC buses provide a premium, air-conditioned experience."
            }
          },
          {
            "@type": "Question",
            "name": "Is the travel time guaranteed?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Travel times are estimates based on normal conditions. Actual times may vary based on traffic congestion, roadwork, and weather conditions."
            }
          }
        ]
      })
    }
  ]
});

// ----------------- State and Logic -----------------

const groupedTimetables = ref([]);
const filteredTimetables = ref([]);
const origin = ref('');
const destination = ref('');
const currentPage = ref(1);
const cardsPerPage = 2;

const originSuggestions = ref([]);
const destinationSuggestions = ref([]);
const showOriginSuggestions = ref(false);
const showDestinationSuggestions = ref(false);
const language = ref('en');
const expandedRoutes = ref({});
const isLoading = ref(true); // Retain loading state

// Vue template refs
const originRef = ref(null);
const destinationRef = ref(null);
const debounceTimer = ref(null);

// Data/Constants
const tips = {
  en: "This page shows all normal bus timetables for your travel needs. Departure times are sorted for easy planning. Enter your origin and destination below to instantly filter all available routes.",
  si: "මෙහිදී ඔබගේ ගමන් අවශ්‍යතාව සදහා සාමාන්‍ය බස් වේලා සටහන් සියල්ල පෙන්වන අතර, පිටවීම් වේලාවන් සුබට කිරීම සඳහා වින්‍යාස කර ඇත. ගමන ආරම්භ කරන සහ අවසන් කරන ස්ථාන පහතින් ඇතුලත් කරන්න.",
  ta: "இந்தப் பக்கம் உங்கள் பயணத் தேவைகளுக்கான அனைத்து சாதாரண பேருந்து நேர அட்டவணைகளையும் காட்டுகிறது. உங்கள் பயணத் திட்டத்தை இலகுவாக்க, தொடக்க மற்றும் சேருமிடத்தைப் பயன்படுத்தவும்.",
};

const languages = [
  { code: "en", label: "English" },
  { code: "si", label: "සිංහල" },
  { code: "ta", label: "தமிழ்" },
];

// Utility Functions
const timeToMinutes = (time12hr) => {
  if (!time12hr || typeof time12hr !== "string") return 0;
  const parts = time12hr.match(/(\d+)[.:](\d+)\s*(AM|PM)/i);
  if (!parts) return 0;
  let hour = parseInt(parts[1], 10);
  const minute = parseInt(parts[2], 10);
  const period = parts[3].toUpperCase();
  if (period === "PM" && hour < 12) hour += 12;
  else if (period === "AM" && hour === 12) hour = 0;
  return hour * 60 + minute;
};

// Lifecycle and Data Loading
onMounted(() => {
  // Data processing logic
  const startTime = Date.now();
  const grouped = timetableNormal.reduce((acc, t) => {
    const routeNo = t.route_no;
    const originVal = t.origin || "N/A";
    const destinationVal = t.destination || "N/A";
    const via = t.via ? t.via.trim() : "";
    const key = `${routeNo}-${originVal}-${destinationVal}-${via}`;

    if (!acc[key]) {
      acc[key] = { route_no: routeNo, origin: originVal, destination: destinationVal, via, schedules: [], key };
    }

    acc[key].schedules.push({
      departure_time: t.departure_time || "N/A",
      from: t.origin || "N/A",
      sort_key: timeToMinutes(t.departure_time),
    });

    return acc;
  }, {});

  const finalGroupedArray = Object.values(grouped).map((route) => ({
    ...route,
    route_name: `${route.origin} ➜ ${route.destination}${route.via ? ` via ${route.via}` : ""}`,
    schedules: route.schedules.sort((a, b) => a.sort_key - b.sort_key),
  }));

  // Assign values to refs
  groupedTimetables.value = finalGroupedArray;
  filteredTimetables.value = finalGroupedArray;

  const origins = [...new Set(finalGroupedArray.map((r) => r.origin))];
  const destinations = [...new Set(finalGroupedArray.map((r) => r.destination))];
  originSuggestions.value = origins;
  destinationSuggestions.value = destinations;

  // Ensure isLoading is set to false after data is loaded and processed
  const delay = 500 - (Date.now() - startTime);
  setTimeout(() => {
    isLoading.value = false;
  }, Math.max(0, delay));

  // Click outside listener for suggestions
  const handleClickOutside = (event) => {
    if (originRef.value && !originRef.value.contains(event.target)) showOriginSuggestions.value = false;
    if (destinationRef.value && !destinationRef.value.contains(event.target)) showDestinationSuggestions.value = false;
  };
  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
});

// Watch for search input changes (Debounced)
watch([origin, destination], () => {
  clearTimeout(debounceTimer.value);

  debounceTimer.value = setTimeout(() => {
    const o = origin.value;
    const d = destination.value;
    const grouped = groupedTimetables.value; // Correctly access ref value

    if (!o && !d) {
      filteredTimetables.value = grouped;
      return;
    }

    const filtered = grouped.filter((route) => {
      const originMatch = o ? route.origin.toLowerCase().includes(o.toLowerCase()) : true;
      const destinationMatch = d ? route.destination.toLowerCase().includes(d.toLowerCase()) : true;
      return originMatch && destinationMatch;
    });

    filteredTimetables.value = filtered;
    currentPage.value = 1;
    expandedRoutes.value = {};
  }, 250);
});

// UI/Action Handlers
const selectOrigin = (val) => {
  origin.value = val;
  showOriginSuggestions.value = false;
};
const selectDestination = (val) => {
  destination.value = val;
  showDestinationSuggestions.value = false;
};
const swapOriginDestination = () => {
  const temp = origin.value;
  origin.value = destination.value;
  destination.value = temp;
};
const clearSelections = () => {
  origin.value = "";
  destination.value = "";
};

const toggleScheduleExpansion = (routeKey) => {
  expandedRoutes.value = {
    ...expandedRoutes.value,
    [routeKey]: !expandedRoutes.value[routeKey],
  };
};

// Computed Properties for Pagination/UI
const indexOfLastCard = computed(() => currentPage.value * cardsPerPage);
const indexOfFirstCard = computed(() => indexOfLastCard.value - cardsPerPage);
const currentCards = computed(() =>
  filteredTimetables.value.slice(indexOfFirstCard.value, indexOfLastCard.value)
);
const totalPages = computed(() =>
  Math.ceil(filteredTimetables.value.length / cardsPerPage)
);

// Pagination actions
const goToPrevPage = () => {
  currentPage.value = Math.max(currentPage.value - 1, 1);
};
const goToNextPage = () => {
  currentPage.value = Math.min(currentPage.value + 1, totalPages.value);
};
</script>

<style scoped>
/* Define slideDown animation for suggestion boxes */
@keyframes slideDown {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-slide-down {
  animation: slideDown 0.2s ease-out forwards;
}
</style>