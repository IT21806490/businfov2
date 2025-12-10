
<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col">
    <Navbar />

    <!-- Hero Section -->
    <section class="pt-24 pb-12 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white relative overflow-hidden">
      <div class="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"></div>

      <div class="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 animate-slide-down">
          📞 Find Bus Stand & Authority Contacts
        </h1>
        <p class="text-lg text-blue-100 max-w-2xl mx-auto animate-fade-in">
          Search by stand or district. Contacts are highlighted for easy access.
        </p>
      </div>
    </section>

    <main class="flex-1 px-4 sm:px-6 py-12">
      <div class="max-w-5xl mx-auto">

        <!-- Search Input -->
        <div class="bg-white rounded-3xl shadow-2xl p-8 mb-6 border-2 border-gray-100">
          <h2 class="text-2xl sm:text-3xl font-extrabold text-blue-700 mb-6 text-center">
            🔍 Search Bus Stands
          </h2>
          <input
            type="text"
            v-model="query"
            placeholder="Search by Stand Name or District..."
            class="w-full border-2 border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-md transition-all text-base hover:border-blue-400"
          />
        </div>

        <!-- Province Filter -->
        <div class="flex flex-wrap gap-2 mb-6 justify-center sm:justify-start items-center">
          <span class="font-bold text-gray-700 flex items-center gap-2 text-sm sm:text-base">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L15 14.414V19a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4.586L3.293 6.707A1 1 0 013 6V4z"/>
            </svg>
            Filter by Province:
          </span>

          <button
            class="px-3 py-1 sm:px-4 sm:py-2 rounded-full border border-blue-300 bg-blue-100 hover:bg-blue-200 font-semibold text-sm sm:text-base"
            :class="selectedProvince === '' ? 'bg-blue-700 text-white' : 'text-blue-800'"
            @click="selectedProvince = ''"
          >
            All
          </button>

          <button
            v-for="prov in provinces"
            :key="prov"
            class="px-3 py-1 sm:px-4 sm:py-2 rounded-full border border-blue-300 bg-blue-100 hover:bg-blue-200 font-semibold capitalize text-sm sm:text-base"
            :class="selectedProvince === prov ? 'bg-blue-700 text-white' : 'text-blue-800'"
            @click="selectedProvince = prov"
          >
            {{ prov }}
          </button>
        </div>

        <!-- Results -->
        <div v-if="filteredStands.length === 0" class="bg-white rounded-3xl shadow-lg p-12 text-center border-2 border-gray-200">
          <p class="text-lg font-semibold text-gray-600">No matching bus stands found.</p>
        </div>

        <div v-else class="space-y-6">
          <div
            v-for="stand in displayedStands"
            :key="stand.Stand_name"
            class="bg-white rounded-2xl p-6 shadow-lg border-2 border-blue-100 hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.01]"
          >
            <!-- Stand Header -->
            <div class="mb-4 pb-4 border-b-2 border-gray-200 flex justify-between items-start">
              <div>
                <h3 class="text-2xl font-extrabold text-blue-700">🚌 {{ stand.Stand_name }}</h3>
                <p class="text-sm text-gray-500 font-medium mt-1">
                  {{ stand.Province }} | {{ stand.District }}
                </p>
              </div>
              <div class="bg-blue-100 px-3 py-1 rounded-full text-xs font-bold text-blue-600 shadow-inner">
                {{ stand.Province }}
              </div>
            </div>

            <!-- Stand Contacts -->
            <div v-if="stand.Stand_Contacts.length > 0" class="mt-4 pt-2 border-t">
              <p class="font-bold text-lg text-gray-800 mb-2">Bus Stand Contact Number(s):</p>
              <ul class="space-y-2 ml-4">
                <li
                  v-for="contact in stand.Stand_Contacts"
                  :key="contact"
                  class="inline-block px-4 py-2 bg-blue-50 text-blue-700 font-bold rounded-full shadow hover:bg-blue-100 transition-all cursor-pointer mr-2"
                >
                  📞 {{ formatPhone(contact) }}
                </li>
              </ul>
            </div>

            <!-- Regional Contacts -->
            <div v-if="stand.Regional_Contacts.length > 0" class="mt-4 pt-2 border-t border-dashed border-gray-300">
              <p class="font-bold text-lg text-gray-800 mb-2">Regional Office Contact Number(s):</p>
              <ul class="space-y-2 ml-4">
                <li
                  v-for="contact in stand.Regional_Contacts"
                  :key="contact"
                  class="inline-block px-4 py-2 bg-green-50 text-green-700 font-bold rounded-full shadow hover:bg-green-100 transition-all cursor-pointer mr-2"
                >
                  📞 {{ formatPhone(contact) }}
                </li>
              </ul>
            </div>

            <!-- Province Authority Contacts -->
            <div v-if="groupedProvinceAuthorities(stand).length > 0" class="mt-4 pt-4 border-t-2 border-blue-400">
              <p class="font-bold text-xl text-blue-700 mb-4">🏛️ {{ stand.Province }} Province Authority Contacts</p>
              <div class="space-y-4">
                <div
                  v-for="authorityGroup in groupedProvinceAuthorities(stand)"
                  :key="authorityGroup.name"
                  :class="[
                    'p-4 rounded-xl border shadow-inner',
                    authorityGroup.name === 'Transport Authority' ? 'bg-orange-50 border-orange-200' : 'bg-green-50 border-green-200'
                  ]"
                >
                  <span class="font-extrabold block text-lg mb-2" :class="authorityGroup.name === 'Transport Authority' ? 'text-orange-800' : 'text-green-800'">Office: {{ authorityGroup.name }}</span>
                  <ul class="ml-4 list-disc space-y-1 text-gray-700">
                    <li
                      v-for="contact in authorityGroup.contacts"
                      :key="contact"
                      :class="[
                        'inline-block px-3 py-1 font-bold rounded-full shadow cursor-pointer transition-all mr-2',
                        authorityGroup.name === 'Transport Authority' ? 'bg-orange-100 text-orange-800 hover:bg-orange-200' : 'bg-green-100 text-green-800 hover:bg-green-200'
                      ]"
                    >
                      {{ authorityGroup.name === 'Transport Authority WhatsApp' ? '💬' : '📞' }} {{ formatPhone(contact) }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useHead } from "#imports";
