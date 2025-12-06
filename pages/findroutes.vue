<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col">
    <Navbar />

    <section
      class="pt-24 pb-12 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white relative overflow-hidden"
    >
      <div
        class="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
      ></div>
      <div
        class="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"
      ></div>

      <div class="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div class="text-center mb-6">
          <div
            class="inline-block px-4 py-2 bg-blue-500/30 backdrop-blur-sm rounded-full text-sm font-medium mb-4 animate-fade-in"
          >
            <Bus class="inline mr-2" size="16" /> Sri Lanka's #1 Bus Route Finder
          </div>
          <h1
            class="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 animate-slide-down"
          >
            Find Bus Routes & Plan Your Journey
          </h1>
          <p
            class="text-lg text-blue-100 max-w-2xl mx-auto animate-fade-in"
          >
            Get instant access to {{ allRoutesData.length }}+ routes, real-time
            schedules, accurate fares, and expert travel tips
          </p>
        </div>
      </div>
    </section>

    <section class="bg-white py-8 shadow-sm">
      <div
        class="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 text-center"
      >
        <div
          class="p-4 rounded-xl bg-blue-50 shadow-md hover:shadow-lg transition-all transform hover:scale-105 cursor-pointer"
        >
          <Users size="32" class="mx-auto text-blue-600 mb-2" />
          <p class="text-xl sm:text-2xl font-bold text-blue-700">
            {{ allRoutesData.length }}+
          </p>
          <p class="text-gray-600 text-sm sm:text-base font-semibold">
            Routes Available
          </p>
        </div>
        <div
          class="p-4 rounded-xl bg-green-50 shadow-md hover:shadow-lg transition-all transform hover:scale-105 cursor-pointer"
        >
          <Star size="32" class="mx-auto text-green-600 mb-2" />
          <p class="text-xl sm:text-2xl font-bold text-green-700">
            {{ allSections.length }}+
          </p>
          <p class="text-gray-600 text-sm sm:text-base font-semibold">
            Cities & Towns
          </p>
        </div>
        <div
          class="p-4 rounded-xl bg-yellow-50 shadow-md hover:shadow-lg transition-all transform hover:scale-105 cursor-pointer"
        >
          <Award size="32" class="mx-auto text-yellow-600 mb-2" />
          <p class="text-xl sm:text-2xl font-bold text-yellow-700">100k+</p>
          <p class="text-gray-600 text-sm sm:text-base font-semibold">
            Happy Users
          </p>
        </div>
      </div>
    </section>

    <main class="flex-1 px-4 sm:px-6 py-12">
      <div class="max-w-5xl mx-auto">
        <div class="flex flex-wrap justify-center gap-3 mb-8 animate-fade-in">
          <button
            v-for="langOption in languages"
            :key="langOption.code"
            @click="language = langOption.code"
            :class="[
              'px-6 py-2 rounded-lg border-2 transition-all duration-300 font-medium transform active:scale-95 hover:scale-105',
              language === langOption.code
                ? 'bg-blue-600 text-white border-blue-600 shadow-lg'
                : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400',
            ]"
          >
            {{ langOption.label }}
          </button>
        </div>

        <div
          class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 sm:p-8 mb-10 border-2 border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300 animate-slide-up"
        >
          <div class="flex items-start gap-4">
            <TrendingUp
              class="text-blue-600 flex-shrink-0 mt-1"
              size="24"
            />
            <div>
              <h3 class="text-lg font-semibold text-blue-800 mb-3">
                💡 How it works
              </h3>
              <p
                class="text-gray-700 text-sm sm:text-base leading-relaxed"
              >
                {{ tips[language] || tips["en"] }}
              </p>
              <div
                class="bg-white rounded-lg p-3 mt-4 border border-blue-200"
              >
                <p class="text-xs sm:text-sm text-gray-600 font-medium">
                  Example: Colombo ➜ Kandy | කොළඹ ➜ මහනුවර | கொழும்பு ➜ கண்டி
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          ref="searchCardRef"
          class="bg-white rounded-3xl shadow-2xl p-8 sm:p-10 mb-10 border-2 border-gray-100 hover:shadow-2xl transition-all duration-300 animate-slide-up"
        >
          <h2
            class="text-2xl sm:text-3xl font-extrabold text-blue-700 mb-8 text-center"
          >
            🔍 Search Your Perfect Route
          </h2>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div class="relative" ref="originRef">
              <label class="block text-sm font-bold text-gray-800 mb-2">
                <MapPin class="inline mr-2" size="18" />
                Starting Point
              </label>
              <input
                type="text"
                placeholder="Enter starting location..."
                v-model="origin"
                @focus="showOriginSuggestions = true"
                class="w-full border-2 border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-md transition-all text-base hover:border-blue-400"
                autocomplete="off"
              />
              <ul
                v-if="showOriginSuggestions && filteredOriginSections.length > 0"
                class="absolute z-20 w-full max-h-48 overflow-y-auto bg-white border-2 border-gray-300 rounded-xl mt-2 shadow-xl animate-slide-down"
              >
                <li
                  v-for="(sec, idx) in filteredOriginSections"
                  :key="idx"
                  @click="selectOrigin(sec)"
                  class="cursor-pointer px-4 py-3 hover:bg-blue-500 hover:text-white transition-all font-medium border-b border-gray-100 last:border-b-0 transform hover:scale-105 hover:pl-6"
                >
                  <MapPin class="inline mr-2" size="16" />
                  {{ sec }}
                </li>
              </ul>
            </div>

            <div class="relative" ref="destinationRef">
              <label class="block text-sm font-bold text-gray-800 mb-2">
                <MapPin class="inline mr-2" size="18" />
                Destination
              </label>
              <input
                type="text"
                placeholder="Enter destination..."
                v-model="destination"
                @focus="showDestinationSuggestions = true"
                class="w-full border-2 border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-md transition-all text-base hover:border-blue-400"
                autocomplete="off"
              />
              <ul
                v-if="
                  showDestinationSuggestions &&
                  filteredDestinationSections.length > 0
                "
                class="absolute z-20 w-full max-h-48 overflow-y-auto bg-white border-2 border-gray-300 rounded-xl mt-2 shadow-xl animate-slide-down"
              >
                <li
                  v-for="(sec, idx) in filteredDestinationSections"
                  :key="idx"
                  @click="selectDestination(sec)"
                  class="cursor-pointer px-4 py-3 hover:bg-blue-500 hover:text-white transition-all font-medium border-b border-gray-100 last:border-b-0 transform hover:scale-105 hover:pl-6"
                >
                  <MapPin class="inline mr-2" size="16" />
                  {{ sec }}
                </li>
              </ul>
            </div>
          </div>

          <div
            class="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-2"
          >
            <button
              @click="swapOriginDestination"
              :disabled="!origin || !destination"
              class="flex items-center justify-center w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-semibold transform active:scale-95 hover:scale-105 shadow-md hover:shadow-lg"
            >
              <RefreshCw size="18" class="mr-2" /> Swap
            </button>

            <button
              @click="clearSelections"
              class="flex items-center justify-center w-full sm:w-auto px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all duration-300 font-semibold transform active:scale-95 hover:scale-105 shadow-md hover:shadow-lg"
            >
              <Trash2 size="18" class="mr-2" /> Clear
            </button>

            <button
              @click="findRoutes"
              :disabled="loading || !origin || !destination || origin === destination"
              class="flex-1 sm:flex-none flex items-center justify-center px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-bold transform active:scale-95 hover:scale-105 hover:from-blue-700 hover:to-blue-800"
            >
              <template v-if="loading">
                <Bus class="animate-spin mr-2" size="20" /> Searching...
              </template>
              <template v-else>
                <Zap size="20" class="mr-2" /> Search Routes
                <ChevronRight size="20" class="ml-2" />
              </template>
            </button>
          </div>
        </div>

        <div class="min-h-96">
          <div
            v-if="loading"
            class="bg-white rounded-3xl shadow-xl p-12 text-center border-2 border-blue-200 animate-fade-in"
          >
            <Bus
              class="animate-bounce mx-auto text-blue-600 mb-4"
              size="48"
            />
            <p class="text-gray-600 text-lg font-semibold">
              Finding best routes for you...
            </p>
          </div>

          <div
            v-else-if="rawMatchingRoutes.length === 0"
            class="bg-white rounded-3xl shadow-lg p-12 text-center border-2 border-gray-200 animate-fade-in"
          >
            <Bus class="text-gray-400 mx-auto mb-4" size="48" />
            <p class="text-gray-600 text-lg font-semibold">
              {{
                origin && destination
                  ? "No routes found for this journey. Try different locations."
                  : "Enter your starting point and destination to find available routes."
              }}
            </p>
          </div>

          <div v-else class="space-y-6 animate-fade-in">
            <div
              class="text-center mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-200"
            >
              <p class="text-2xl sm:text-3xl font-bold text-gray-900">
                ✓ Found
                <span class="text-blue-600 text-3xl sm:text-4xl"
                  >{{ rawMatchingRoutes.length }}</span
                >
                route{{ rawMatchingRoutes.length > 1 ? "s" : "" }}
              </p>
              <p
                class="text-gray-600 mt-3 text-sm sm:text-base font-semibold"
              >
                {{ origin }}
                <ArrowRight class="inline mx-2" size="20" />
                {{ destination }}
              </p>
            </div>

            <div
              class="bg-white p-4 rounded-xl shadow-inner border border-gray-200 mb-6 flex flex-wrap justify-between items-center gap-4"
            >
              <div class="flex flex-wrap gap-2 items-center">
                <Filter size="18" class="text-blue-600 flex-shrink-0" />
                <span class="font-semibold text-gray-700 text-sm mr-2"
                  >Filter by Service:</span
                >
                <button
                  v-for="type in ['All', 'Normal', 'Semi', 'AC']"
                  :key="type"
                  @click="filterType = type"
                  :class="[
                    'px-3 py-1 text-xs font-semibold rounded-full transition-all duration-200 transform hover:scale-105',
                    filterType === type
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300',
                  ]"
                >
                  {{ type }}
                </button>
              </div>

              <div class="flex items-center gap-2">
                <span class="font-semibold text-gray-700 text-sm"
                  >Sort by:</span
                >
                <select
                  v-model="sortBy"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2"
                >
                  <option value="route_no">Route Number</option>
                  <option value="time">Travel Time (Fastest)</option>
                  <option value="distance">Distance (Shortest)</option>
                </select>
              </div>
            </div>

            <div v-if="matchingRoutes.length > 0" class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div
                v-for="(route, idx) in matchingRoutes"
                :key="idx"
                class="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100 hover:shadow-2xl hover:border-blue-300 transition-all duration-300 transform hover:scale-105 animate-slide-up"
              >
                <div
                  class="mb-6 pb-4 border-b-2 border-gray-200 flex justify-between items-start"
                >
                  <div>
                    <h3 class="text-xl font-bold text-blue-700">
                      {{ route.route_name }}
                    </h3>
                    <p
                      class="text-sm text-gray-500 font-semibold mt-1"
                    >
                      Route #{{ normalizeRouteNo(route.route_no) }}
                    </p>
                  </div>
                  <div
                    class="bg-blue-100 px-3 py-1 rounded-full text-xs font-bold text-blue-600"
                  >
                    {{ route.services.length }} Options
                  </div>
                </div>

                <div class="space-y-3">
                  <div
                    v-for="(s, i) in route.services.filter(
                      (s) => filterType === 'All' || s.type === filterType
                    )"
                    :key="i"
                    :class="[
                      'p-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] cursor-pointer border-2 hover:shadow-md',
                      s.type === 'Normal'
                        ? 'bg-gray-100 border-gray-300'
                        : s.type === 'Semi'
                        ? 'bg-blue-50 border-blue-300'
                        : 'bg-green-50 border-green-300',
                    ]"
                  >
                    <div
                      class="flex justify-between items-start mb-3"
                    >
                      <div>
                        <span class="font-bold text-lg">{{ s.type }}</span>
                        <p class="text-xs text-gray-600 mt-1">
                          {{
                            s.type === "Normal"
                              ? "Budget Friendly"
                              : s.type === "Semi"
                              ? "Comfortable"
                              : "Premium"
                          }}
                        </p>
                      </div>
                      <Bus size="20" class="opacity-60" />
                    </div>

                    <div
                      class="grid grid-cols-2 gap-x-4 gap-y-2 text-sm"
                    >
                      <div class="flex items-center">
                        <MapPin
                          size="14"
                          class="mr-1 text-gray-500"
                        />
                        <span class="text-gray-600 font-medium"
                          >Distance:</span
                        >
                      </div>
                      <span
                        :class="[
                          'font-bold text-right',
                          s.distance === 'N/A' ? 'text-red-500' : 'text-gray-900',
                        ]"
                      >
                        <template v-if="s.distance !== 'N/A'">
                          {{ s.distance }} km
                        </template>
                        <span v-else class="text-red-500 flex items-center justify-end">
                          <AlertCircle size="14" class="mr-1" />
                          Data Missing
                        </span>
                      </span>

                      <div class="flex items-center">
                        <Clock size="14" class="mr-1 text-gray-500" />
                        <span class="text-gray-600 font-medium"
                          >Travel Time:</span
                        >
                      </div>
                      <span
                        :class="[
                          'font-bold text-right',
                          s.travel_time === 'N/A'
                            ? 'text-red-500'
                            : 'text-gray-900',
                        ]"
                      >
                        <template v-if="s.travel_time !== 'N/A'">
                          {{ formatTravelTime(s.travel_time) }}
                        </template>
                        <span v-else class="text-red-500 flex items-center justify-end">
                          <AlertCircle size="14" class="mr-1" />
                          Data Missing
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div v-else class="bg-white rounded-3xl shadow-lg p-12 text-center border-2 border-yellow-200 animate-fade-in">
                <X class="text-yellow-500 mx-auto mb-4" size="48" />
                <p class="text-gray-600 text-lg font-semibold">
                    No **{{ filterType }}** routes found matching your criteria. Try changing the filter or sort options.
                </p>
            </div>
          </div>
        </div>
      </div>
    </main>

    <button
      v-if="rawMatchingRoutes.length > 0"
      @click="scrollToSearch"
      class="fixed bottom-6 right-6 z-50 flex items-center px-5 py-3 bg-red-600 text-white rounded-full shadow-2xl hover:bg-red-700 transition-all duration-300 font-bold transform active:scale-95 hover:scale-105"
    >
      <RefreshCw size="18" class="mr-2" /> New Search
    </button>

    <section class="bg-gray-100 py-12">
      <div class="max-w-5xl mx-auto px-4 sm:px-6">
        <h2
          class="text-3xl font-bold text-gray-900 mb-8 text-center"
        >
          Frequently Asked Questions
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-white p-6 rounded-xl shadow-md">
            <h3 class="font-bold text-lg text-blue-700 mb-2">
              How accurate is the distance information?
            </h3>
            <p class="text-gray-600 text-sm">
              Our data is updated regularly from official bus operators to ensure
              maximum accuracy for your journey planning.
            </p>
          </div>
          <div class="bg-white p-6 rounded-xl shadow-md">
            <h3 class="font-bold text-lg text-blue-700 mb-2">
              Can I book tickets directly?
            </h3>
            <p class="text-gray-600 text-sm">
              Use our platform to find routes, and then contact the bus operators
              or use their booking systems directly.
            </p>
          </div>
          <div class="bg-white p-6 rounded-xl shadow-md">
            <h3 class="font-bold text-lg text-blue-700 mb-2">
              Which service type should I choose?
            </h3>
            <p class="text-gray-600 text-sm">
              Normal buses are budget-friendly, Semi coaches offer comfort, and AC
              buses provide premium experience with air conditioning.
            </p>
          </div>
          <div class="bg-white p-6 rounded-xl shadow-md">
            <h3 class="font-bold text-lg text-blue-700 mb-2">
              Is the travel time guaranteed?
            </h3>
            <p class="text-gray-600 text-sm">
              Travel times are estimates based on normal traffic conditions. Actual
              times may vary based on traffic and road conditions.
            </p>
          </div>
        </div>
      </div>
    </section>
    
    <section class="bg-blue-50 py-12">
      <div class="max-w-5xl mx-auto px-4 sm:px-6">
        <h2
          class="text-3xl font-bold text-gray-900 mb-8 text-center"
        >
          Understanding Sri Lanka's Bus Service Types
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div class="bg-white p-6 rounded-xl shadow-lg border-t-4 border-gray-400">
            <Bus size="32" class="mx-auto text-gray-600 mb-3" />
            <h3 class="font-bold text-xl text-gray-800 mb-2">Normal Service</h3>
            <p class="text-gray-600 text-sm">
              The most common and budget-friendly option. These buses stop frequently at all designated stops, serving local commuters. Best for short-to-medium distances and cost-saving.
            </p>
          </div>
          <div class="bg-white p-6 rounded-xl shadow-lg border-t-4 border-blue-600">
            <Users size="32" class="mx-auto text-blue-600 mb-3" />
            <h3 class="font-bold text-xl text-blue-800 mb-2">Semi-Luxury (Semi)</h3>
            <p class="text-gray-600 text-sm">
              Offers a balance of speed and comfort. They stop less frequently than Normal services and often have better seating. Ideal for inter-city travel where comfort is preferred over the absolute lowest fare.
            </p>
          </div>
          <div class="bg-white p-6 rounded-xl shadow-lg border-t-4 border-green-600">
            <Award size="32" class="mx-auto text-green-600 mb-3" />
            <h3 class="font-bold text-xl text-green-800 mb-2">Air Conditioned (AC)</h3>
            <p class="text-gray-600 text-sm">
              The premium service providing maximum comfort, featuring reliable air conditioning and often direct or express routes. Primarily used for long-distance journeys between major cities.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-white py-12">
      <div class="max-w-5xl mx-auto px-4 sm:px-6">
        <h2
          class="text-3xl font-bold text-gray-900 mb-8 text-center"
        >
          Popular Sri Lankan Bus Routes
        </h2>
        <p class="text-center text-gray-600 mb-6 max-w-2xl mx-auto">
          Explore some of the most frequently searched routes to major cities and tourist destinations. Click on the cards to automatically populate the search and view results.
        </p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div 
            @click="selectOrigin('Colombo'); selectDestination('Kandy'); findRoutes()"
            class="bg-blue-50 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-[1.03] border border-blue-200"
          >
            <MapPin size="24" class="inline text-blue-700 mr-2" />
            <span class="font-bold text-xl text-gray-900">Colombo ➜ Kandy</span>
            <p class="text-gray-600 text-sm mt-2">The scenic journey to the hill capital, featuring frequent AC and Semi services.</p>
          </div>
          <div
            @click="selectOrigin('Colombo'); selectDestination('Galle'); findRoutes()"
            class="bg-green-50 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-[1.03] border border-green-200"
          >
            <MapPin size="24" class="inline text-green-700 mr-2" />
            <span class="font-bold text-xl text-gray-900">Colombo ➜ Galle</span>
            <p class="text-gray-600 text-sm mt-2">A major route along the Southern Expressway, known for the fastest travel times via AC coaches.</p>
          </div>
          <div
            @click="selectOrigin('Jaffna'); selectDestination('Colombo'); findRoutes()"
            class="bg-yellow-50 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-[1.03] border border-yellow-200"
          >
            <MapPin size="24" class="inline text-yellow-700 mr-2" />
            <span class="font-bold text-xl text-gray-900">Jaffna ➜ Colombo</span>
            <p class="text-gray-600 text-sm mt-2">The longest inter-provincial journey, served primarily by comfortable AC overnight buses.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-blue-50 py-12 border-t-4 border-blue-600">
      <div
        class="max-w-5xl mx-auto px-4 sm:px-6 text-center"
      >
        <h2 class="text-2xl font-bold text-gray-900 mb-6">
          Why Choose Businfo.click?
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <Award size="40" class="mx-auto text-blue-600 mb-3" />
            <h3 class="font-bold mb-2">Most Comprehensive</h3>
            <p class="text-sm text-gray-600">
              All Sri Lankan bus routes in one place
            </p>
          </div>
          <div>
            <Zap size="40" class="mx-auto text-blue-600 mb-3" />
            <h3 class="font-bold mb-2">Real-Time Data</h3>
            <p class="text-sm text-gray-600">Updated information 24/7</p>
          </div>
          <div>
            <Users size="40" class="mx-auto text-blue-600 mb-3" />
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
import {
  ref,
  computed,
  onMounted,
  onUnmounted,
  watch,
  reactive,
} from "vue";
// Ensure you have installed 'lucide-vue-next' and are using it correctly
import {
  Bus,
  RefreshCw,
  Trash2,
  MapPin,
  Clock,
  TrendingUp,
  ArrowRight,
  ChevronRight,
  Star,
  Award,
  Users,
  Zap,
  AlertCircle,
  Filter,
  X,
} from "lucide-vue-next"; 

