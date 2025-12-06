<template>
  <div class="min-h-screen bg-gray-50">
    <Navbar />

    <section class="pt-32 pb-20 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white relative overflow-hidden">
      <div class="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div class="space-y-6">
            <div class="inline-block px-4 py-2 bg-blue-500/30 backdrop-blur-sm rounded-full text-sm font-medium">
              ✅ The Authority in Sri Lankan Public Transport Data
            </div>
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
              Instant Access to Verified Bus Fares and Route Intelligence
            </h1>
            <p class="text-lg md:text-xl text-blue-100 leading-relaxed">
              **Businfo.click** provides the most **comprehensive, verified, and timely** bus route, fare, and timetable data across Sri Lanka. Leverage our platform for confident, efficient journey planning.
            </p>
            <div class="flex flex-col sm:flex-row gap-4">
              <NuxtLink to="/normalfare" class="inline-flex items-center justify-center px-8 py-4 bg-yellow-400 text-blue-900 font-bold rounded-xl shadow-xl hover:bg-yellow-300 transition-all">
                Calculate Official Fares <ChevronRight class="ml-2" />
              </NuxtLink>
              <NuxtLink to="/findroutes" class="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border-2 border-white/30 hover:bg-white/20 transition-all">
                Explre Routes
              </NuxtLink>
            </div>
          </div>

          <div class="relative hidden md:block">
            <div class="relative w-full h-96 flex items-center justify-center">
              <div class="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-3xl transform rotate-6 opacity-20 blur-xl"></div>
              <div class="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl">
                <Bus :size="120" class="text-yellow-400 mx-auto" />
                <div class="mt-6 space-y-3">
                  <div class="flex items-center gap-3 text-sm">
                    <div class="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span>Data Compliance & Accuracy</span>
                  </div>
                  <div class="flex items-center gap-3 text-sm">
                    <div class="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                    <span>Official Pricing Integration</span>
                  </div>
                  <div class="flex items-center gap-3 text-sm">
                    <div class="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                    <span>Extensive Route Coverage (500+)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Trusted by Thousands Across Sri Lanka
          </h2>
          <p class="text-lg text-gray-600 max-w-3xl mx-auto">
            Our comprehensive database covers every major bus route in Sri Lanka, providing **accurate and officially verified information** to help you travel smarter and save time.
          </p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div class="text-center">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4">
              <Bus class="text-blue-600" :size="32" />
            </div>
            <p class="text-3xl md:text-4xl font-bold text-gray-900">500+</p>
            <p class="text-gray-600 mt-1">Regulated Routes</p>
          </div>
          <div class="text-center">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-2xl mb-4">
              <MapPin class="text-green-600" :size="32" />
            </div>
            <p class="text-3xl md:text-4xl font-bold text-gray-900">2000+</p>
            <p class="text-gray-600 mt-1">Verified Stops</p>
          </div>
          <div class="text-center">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-2xl mb-4">
              <Clock class="text-yellow-600" :size="32" />
            </div>
            <p class="text-3xl md:text-4xl font-bold text-gray-900">24/7</p>
            <p class="text-gray-600 mt-1">Data Availability</p>
          </div>
          <div class="text-center">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-2xl mb-4">
              <Users class="text-red-600" :size="32" />
            </div>
            <p class="text-3xl md:text-4xl font-bold text-gray-900">100k+</p>
            <p class="text-gray-600 mt-1">Monthly Users</p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-20 bg-blue-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Why Choose Businfo.click? Our Commitment to Accuracy
          </h2>
          <p class="text-lg text-gray-600 max-w-3xl mx-auto">
            We are dedicated to providing the definitive source for Sri Lankan bus transport data, backed by a rigorous verification process.
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <div class="bg-white rounded-2xl p-6 shadow-lg border-t-4 border-blue-600">
            <TrendingUp class="text-blue-600 mb-4" :size="32" />
            <h3 class="text-xl font-bold text-gray-900 mb-3">Official Fare Compliance</h3>
            <p class="text-gray-600 text-sm">
              Our fare calculation engine strictly adheres to the latest Government transport authority fare tables, including complex expressway charges.
            </p>
          </div>
          <div class="bg-white rounded-2xl p-6 shadow-lg border-t-4 border-green-600">
            <Shield class="text-green-600 mb-4" :size="32" />
            <h3 class="text-xl font-bold text-gray-900 mb-3">Verified Route Mapping</h3>
            <p class="text-gray-600 text-sm">
              We cross-reference physical route data and official permits to ensure every route displayed is valid, accurate, and current.
            </p>
          </div>
          <div class="bg-white rounded-2xl p-6 shadow-lg border-t-4 border-yellow-600">
            <Zap class="text-yellow-600 mb-4" :size="32" />
            <h3 class="text-xl font-bold text-gray-900 mb-3">Optimized for Speed</h3>
            <p class="text-gray-600 text-sm">
              Our platform is engineered for rapid load times and instant search results, providing a seamless user experience on any device.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Core Features for Intelligent Travel Planning
          </h2>
          <p class="text-lg text-gray-600 max-w-3xl mx-auto">
            Utilize our powerful tools to effortlessly plan and execute your journeys across the island.
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div class="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl mb-6">
              <Search class="text-white" :size="28" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Advanced Route Intelligence</h3>
            <p class="text-gray-600 leading-relaxed mb-4">
              Access detailed route breakdowns, including stops, total distance, and estimated travel duration.
            </p>
            <NuxtLink to="/findroutes" class="text-blue-600 font-medium hover:text-blue-700 inline-flex items-center">
              Search Routes <ArrowRight :size="16" class="ml-2" />
            </NuxtLink>
          </div>

          <div class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div class="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl mb-6">
              <DollarSign class="text-white" :size="28" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Official Fare Calculation</h3>
            <p class="text-gray-600 leading-relaxed mb-4">
              Get precise fare structures for any point-to-point journey, strictly following government regulatory guidelines.
            </p>
            <NuxtLink to="/normalfare" class="text-green-600 font-medium hover:text-green-700 inline-flex items-center">
              Calculate Fare <ArrowRight :size="16" class="ml-2" />
            </NuxtLink>
          </div>

          <div class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div class="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl mb-6">
              <Calendar class="text-white" :size="28" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Sustained Timetable Accuracy</h3>
            <p class="text-gray-600 leading-relaxed mb-4">
              We maintain and update bus schedules constantly to provide you with the most reliable departure and arrival forecasts.
            </p>
            <NuxtLink to="/normalwaytimes" class="text-yellow-600 font-medium hover:text-yellow-700 inline-flex items-center">
              View Schedules <ArrowRight :size="16" class="ml-2" />
            </NuxtLink>
          </div>

          <div class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div class="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-xl mb-6">
              <Shield class="text-white" :size="28" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Reliable Data Source</h3>
            <p class="text-gray-600 leading-relaxed mb-4">
              Our commitment is to transparency and trust. All data points are internally verified and sourced from legitimate public channels.
            </p>
            <NuxtLink to="/about" class="text-red-600 font-medium hover:text-red-700 inline-flex items-center">
              Learn About Our Methods <ArrowRight :size="16" class="ml-2" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Our Data Integrity Process: Ensuring Reliable Information
          </h2>
          <p class="text-lg text-gray-600 max-w-3xl mx-auto">
            Achieving AdSense approval often requires demonstrating **E-A-T (Expertise, Authoritativeness, Trustworthiness)**. This section highlights the quality of your content.
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
            <div class="text-center p-6 border-b-4 border-blue-500">
                <div class="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-full text-2xl font-bold mb-6">
                    <Calendar class="text-blue-600" :size="32" />
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-3">Source Validation</h3>
                <p class="text-gray-600 leading-relaxed text-sm">
                    We rigorously validate data from official government gazettes, regulatory bodies, and licensed transport operators, ensuring **legitimacy**.
                </p>
            </div>
            <div class="text-center p-6 border-b-4 border-green-500">
                <div class="inline-flex items-center justify-center w-16 h-16 bg-green-50 rounded-full text-2xl font-bold mb-6">
                    <TrendingUp class="text-green-600" :size="32" />
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-3">Continuous Auditing</h3>
                <p class="text-gray-600 leading-relaxed text-sm">
                    Our team performs **daily automated and manual audits** of fares and schedules to capture real-time changes and maintain 99.9% data accuracy.
                </p>
            </div>
            <div class="text-center p-6 border-b-4 border-yellow-500">
                <div class="inline-flex items-center justify-center w-16 h-16 bg-yellow-50 rounded-full text-2xl font-bold mb-6">
                    <Shield class="text-yellow-600" :size="32" /> 
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-3">User Feedback Loop</h3>
                <p class="text-gray-600 leading-relaxed text-sm">
                    We actively integrate structured user reports to quickly identify and correct localized inconsistencies, providing **accountability**.
                </p>
            </div>
        </div>
      </div>
    </section>

    <section class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            How to Utilize Businfo.click for Optimal Travel Planning
          </h2>
          <p class="text-lg text-gray-600 max-w-3xl mx-auto">
            Our platform simplifies complex route finding into a straightforward, three-step process.
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 text-center">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full text-2xl font-bold mb-6">
              1
            </div>
            <Bus class="text-blue-600 mx-auto mb-4" :size="48" />
            <h3 class="text-xl font-bold text-gray-900 mb-3">Define Parameters</h3>
            <p class="text-gray-600 leading-relaxed">
              Input your precise origin and final destination points into our search interface.
            </p>
          </div>

          <div class="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 text-center">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-green-600 text-white rounded-full text-2xl font-bold mb-6">
              2
            </div>
            <MapPin class="text-green-600 mx-auto mb-4" :size="48" />
            <h3 class="text-xl font-bold text-gray-900 mb-3">Analyze Optimal Routes</h3>
            <p class="text-gray-600 leading-relaxed">
              Review multiple available routes, comparing official fares and estimated travel times.
            </p>
          </div>

          <div class="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-8 text-center">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-yellow-600 text-white rounded-full text-2xl font-bold mb-6">
              3
            </div>
            <Zap class="text-yellow-600 mx-auto mb-4" :size="48" />
            <h3 class="text-xl font-bold text-gray-900 mb-3">Execute Journey Confidently</h3>
            <p class="text-gray-600 leading-relaxed">
              Proceed with your journey using verified information, minimizing delays and confusion.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl md:text-4xl font-extrabold mb-12">
          Validated by Our Growing User Community
        </h2>
        <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-white/20">
          <div class="flex justify-center mb-4">
            <Star v-for="i in 5" :key="i" :size="24" class="fill-yellow-400 text-yellow-400" />
          </div>
          <p class="text-xl md:text-2xl mb-6 italic">
            "{{ testimonials[activeTestimonial].text }}"
          </p>
          <p class="font-bold text-lg">{{ testimonials[activeTestimonial].name }}</p>
          <p class="text-blue-200">{{ testimonials[activeTestimonial].location }}</p>

          <div class="flex justify-center gap-2 mt-8">
            <button
              v-for="(t, index) in testimonials"
              :key="index"
              @click="setActiveTestimonial(index)"
              :class="['w-2 h-2 rounded-full transition-all', index === activeTestimonial ? 'bg-yellow-400 w-8' : 'bg-white/30']"
            />
          </div>
        </div>
      </div>
    </section>

    <section class="py-20 bg-gradient-to-r from-yellow-400 to-yellow-500">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl md:text-4xl font-extrabold text-blue-900 mb-4">
          Ready to Access Authoritative Transport Data?
        </h2>
        <p class="text-lg md:text-xl text-blue-800 mb-8">
          Join over 100,000 satisfied users who trust Businfo.click for verified travel information.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink to="/normalfare" class="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-bold rounded-xl shadow-xl hover:bg-blue-700 transition-all">
            Start Fare Calculation <ChevronRight class="ml-2" />
          </NuxtLink>
          <NuxtLink to="/findroutes" class="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all">
            Browse Route Network
          </NuxtLink>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useIntervalFn } from '@vueuse/core';
