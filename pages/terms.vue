<template>
  <div class="min-h-screen bg-gray-50">
    <Navbar />

    <section class="pt-32 pb-16 bg-gray-800 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-5xl font-extrabold mb-4">
          Terms of Service
        </h1>
        <p class="text-xl text-gray-300">
          Agreement governing the use of Businfo.click services.
        </p>
      </div>
    </section>

    <section class="py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 md:p-12 shadow-lg rounded-xl">
        <p class="text-gray-600 mb-8 border-b pb-4">
          **Effective Date:** December 5, 2025
        </p>

        <h2 class="text-3xl font-bold text-gray-900 mb-4 flex items-center">
          <FileText class="text-blue-600 mr-3" :size="28" />
          1. Agreement to Terms
        </h2>
        <p class="mb-8 text-gray-700 leading-relaxed">
          By accessing or using the website Businfo.click (the "Service"), operated by its owners ("we," "us," or "our"), you agree to be bound by these **Terms of Service** ("Terms") and our **Privacy Policy**. If you disagree with any part of the terms, then you do not have permission to access the Service.
        </p>

        <h2 class="text-3xl font-bold text-gray-900 mb-4 pt-4 border-t border-gray-100 flex items-center">
          <Bus class="text-blue-600 mr-3" :size="28" />
          2. Nature of the Service and Data Accuracy
        </h2>
        
        <h3 class="text-xl font-semibold text-gray-800 mb-2 mt-4">
          2.1 Data Disclaimer (CRITICAL for Liability)
        </h3>
        <p class="mb-4 text-gray-700">
          Businfo.click provides **verified public transport data** (routes, fares, timetables) sourced from official governmental and regulatory bodies in Sri Lanka. While we make every effort to ensure the accuracy and timeliness of the information, **the data is provided for informational and planning purposes only**.
        </p>
        <p class="mb-8 text-red-700 font-bold leading-relaxed">
          We do not guarantee that the information is error-free, complete, or up-to-the-minute. We are not liable for any losses, damages, or inconvenience resulting from reliance on the data provided on this Service. Users should independently verify critical information (e.g., departure times) before executing their travel plans.
        </p>

        <h3 class="text-xl font-semibold text-gray-800 mb-2 mt-4">
          2.2 Service Availability
        </h3>
        <p class="mb-8 text-gray-700">
          We reserve the right to modify, suspend, or discontinue the Service (or any part or content thereof) without notice at any time. We will not be liable to you or to any third party for any modification, price change, suspension, or discontinuance of the Service.
        </p>

        <h2 class="text-3xl font-bold text-gray-900 mb-4 pt-4 border-t border-gray-100 flex items-center">
          <Layers class="text-blue-600 mr-3" :size="28" />
          3. Intellectual Property Rights
        </h2>
        <p class="mb-8 text-gray-700 leading-relaxed">
          The Service and its original content (excluding public bus route and fare data, which is publicly sourced), features, and functionality are and will remain the exclusive property of Businfo.click and its licensors. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Businfo.click.
        </p>

        <h2 class="text-3xl font-bold text-gray-900 mb-4 pt-4 border-t border-gray-100 flex items-center">
          <UserCheck class="text-blue-600 mr-3" :size="28" />
          4. Prohibited Uses
        </h2>
        <p class="mb-4 text-gray-700 leading-relaxed">
          You are granted a non-exclusive, non-transferable, revocable license to access and use Businfo.click strictly in accordance with these Terms. As a condition of your use, you warrant that you will not use the Service for any purpose that is unlawful or prohibited by these Terms. Prohibited activities include:
        </p>
        <ul class="list-disc list-inside space-y-2 mb-8 ml-4 text-gray-700">
          <li>Systematic retrieval of data or other content from the Service to create or compile, directly or indirectly, a collection, compilation, database, or directory without written permission from us. **(Data Scraping)**</li>
          <li>Making any unauthorized use of the Service, including collecting usernames and/or email addresses of users by electronic or other means for the purpose of sending unsolicited email.</li>
          <li>Interfering with, circumventing, or disabling security-related features of the Service.</li>
        </ul>

        <h2 class="text-3xl font-bold text-gray-900 mb-4 pt-4 border-t border-gray-100 flex items-center">
          <AlertTriangle class="text-blue-600 mr-3" :size="28" />
          5. Limitation of Liability & Indemnification
        </h2>
        <p class="mb-4 font-semibold text-gray-800">
          Limitation of Liability
        </p>
        <p class="mb-6 text-gray-700 leading-relaxed">
          In no event shall Businfo.click, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory.
        </p>
        
        <p class="mb-4 font-semibold text-gray-800">
          Indemnification
        </p>
        <p class="mb-8 text-gray-700 leading-relaxed">
          You agree to indemnify and hold Businfo.click harmless from any demands, loss, liability, claims or expenses (including attorneys’ fees), made against them by any third party due to or arising out of or in connection with your use of the Service.
        </p>
        
        <h2 class="text-3xl font-bold text-gray-900 mb-4 pt-4 border-t border-gray-100 flex items-center">
          <Globe class="text-blue-600 mr-3" :size="28" />
          6. Governing Law
        </h2>
        <p class="mb-8 text-gray-700 leading-relaxed">
          These Terms shall be governed and construed in accordance with the **laws of Sri Lanka**, without regard to its conflict of law provisions.
        </p>

        <h2 class="text-3xl font-bold text-gray-900 mb-4 pt-4 border-t border-gray-100 flex items-center">
          <Mail class="text-blue-600 mr-3" :size="28" />
          7. Contact Information
        </h2>
        <p class="mb-4 text-gray-700 leading-relaxed">
          Questions about the Terms of Service should be sent to us at:
        </p>
        <div class="p-4 bg-blue-50 rounded-lg inline-block">
            <p class="text-blue-700 font-semibold">Email: **admin@businfo.click**</p>
        </div>

      </div>
    </section>

    <Footer />
  </div>
</template>

<script setup>
import {
  FileText, Bus, Layers, UserCheck, AlertTriangle, Globe, Mail
} from 'lucide-vue-next';

// Set page meta data for SEO
useSeoMeta({
  title: 'Terms of Service | Rules for Using Businfo.click',
  ogTitle: 'Terms of Service | Rules for Using Businfo.click',
  description: 'The official Terms of Service for Businfo.click. Read our policies regarding data usage, liability, intellectual property, and prohibited activities on our service.',
  keywords: 'Terms of Service Sri Lanka, bus data liability, website rules, data scraping policy, Businfo.click legal',
  robots: 'noindex, nofollow',
});

</script>