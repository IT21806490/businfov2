<template>
  <div class="min-h-screen bg-gray-50">
    <Navbar />
    
    <!-- Hero Section -->
    <section class="pt-32 pb-12 px-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
      <div class="max-w-4xl mx-auto text-center">
        <h1 class="text-5xl md:text-6xl font-extrabold mb-4">Get in Touch</h1>
        <p class="text-xl md:text-2xl text-blue-100">
          Have questions? We'd love to hear from you.
        </p>
      </div>
    </section>

    <div class="max-w-6xl mx-auto px-6 py-16">
      <div class="grid lg:grid-cols-2 gap-12">
        <!-- Contact Form -->
        <div class="bg-white rounded-2xl shadow-xl p-8 md:p-10">
          <h2 class="text-3xl font-bold text-gray-900 mb-2">Send us a Message</h2>
          <p class="text-gray-600 mb-8">Fill out the form below and we'll get back to you within 24 hours.</p>
          
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <div>
              <label for="name" class="block text-sm font-semibold text-gray-700 mb-2">
                Your Name *
              </label>
              <input
                id="name"
                v-model="form.name"
                type="text"
                required
                class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label for="email" class="block text-sm font-semibold text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                required
                class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label for="subject" class="block text-sm font-semibold text-gray-700 mb-2">
                Subject *
              </label>
              <select
                id="subject"
                v-model="form.subject"
                required
                class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors appearance-none bg-white cursor-pointer"
              >
                <option value="">Select a topic</option>
                <option value="general">General Inquiry</option>
                <option value="tutorial">Tutorial Request</option>
                <option value="collaboration">Collaboration</option>
                <option value="feedback">Feedback</option>
                <option value="bug">Report an Issue</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label for="message" class="block text-sm font-semibold text-gray-700 mb-2">
                Message *
              </label>
              <textarea
                id="message"
                v-model="form.message"
                required
                rows="6"
                class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors resize-none"
                placeholder="Tell us more about your inquiry..."
              ></textarea>
            </div>

            <button
              type="submit"
              :disabled="isSubmitting"
              class="w-full px-6 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              <span v-if="!isSubmitting">Send Message</span>
              <span v-else class="flex items-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </span>
            </button>

            <p v-if="submitMessage" :class="submitSuccess ? 'text-green-600' : 'text-red-600'" class="text-sm font-medium text-center">
              {{ submitMessage }}
            </p>
          </form>
        </div>

        <!-- Contact Info & Social -->
        <div class="space-y-8">
          <!-- Contact Cards -->
          <div class="bg-white rounded-2xl shadow-xl p-8">
            <h3 class="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
            <div class="space-y-6">
              <div class="flex items-start">
                <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </div>
                <div class="ml-4">
                  <h4 class="font-semibold text-gray-900">Email</h4>
                  <a href="mailto:contact@techsolvelab.com" class="text-blue-600 hover:text-blue-700">
                    contact@techsolvelab.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- Social Media -->
          <div class="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-xl p-8 text-white">
            <h3 class="text-2xl font-bold mb-4">Follow Us</h3>
            <p class="text-blue-100 mb-6">Stay connected for the latest tutorials and tips</p>
            <div class="grid grid-cols-2 gap-4">
              <a href="https://facebook.com/yourpage" target="_blank" rel="noopener" class="flex items-center justify-center p-4 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-all">
                <span class="font-semibold">Facebook</span>
              </a>
              <a href="https://twitter.com/techsolvelab" target="_blank" rel="noopener" class="flex items-center justify-center p-4 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-all">
                <span class="font-semibold">Twitter</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import emailjs from '@emailjs/browser';
import Navbar from '~/components/Navbar.vue';
import Footer from '~/components/Footer.vue';

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
});

const isSubmitting = ref(false);
const submitMessage = ref('');
const submitSuccess = ref(false);

const handleSubmit = async () => {
  isSubmitting.value = true;
  submitMessage.value = '';

  try {
    const serviceID = 'YOUR_SERVICE_ID';   // Replace
    const templateID = 'YOUR_TEMPLATE_ID'; // Replace
    const publicKey = 'YOUR_PUBLIC_KEY';   // Replace

    await emailjs.send(
      serviceID,
      templateID,
      {
        from_name: form.value.name,
        from_email: form.value.email,
        subject: form.value.subject,
        message: form.value.message
      },
      publicKey
    );

    submitMessage.value = 'Thank you! Your message has been sent successfully.';
    submitSuccess.value = true;

    // Reset form
    form.value = { name: '', email: '', subject: '', message: '' };

    setTimeout(() => (submitMessage.value = ''), 5000);
  } catch (error) {
    console.error(error);
    submitMessage.value = 'Oops! Something went wrong. Please try again or email us directly.';
    submitSuccess.value = false;
  } finally {
    isSubmitting.value = false;
  }
};
</script>
