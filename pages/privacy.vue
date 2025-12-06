<template>
  <div class="min-h-screen bg-gray-50">
    <Navbar />

    <section class="pt-32 pb-16 bg-gray-800 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-5xl font-extrabold mb-4">
          Privacy Policy
        </h1>
        <p class="text-xl text-gray-300">
          Transparency in how Businfo.click handles your data.
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
          1. Introduction
        </h2>
        <p class="mb-8 text-gray-700 leading-relaxed">
          Businfo.click ("we," "our," or "us") is committed to protecting the privacy of our users. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, including the use of our official bus fare and route data services in Sri Lanka. Please read this policy carefully.
        </p>

        <h2 class="text-3xl font-bold text-gray-900 mb-4 pt-4 border-t border-gray-100 flex items-center">
          <Database class="text-blue-600 mr-3" :size="28" />
          2. Information We Collect
        </h2>
        <p class="mb-4 font-semibold text-gray-700">
          We collect two main types of information:
        </p>

        <h3 class="text-xl font-semibold text-gray-800 mb-2 mt-4">
          2.1 Non-Personal Data (Usage & Analytics)
        </h3>
        <p class="mb-4 text-gray-700">
          When you access and use Businfo.click, we automatically collect certain information that does not personally identify you. This includes:
        </p>
        <ul class="list-disc list-inside space-y-2 mb-6 ml-4 text-gray-700">
          <li>**Log Data:** IP addresses, browser type, operating system, pages viewed, time spent on pages, and referring URLS.</li>
          <li>**Search Queries:** Anonymized data regarding the origins and destinations you search for (e.g., "Colombo to Kandy"), used solely to improve our route intelligence and data accuracy.</li>
          <li>**Device Information:** Information about the device you use to access the service, such as device ID and screen resolution.</li>
        </ul>
        
        <h3 class="text-xl font-semibold text-gray-800 mb-2">
          2.2 Personal Data (If Provided)
        </h3>
        <p class="mb-8 text-gray-700">
          We only collect personally identifiable information (PII) if you voluntarily provide it to us, such as when you:
        </p>
        <ul class="list-disc list-inside space-y-2 mb-6 ml-4 text-gray-700">
          <li>Submit a query or feedback via a contact form (Name, Email Address).</li>
          <li>Sign up for a newsletter or alert service (Email Address).</li>
        </ul>

        <h2 class="text-3xl font-bold text-gray-900 mb-4 pt-4 border-t border-gray-100 flex items-center">
          <Zap class="text-blue-600 mr-3" :size="28" />
          3. How We Use Your Information
        </h2>
        <p class="mb-8 text-gray-700 leading-relaxed">
          We use the information we collect for the following purposes:
        </p>
        <ul class="list-disc list-inside space-y-2 mb-6 ml-4 text-gray-700">
          <li>**To Operate and Maintain the Service:** Ensuring the website and data tools function correctly.</li>
          <li>**To Improve Our Data Accuracy:** Analyzing anonymized route searches to identify gaps and improve the coverage and precision of our fare and route data.</li>
          <li>**To Communicate:** Responding to your customer service requests and feedback.</li>
          <li>**To Personalize Content:** To display relevant information based on your search patterns (Non-PII only).</li>
          <li>**For Advertising and Analytics:** To monitor usage, analyze trends, and measure the effectiveness of content and advertising partners (see section 4).</li>
        </ul>

        <h2 class="text-3xl font-bold text-gray-900 mb-4 pt-4 border-t border-gray-100 flex items-center">
          <Cookie class="text-blue-600 mr-3" :size="28" />
          4. Cookies and Third-Party Services
        </h2>
        
        <h3 class="text-xl font-semibold text-gray-800 mb-2 mt-4">
          4.1 Cookies and Tracking
        </h3>
        <p class="mb-4 text-gray-700">
          Businfo.click uses cookies to help analyze web traffic and user behavior. A cookie is a small file placed on your device. You may choose to disable cookies through your individual browser options.
        </p>

        <h3 class="text-xl font-semibold text-gray-800 mb-2 mt-4">
          4.2 Google Analytics
        </h3>
        <p class="mb-4 text-gray-700">
          We use **Google Analytics** to track and analyze web traffic and usage patterns. Google's use of data is governed by the Google Privacy Policy. We use this data solely for improving the speed and relevance of our services.
        </p>
        
        <h3 class="text-xl font-semibold text-gray-800 mb-2 mt-4">
          4.3 Advertising Partners (e.g., Google AdSense)
        </h3>
        <p class="mb-8 text-gray-700">
          We partner with third-party advertising networks, including **Google AdSense**, to serve ads when you visit our website. These partners may use cookies and web beacons to collect non-personal information about your visits to this and other websites in order to provide advertisements about goods and services of interest to you.
        </p>

        <h2 class="text-3xl font-bold text-gray-900 mb-4 pt-4 border-t border-gray-100 flex items-center">
          <Shield class="text-blue-600 mr-3" :size="28" />
          5. Security of Your Data
        </h2>
        <p class="mb-8 text-gray-700 leading-relaxed">
          We implement appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, please remember that we primarily handle non-personal public transport data, and no method of transmission over the Internet is 100% secure.
        </p>

        <h2 class="text-3xl font-bold text-gray-900 mb-4 pt-4 border-t border-gray-100 flex items-center">
          <Users class="text-blue-600 mr-3" :size="28" />
          6. Children's Privacy
        </h2>
        <p class="mb-8 text-gray-700 leading-relaxed">
          Our Service is not directed to anyone under the age of 13. We do not knowingly collect personally identifiable information from children under 13. If we become aware that we have collected Personal Data from a child under age 13 without verification of parental consent, we take steps to remove that information from our servers.
        </p>

        <h2 class="text-3xl font-bold text-gray-900 mb-4 pt-4 border-t border-gray-100 flex items-center">
          <RefreshCw class="text-blue-600 mr-3" :size="28" />
          7. Changes to This Policy
        </h2>
        <p class="mb-8 text-gray-700 leading-relaxed">
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Effective Date" at the top of this policy. You are advised to review this Privacy Policy periodically for any changes.
        </p>

        <h2 class="text-3xl font-bold text-gray-900 mb-4 pt-4 border-t border-gray-100 flex items-center">
          <Mail class="text-blue-600 mr-3" :size="28" />
          8. Contact Us
        </h2>
        <p class="mb-4 text-gray-700 leading-relaxed">
          If you have any questions or concerns about this Privacy Policy, please contact us at:
        </p>
        <div class="p-4 bg-blue-50 rounded-lg inline-block">
            <p class="text-blue-700 font-semibold">Email: **admin@businfo.click**</p>
            <p class="text-blue-700 font-semibold">Mail: Businfo.click Data Team, Colombo, Sri Lanka</p>
        </div>

      </div>
    </section>

    <Footer />
  </div>
</template>

<script setup>
import {
  FileText, Database, Zap, Cookie, Shield, Users, RefreshCw, Mail
} from 'lucide-vue-next';

// Set page meta data for SEO
useSeoMeta({
  title: 'Privacy Policy | Businfo.click Data Handling',
  ogTitle: 'Privacy Policy | Businfo.click Data Handling',
  description: 'Read the official Privacy Policy for Businfo.click, detailing how we collect, use, and protect user data, including information on cookies and third-party advertising (Google AdSense).',
  keywords: 'Privacy Policy Sri Lanka bus, data security, Google AdSense privacy, cookies policy, Businfo.click terms',
  robots: 'noindex, nofollow', // Often recommended for policy pages unless SEO is a specific goal
});

</script>