<template>
  <div class="min-h-screen bg-white">
    <Navbar />

    <section class="pt-32 pb-16 bg-blue-700 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-5xl font-extrabold mb-4">
          About Businfo.click
        </h1>
        <p class="text-xl text-blue-200">
          The definitive source for verified bus transport information in Sri Lanka.
        </p>
      </div>
    </section>

    <hr class="border-t border-gray-200" />

    <section class="py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        <div class="grid lg:grid-cols-3 gap-12">
            <div class="lg:col-span-1">
              <h2 class="text-3xl font-extrabold text-gray-900 mb-6 border-b-4 border-yellow-400 inline-block pb-1">
                Our Mission
              </h2>
            </div>
            <div class="lg:col-span-2 space-y-6">
              <p class="text-lg text-gray-700 leading-relaxed">
                Our core mission is to **eliminate uncertainty** in public transport travel across Sri Lanka. We strive to provide every commuter, local, and tourist with **instant, precise, and officially compliant** information regarding bus routes, fares, and timetables.
              </p>
              <p class="text-lg text-gray-700 leading-relaxed font-semibold">
                We believe that reliable data is the foundation of efficient travel. Our platform is built to deliver this reliability directly to you, every hour of every day.
              </p>
            </div>
        </div>
        
        <div class="grid lg:grid-cols-3 gap-12 pt-8 border-t border-gray-100">
            <div class="lg:col-span-1">
              <h2 class="text-3xl font-extrabold text-gray-900 mb-6 border-b-4 border-yellow-400 inline-block pb-1">
                Our Vision
              </h2>
            </div>
            <div class="lg:col-span-2 space-y-6">
              <p class="text-lg text-gray-700 leading-relaxed">
                Our vision is to become the **nation's leading and most trusted digital platform** for all public transport information, driving smarter commuting decisions and contributing significantly to the **modernization and efficiency** of Sri Lanka’s national transport ecosystem.
              </p>
              <p class="text-lg text-gray-700 leading-relaxed font-semibold">
                We aim to set the standard for transport data accuracy, making comprehensive route and fare information accessible and universal across all 25 districts.
              </p>
            </div>
        </div>

      </div>
    </section>

    <hr class="border-t border-gray-200" />

    <section class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Our Commitment to Data Integrity (E-A-T)
          </h2>
          <p class="text-lg text-gray-600 max-w-3xl mx-auto">
            Trustworthiness is earned. We detail our proprietary process for ensuring the data you rely on is always accurate.
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <div class="bg-white rounded-xl p-8 shadow-md border-t-4 border-blue-600">
            <TrendingUp class="text-blue-600 mb-4" :size="32" />
            <h3 class="text-xl font-bold text-gray-900 mb-3">Source & Compliance</h3>
            <p class="text-gray-600 text-sm">
              Our data is sourced exclusively from **official governmental gazettes** and regulatory bodies responsible for public transport in Sri Lanka. Our fare calculations are **100% compliant** with the latest authorized fare revisions.
            </p>
          </div>
          <div class="bg-white rounded-xl p-8 shadow-md border-t-4 border-green-600">
            <MapPin class="text-green-600 mb-4" :size="32" />
            <h3 class="text-xl font-bold text-gray-900 mb-3">Continuous Auditing</h3>
            <p class="text-gray-600 text-sm">
              We employ a dedicated team and automated tools to **audit route and schedule data daily**. This proactive approach ensures our information reflects real-world operational changes.
            </p>
          </div>
          <div class="bg-white rounded-xl p-8 shadow-md border-t-4 border-yellow-600">
            <Users class="text-yellow-600 mb-4" :size="32" />
            <h3 class="text-xl font-bold text-gray-900 mb-3">User Accountability</h3>
            <p class="text-gray-600 text-sm">
              We maintain an active feedback loop, allowing users to report inconsistencies. Every report is investigated, reinforcing our commitment to **transparency and accuracy**.
            </p>
          </div>
        </div>
      </div>
    </section>

    <hr class="border-t border-gray-200" />

    <section class="py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12">
        <div>
          <h2 class="text-3xl font-extrabold text-gray-900 mb-6">
            The Team Behind the Data
          </h2>
          <p class="text-lg text-gray-700 leading-relaxed mb-6">
            Businfo.click is operated by a small team of **dedicated data analysts and software engineers** based in Colombo, Sri Lanka, committed to solving the island’s public transport data challenge.
          </p>
          <NuxtLink to="/contact" class="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all">
            Contact Our Support Team <ArrowRight class="ml-2" />
          </NuxtLink>
        </div>

        <div class="p-8 bg-yellow-50 rounded-xl border border-yellow-200">
          <h3 class="text-xl font-bold text-gray-900 mb-4">Essential Contact Details</h3>
          <ul class="space-y-3 text-gray-700">
            <li class="flex items-center">
              <Mail class="text-yellow-600 mr-3" :size="20" />
              <span>For Data Queries: **data@businfo.click**</span>
            </li>
            <li class="flex items-center">
              <Info class="text-yellow-600 mr-3" :size="20" />
              <span>Business/Partnerships: **admin@businfo.click**</span>
            </li>
            <li class="flex items-center">
              <MapPin class="text-yellow-600 mr-3" :size="20" />
              <span>Location: Colombo, Sri Lanka (HQ)</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script setup>
import {
  TrendingUp, MapPin, Users, Mail, Info, ArrowRight
} from 'lucide-vue-next';

// Set page meta data for SEO
useSeoMeta({
  title: 'About Us | Our Mission for Verified Bus Data in Sri Lanka',
  ogTitle: 'About Us | Our Mission for Verified Bus Data in Sri Lanka',
  description: 'Learn about Businfo.click\'s mission to provide the most authoritative, verified, and timely bus route and fare information across Sri Lanka. Our commitment to data integrity.',
  keywords: 'About Businfo.click, Sri Lanka transport data, mission statement, data verification process, EAT compliance',
  robots: 'index, follow',
});

// Placeholder imports for your components
// import Navbar from "../components/Navbar.vue";
// import Footer from "../components/Footer.vue";
</script>