import standNumbers from "~/data/stand_numbers.json";

// SEO Tags
useHead({
  title: "Sri Lanka Bus Stand & Authority Contacts | Find Phone Numbers",
  meta: [
    {
      name: "description",
      content: "Find contact numbers for bus stands, regional offices, and provincial authorities across Sri Lanka. Search by stand name, district, or province for easy access to bus services.",
    },
    {
      name: "keywords",
      content: "Sri Lanka bus stands, bus contacts, SLTB contacts, bus authority phone numbers, regional offices, provincial authorities, bus stand finder",
    },
    { property: "og:title", content: "Sri Lanka Bus Stand & Authority Contacts" },
    {
      property: "og:description",
      content: "Find contact numbers for bus stands, regional offices, and provincial authorities across Sri Lanka. Search by stand name, district, or province for easy access to bus services.",
    },
    { rel: 'canonical', href: 'https://businfo.click/findcontacts' }, // Adjust URL as needed
  ],
});

// Search query
const query = ref("");
const selectedProvince = ref("");

// Format phone numbers: add leading 0 and space-separated for readability
const formatPhone = (num) => {
  if (!num) return "";
  let str = String(num);
  if (!str.startsWith("0")) str = "0" + str;

  // Example formatting: 0 11 2 333 222
  if (str.length === 9) {
    return `${str[0]} ${str.slice(1,3)} ${str[3]} ${str.slice(4,7)} ${str.slice(7)}`;
  } else if (str.length === 10) {
    return `${str[0]} ${str.slice(1,3)} ${str.slice(3,6)} ${str.slice(6)}`;
  }
  return str;
};

// Capitalize helper
function capitalize(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// Group stands
const groupedStands = computed(() => {
  const groups = {};
  standNumbers
    .filter(i => i.Type !== "Authority" && i.Stand_name)
    .forEach(item => {
      const name = item.Stand_name;
      if (!groups[name]) {
        groups[name] = {
          Stand_name: name,
          Province: capitalize(item.Province),
          District: item.District,
          Stand_Contacts: [],
          Regional_Contacts: []
        };
      }
      if (item.Contact_no) {
        if (item.Type && item.Type.toLowerCase() === "regional") {
          groups[name].Regional_Contacts.push(item.Contact_no);
        } else {
          groups[name].Stand_Contacts.push(item.Contact_no);
        }
      }
    });
  return Object.values(groups);
});

// Province list
const provinces = computed(() => {
  const set = new Set();
  groupedStands.value.forEach(s => set.add(s.Province));
  return Array.from(set);
});

// Filtered stands
const filteredStands = computed(() => {
  let stands = groupedStands.value;

  // Province filter
  if (selectedProvince.value) {
    stands = stands.filter(s => s.Province === selectedProvince.value);
  }

  const search = query.value.toLowerCase();
  if (search) {
    stands = stands.filter(stand => 
      stand.Stand_name.toLowerCase().includes(search) || 
      (stand.District && stand.District.toLowerCase().includes(search))
    );
  }

  return stands;
});

// Display only first 2 cards by default
const displayedStands = computed(() => {
  if (query.value.trim() !== "") return filteredStands.value;
  return filteredStands.value.slice(0,2);
});

// Group authority contacts by province
const authorities = standNumbers.filter(i => i.Type === "Authority");
const groupedProvinceAuthorities = (stand) => {
  const province = stand.Province;
  const authorityMap = {};
  authorities
    .filter(auth => capitalize(auth.Province) === province)
    .forEach(auth => {
      const officeName = auth.Stand_name;
      if (!authorityMap[officeName]) authorityMap[officeName] = { name: officeName, contacts: [] };
      if (auth.Contact_no) authorityMap[officeName].contacts.push(auth.Contact_no);
    });
  return Object.values(authorityMap);
};
</script>