// --- SEO OPTIMIZATION TAGS (Implement according to your Vue/Nuxt setup) ---
// If you are using Nuxt 3, uncomment and use 'useHead':

import { useHead } from "#imports";

useHead({
  title: "Sri Lanka Bus Routes Finder | Real-Time Schedules & Fares",
  meta: [
    {
      name: "description",
      content: "Find the fastest and cheapest bus routes across Sri Lanka. Get up-to-date information on Normal, Semi-Luxury, and AC services, fares, distances, and travel times.",
    },
    {
      name: "keywords",
      content: "Sri Lanka bus routes, SLTB routes, Private bus schedule, Colombo Kandy bus, bus fare Sri Lanka, bus time table, route finder",
    },
    { property: "og:title", content: "Sri Lanka Bus Routes Finder" },
    {
      property: "og:description",
      content: "Find the fastest and cheapest bus routes across Sri Lanka. Get up-to-date information on Normal, Semi-Luxury, and AC services, fares, distances, and travel times.",
    },
    // Add canonical link for SEO best practice
    { rel: 'canonical', href: 'https://businfo.click/findroutes' }, 
  ],
});


// --- DATA IMPORTS (Nuxt 3 alias: Assuming data files are in a directory named 'data' at the project root) ---
// You will need to create these files in your Nuxt project: 
// /data/all_section.json, /data/allroutes.json, /data/normal.json, /data/semi.json, /data/ac.json
// Note: If you have a different project structure, adjust the paths accordingly.
import allSectionsData from "~/data/all_section.json";
import allRoutesData from "~/data/allroutes.json";
import normalData from "~/data/normal.json";
import semiData from "~/data/semi.json";
import acData from "~/data/ac.json";