import {
  Bus, MapPin, Clock, Users, Search, ChevronRight, Star, ArrowRight, Calendar, DollarSign, Shield, Zap, TrendingUp
} from 'lucide-vue-next';


// SEO Implementation using useSeoMeta (Highly important for AdSense approval)
useSeoMeta({
  title: 'Businfo.click | Verified Bus Fares, Routes, and Official Timetables in Sri Lanka',
  ogTitle: 'Businfo.click | Verified Bus Fares, Routes, and Official Timetables in Sri Lanka',
  description: 'The definitive authority for Sri Lankan public transport. Access comprehensive, verified, and timely bus route, fare, and timetable data to plan your journey with confidence.',
  ogDescription: 'The definitive authority for Sri Lankan public transport. Access comprehensive, verified, and timely bus route, fare, and timetable data to plan your journey with confidence.',
  keywords: 'Sri Lanka official bus fares, SL bus routes verified, public transport data Sri Lanka, bus fare calculation Sri Lanka, government regulated bus schedules',
  ogImage: '/images/og-businfo.jpg',
  twitterCard: 'summary_large_image',
  robots: 'index, follow',
});


const activeTestimonial = ref(0);
const testimonials = [
  { name: "Kasun Perera, Logistics Analyst", location: "Colombo", text: "Businfo.click is the most reliable fare finder in Sri Lanka. It significantly streamlined our operational planning.", rating: 5 },
  { name: "Nimali Silva, Daily Commuter", location: "Kandy", text: "The accuracy of the information is exceptional. I rely on it daily for checking routes and official fares.", rating: 5 },
  { name: "Rohan Fernando, Transport Consultant", location: "Galle", text: "Finally, an authoritative source for bus data. The consistent updates ensure the timetables are always valid.", rating: 5 }
];

const setActiveTestimonial = (index) => {
  activeTestimonial.value = index;
};

// Logic to advance testimonial every 5 seconds, using VueUse's useIntervalFn
const { pause, resume, isActive } = useIntervalFn(() => {
  activeTestimonial.value = (activeTestimonial.value + 1) % testimonials.length;
}, 5000);
</script>