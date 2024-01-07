<template>
  <section class="pa-6">
    <v-card class="rounded-lg pa-10">
      <v-row>
        <v-col cols="12">
          <div class="text-h5">List Asset</div>
        </v-col>
        <v-col cols="12" md="2" class="d-flex align-center">
          <v-btn
            class="text-none text-subtitle-1 rounded-xl px-5"
            color="#2065DA"
            size="large"
            block
            @click="goToAdd"
          >
            <div class="text-subtitle-2 font-weight-bold">+ Add Asset</div>
          </v-btn>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="searchField"
            variant="solo"
            label="Search Asset..."
            hide-details
            @keyup.enter="goToSearch"
          ></v-text-field>
        </v-col>
        <v-col v-if="searchField" cols="12" md="2" class="d-flex align-center">
          <v-btn icon="mdi-reload" @click="resetFields">
          </v-btn>
        </v-col>
      </v-row>
      <v-table class="mt-5">
        <thead class="bg-grey-lighten-5">
          <tr>
            <th class="text-left font-weight-bold">Asset ID/Tag</th>
            <th class="text-left font-weight-bold">Asset Name</th>
            <th class="text-left font-weight-bold">Description</th>
            <th class="text-left font-weight-bold">Purchase Cost</th>
            <th class="text-left font-weight-bold">Purchase Date</th>
            <th class="text-left font-weight-bold">Status</th>
            <!-- <th class="text-left">Model Number</th>
            <th class="text-left">Serial Number</th>
            <th class="text-left">Vendor Name</th> -->
          </tr>
        </thead>
        <tbody v-if="assetsFiltered.length > 0">
          <tr v-for="(item, i) in assetsFiltered" :key="i">
            <td>{{ item.AssetID }}</td>
            <td>{{ item.AssetName }}</td>
            <td>{{ item.Description }}</td>
            <td class="font-weight-bold">Rp {{ item.PurchaseCost.toLocaleString() }}</td>
            <td>{{ setDates(item.PurchaseDate) }}</td>
            <td>
              <v-badge
                :color="setBadges(item.Status)"
                :content="item.Status"
                inline
              ></v-badge>
            </td>
            <!-- <td>{{ item.ModelNumber }}</td>
            <td>{{ item.SerialNumber }}</td>
            <td>{{ item.VendorName }}</td> -->
          </tr>
        </tbody>
      </v-table>
    </v-card>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import jsonData from '@/data/list.json';
import { useDate } from 'vuetify'
// Define data using ref
const assetsAll = ref([]);
const assetsFiltered = ref([]);
const searchField = ref('');
const nameRules = [
  (v: string) => !!v || 'Name is required',
  (v: string) => (v && v.length <= 10) || 'Name must be less than 10 characters'
];

// Define a computed property

// Define mounted
onMounted(() => {
  assetsAll.value = jsonData;
  assetsFiltered.value = jsonData;
});

// Define a method
const router = useRouter();
const setBadges = (status: string) => {
  switch (status) {
    case 'Active':
      return 'success';
    case 'In Repair':
      return 'warning';
    case 'Inactive':
      return 'error';
    default:
      return 'grey';
  }
};
const setDates = (dates: string) => {
  const date = useDate()
  const formatted = date.format(dates, 'fullDate')
  return formatted
};

const goToSearch = () => {
  // Perform your desired function here
  const searchTermLowerCase = searchField.value.toLowerCase();
  assetsFiltered.value = assetsAll.value.filter(
    (asset) =>
      asset.AssetName.toLowerCase().includes(searchTermLowerCase)
  );
};

const goToAdd = () => {
  // Use this.$router.push to navigate to the 'assets/add' route
  router.push('/asset/add');
};

const resetFields = () => {
  // Use this.$router.push to navigate to the 'assets/add' route
  searchField.value = '';
  goToSearch();
};

</script>