// Note: `useBlockInspect` hook is not included as it was a custom React hook.
// import useBlockInspect from "~/composables/useBlockInspect"; 

// --- STATE MAPPING (React's useState/useRef -> Vue's ref) ---
const origin = ref("");
const destination = ref("");
const rawMatchingRoutes = ref([]);
const allSections = ref([]);
const loading = ref(false);
const sectionMap = reactive({}); // reactive for large map objects
const routeMap = reactive({});
const showOriginSuggestions = ref(false);
const showDestinationSuggestions = ref(false);
const debouncedOriginQuery = ref("");
const debouncedDestinationQuery = ref("");
const mainTownSuggestions = ref([]);
const normalMap = reactive({});
const semiMap = reactive({});
const acMap = reactive({});
const language = ref("en");

// ENGAGEMENT INCREMENTS STATE
const filterType = ref("All"); // All, Normal, Semi, AC
const sortBy = ref("route_no"); // route_no, time, distance

// Refs for DOM elements
const searchCardRef = ref(null);
const originRef = ref(null);
const destinationRef = ref(null);

// --- CONSTANTS ---
const tips = {
  en: "This page shows all possible routes for your travel needs, and please note that the distance and travel time shown here are for the entire route.",
  si: "මෙහිදී ඔබගේ ගමන් අවශ්‍යතාව සදහා භාවිතා කළ හැකි සෑම ගමන් මාර්ගයක්ම පෙන්වන අතර මෙහිදී පෙන්වන දුර සහ ගමන් කාලය පෙන්නනුයේ අදාළ සම්පූර්ණ Route එක සදහා බව කරුණාවෙන් සළකන්න.",
  ta: "இந்தப் பக்கம் உங்கள் பயணத் தேவைகளுக்கான அனைத்து சாத்தியமான வழிகளையும் காட்டுகிறது, மேலும் இங்கே காட்டப்பட்டுள்ள தூரம் மற்றும் பயண நேரம் முழு வழிக்கும் என்பதை நினைவில் கொள்ளவும்.",
};

