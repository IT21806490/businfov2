<template>
  <div class="min-h-screen bg-gray-50">
    <Navbar />

    <section class="pt-32 pb-16 bg-blue-700 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-5xl font-extrabold mb-4">
          Contact Businfo.click
        </h1>
        <p class="text-xl text-blue-200">
          Get in touch with our team for support, data inquiries, or partnerships.
        </p>
      </div>
    </section>

    <section class="py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            How Can We Help You?
          </h2>
          <p class="text-lg text-gray-600 max-w-3xl mx-auto">
            For the fastest response and general support, please use our official social media channel.
          </p>
        </div>

        <div class="grid lg:grid-cols-3 gap-10">

          <div class="lg:col-span-1 bg-white p-8 rounded-xl shadow-lg border-t-4 border-blue-600 text-center flex flex-col items-center justify-center">
            <Facebook class="text-blue-600 mb-4" :size="40" />
            <h3 class="text-2xl font-bold text-gray-900 mb-3">
              General Support & Feedback
            </h3>
            <p class="text-gray-600 mb-6">
              Reach out via our Facebook page for instant messaging support regarding route queries, technical issues, or general feedback.
            </p>
            <a href="https://www.facebook.com/businfo.click" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center px-8 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 transition-all">
              Message Us on Facebook <ArrowRight class="ml-2" :size="20" />
            </a>
          </div>

          <div class="bg-white p-8 rounded-xl shadow-lg border-t-4 border-yellow-500">
            <ShieldCheck class="text-yellow-500 mb-4" :size="40" />
            <h3 class="text-2xl font-bold text-gray-900 mb-3">
              Data Inquiries
            </h3>
            <p class="text-gray-600 mb-6">
              If you have specific questions about our data sources, verification processes, or need to report data discrepancies (fares/routes).
            </p>
            <div class="flex items-center text-gray-800 font-medium">
              <Mail class="text-yellow-600 mr-3" :size="20" />
              <span>Email: **data@businfo.click**</span>
            </div>
          </div>

          <div class="bg-white p-8 rounded-xl shadow-lg border-t-4 border-green-500">
            <Briefcase class="text-green-500 mb-4" :size="40" />
            <h3 class="text-2xl font-bold text-gray-900 mb-3">
              Business & Media
            </h3>
            <p class="text-gray-600 mb-6">
              For partnership proposals, media inquiries, API access, or any administrative matters.
            </p>
            <div class="flex items-center text-gray-800 font-medium">
              <Mail class="text-green-600 mr-3" :size="20" />
              <span>Email: **admin@businfo.click**</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 bg-gray-100">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 class="text-2xl font-bold text-gray-900 mb-6 text-center">Our Location (Data Team)</h3>
            <div class="h-96 w-full bg-gray-200 rounded-xl shadow-inner flex items-center justify-center">
                <p class="text-gray-500 font-semibold">
                    [Map Placeholder - E.g., Embed Google Map of Colombo, Sri Lanka]
                </p>
            </div>
            <p class="mt-4 text-center text-sm text-gray-500">
                Administrative office located in Colombo, Sri Lanka. Please contact us via email before arranging any visit.
            </p>
        </div>
    </section>

    <Footer />
  </div>
</template>

<script setup>
import {
  Facebook, Mail, ArrowRight, ShieldCheck, Briefcase
} from 'lucide-vue-next';

// Set page meta data for SEO
useSeoMeta({
  title: 'Contact Us | Get in Touch with Businfo.click Support',
  ogTitle: 'Contact Us | Get in Touch with Businfo.click Support',
  description: 'The official contact page for Businfo.click. Contact us for general support via Facebook, or reach our data and business teams via email.',
  keywords: 'Contact Businfo.click, Sri Lanka bus support, data team email, business partnerships',
  robots: 'index, follow',
});

</script>