const languages = [
  { code: "en", label: "English" },
  { code: "si", label: "සිංහල" },
  { code: "ta", label: "தமிழ்" },
];

// --- UTILITY FUNCTIONS ---

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

const formatTravelTime = (time) => {
  if (!time) return "";
  const num = parseFloat(time);
  const hours = Math.floor(num);
  // Preserving the original React component's logic for minutes calculation
  const minutes = Math.round((num - hours) * 100); 
  return `${hours}:${minutes.toString().padStart(2, "0")} hrs`;
};

// --- REACTIVE DEBOUNCE LOGIC (Watcher + Timer) ---
let debounceTimer = null;

const debounce = (func, delay) => {
  return (...args) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(null, args), delay);
  };
};

// Debounce watchers
watch(
  origin,
  debounce((newOrigin) => {
    debouncedOriginQuery.value = newOrigin;
  }, 150)
);

watch(
  destination,
  debounce((newDestination) => {
    debouncedDestinationQuery.value = newDestination;
  }, 150)
);

// --- DATA INITIALIZATION (React's useEffect -> Vue's onMounted) ---
onMounted(() => {
  // Data processing logic from the original useEffect
  const sMap = {};
  const uniqueSections = new Set();
  const mainTownNames = [
    "COLOMBO",
    "KANDY",
    "GALLE",
    "JAFFNA",
    "ANURADHAPURA",
    "KURUNEGALA",
    "BADULLA",
    "TRINCOMALEE",
    "MATARA",
    "BATTICALOA",
  ];
  const foundMainTowns = new Set();

  allSectionsData.forEach((sec) => {
    const normalizedRouteNo = normalizeRouteNo(sec.route_no);
    if (!sMap[normalizedRouteNo]) sMap[normalizedRouteNo] = {};
    sMap[normalizedRouteNo][sec.section_name] = sec;
    uniqueSections.add(sec.section_name);

    if (mainTownNames.includes(sec.section_name.toUpperCase())) {
      foundMainTowns.add(sec.section_name);
    }
  });

  const rMap = {};
  allRoutesData.forEach((r) => {
    const normalizedRouteNo = normalizeRouteNo(r.Route_No);
    rMap[normalizedRouteNo] = r;
  });

  const makeMap = (data) => {
    const map = {};
    data.forEach((r) => {
      const normalized = normalizeRouteNo(r.route_no);
      map[normalized] = r;
    });
    return map;
  };

  Object.assign(sectionMap, sMap);
  Object.assign(routeMap, rMap);
  allSections.value = Array.from(uniqueSections).sort();
  Object.assign(normalMap, makeMap(normalData));
  Object.assign(semiMap, makeMap(semiData));
  Object.assign(acMap, makeMap(acData));
  mainTownSuggestions.value = Array.from(foundMainTowns).sort();

  // Click outside logic
  const handleClickOutside = (event) => {
    if (originRef.value && !originRef.value.contains(event.target)) {
      showOriginSuggestions.value = false;
    }
    if (
      destinationRef.value &&
      !destinationRef.value.contains(event.target)
    ) {
      showDestinationSuggestions.value = false;
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  onUnmounted(() => {
    document.removeEventListener("mousedown", handleClickOutside);
    clearTimeout(debounceTimer); // Clear debounce timer on unmount
  });
});

// --- COMPUTED PROPERTIES (React's useMemo -> Vue's computed) ---
const filteredOriginSections = computed(() => {
  if (!debouncedOriginQuery.value) return mainTownSuggestions.value;
  return allSections.value.filter((s) =>
    s
      .toLowerCase()
      .includes(debouncedOriginQuery.value.toLowerCase())
  );
});

const filteredDestinationSections = computed(() => {
  if (!debouncedDestinationQuery.value) return mainTownSuggestions.value;
  return allSections.value.filter((s) =>
    s
      .toLowerCase()
      .includes(debouncedDestinationQuery.value.toLowerCase())
  );
});

const matchingRoutes = computed(() => {
  let sortedRoutes = [...rawMatchingRoutes.value];

  // 1. Filtering by Service Type
  if (filterType.value !== "All") {
    sortedRoutes = sortedRoutes.filter((route) =>
      route.services.some(
        (service) => service.type === filterType.value
      )
    );
  }

  // 2. Sorting
  sortedRoutes.sort((a, b) => {
    if (sortBy.value === "time") {
      // Use min_time for sorting (fastest first)
      const timeA = a.min_time === Infinity ? 999999 : a.min_time;
      const timeB = b.min_time === Infinity ? 999999 : b.min_time;
      return timeA - timeB; 
    }
    if (sortBy.value === "distance") {
      // Use min_distance for sorting (shortest first)
      const distA = a.min_distance === Infinity ? 999999 : a.min_distance;
      const distB = b.min_distance === Infinity ? 999999 : b.min_distance;
      return distA - distB;
    }
    // Default: Sort by Route Number
    return a.route_no.localeCompare(b.route_no);
  });

  return sortedRoutes;
});

// --- METHODS ---

const selectOrigin = (sec) => {
  origin.value = sec;
  showOriginSuggestions.value = false;
};

const selectDestination = (sec) => {
  destination.value = sec;
  showDestinationSuggestions.value = false;
};

const swapOriginDestination = () => {
  [origin.value, destination.value] = [
    destination.value,
    origin.value,
  ];
};

const clearSelections = () => {
  origin.value = "";
  destination.value = "";
  rawMatchingRoutes.value = [];
  filterType.value = "All";
  sortBy.value = "route_no";
};

const findRoutes = () => {
  if (!origin.value || !destination.value || origin.value === destination.value)
    return;
  loading.value = true;
  rawMatchingRoutes.value = []; // Clear previous results immediately

  // Simulate API delay with setTimeout
  setTimeout(() => {
    const foundRoutes = [];

    Object.keys(sectionMap).forEach((routeNo) => {
      const sections = sectionMap[routeNo];
      if (sections[origin.value] && sections[destination.value]) {
        const routeInfo = routeMap[routeNo] || {};
        const services = [];

        if (normalMap[routeNo]) {
          services.push({
            type: "Normal",
            distance: normalMap[routeNo].distance || "N/A",
            travel_time: normalMap[routeNo].travel_time || "N/A",
          });
        }
        if (semiMap[routeNo]) {
          services.push({
            type: "Semi",
            distance: semiMap[routeNo].distance || "N/A",
            travel_time: semiMap[routeNo].travel_time || "N/A",
          });
        }
        if (acMap[routeNo]) {
          services.push({
            type: "AC",
            distance: acMap[routeNo].distance || "N/A",
            travel_time: acMap[routeNo].travel_time || "N/A",
          });
        }

        if (services.length > 0) {
          // Calculate aggregated metrics for sorting
          const allDistances = services
            .map((s) => parseFloat(s.distance))
            .filter((d) => !isNaN(d));
          const allTimes = services
            .map((s) => parseFloat(s.travel_time))
            .filter((t) => !isNaN(t));

          foundRoutes.push({
            route_no: routeNo,
            route_name: routeInfo.Origin
              ? `${routeInfo.Origin} ➜ ${routeInfo.Destination}`
              : `Route ${routeNo}`,
            services,
            // Assign Infinity if no valid data is found for reliable sorting
            min_distance: allDistances.length
              ? Math.min(...allDistances)
              : Infinity,
            min_time: allTimes.length ? Math.min(...allTimes) : Infinity,
          });
        }
      }
    });

    rawMatchingRoutes.value = foundRoutes;
    loading.value = false;
    // Scroll to results or search card
    setTimeout(() => {
      if (searchCardRef.value) {
        window.scrollTo({
          top: searchCardRef.value.offsetTop,
          behavior: "smooth",
        });
      }
    }, 100);
  }, 500);
};

const scrollToSearch = () => {
  if (searchCardRef.value) {
    window.scrollTo({
      top: searchCardRef.value.offsetTop,
      behavior: "smooth",
    });
  }
};
</script>

<style scoped>
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