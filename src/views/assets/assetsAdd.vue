<template>
  <section class="pa-6">
    <v-card class="rounded-lg pa-10">
      <v-row v-model="isValid">
        <v-col cols="12" class="d-flex align-center">
          <v-icon start icon="mdi-arrow-left" @click="backToAdd"></v-icon>
          <div class="text-h5">Add Asset</div>
        </v-col>
        <v-col cols="12" sm="6">
          <div class="d-flex flex-column">
            <div class="font-weight-bold mb-2">Asset Information</div>
            <v-text-field
              required
              v-model="state.AssetID"
              class="mb-2"
              label="Asset ID/Tag"
              variant="outlined"
              :rules="[rules.required]"
            ></v-text-field>
            <v-text-field
              required
              v-model="state.AssetName"
              class="mb-2"
              label="Asset Name"
              variant="outlined"
              :rules="[rules.required]"
            ></v-text-field>
            <v-select
              required
              v-model="state.Category"
              class="mb-2"
              label="Category"
              :items="categories"
              variant="outlined"
              :rules="[rules.required]"
            ></v-select>
            <v-select
              required
              v-model="state.Status"
              class="mb-2"
              label="Status"
              :items="['Active', 'Inactive', 'In Repair']"
              variant="outlined"
              :rules="[rules.required]"
            ></v-select>
            <v-text-field
              required
              v-model="state.ModelNumber"
              class="mb-2"
              label="Model Number"
              variant="outlined"
              :rules="[rules.required]"
            ></v-text-field>
            <v-text-field
              required
              v-model="state.SerialNumber"
              class="mb-2"
              label="Serial Number"
              variant="outlined"
              :rules="[rules.required]"
            ></v-text-field>
            <v-text-field
              :counter="200"
              required
              v-model="state.Description"
              class="mb-2"
              label="Description"
              variant="outlined"
              :rules="[rules.required]"
            ></v-text-field>
          </div>
        </v-col>
        <v-col cols="12" sm="6">
          <div class="d-flex flex-column">
            <div class="font-weight-bold mb-2">Other Information</div>
            <v-text-field
              required
              v-model.number="state.PurchaseCost"
              class="mb-2"
              label="Purchase Cost"
              variant="outlined"
              type="number"
              prefix="Rp "
              :rules="[rules.required, rules.numeric]"
            ></v-text-field>
            <v-menu v-model="isMenuOpen" :close-on-content-click="false" class="mb-2">
              <template v-slot:activator="{ props }">
                <v-text-field
                  label="Select Date"
                  :model-value="formattedDate"
                  readonly
                  v-bind="props"
                  variant="outlined"
                  hide-details
                  :rules="[rules.required]"
                  class="mb-8"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="state.PurchaseDate"
                hide-actions
                @input="handleDateInput"
                @blur="handleDateInput"
                :rules="[rules.required]"
              >
              </v-date-picker>
            </v-menu>
            <v-text-field
              required
              v-model="state.VendorName"
              class="mb-2"
              label="Vendor Name"
              variant="outlined"
              :rules="[rules.required]"
            ></v-text-field>
          </div>
        </v-col>
        <v-col cols="12" sm="3" class="d-flex align-center">
          <v-btn
            class="text-none text-subtitle-1 rounded-md px-5"
            color="#2065DA"
            size="x-large"
            @click="submitForm"
            block
          >
            <div class="text-subtitle-1 font-weight-medium">Add Asset</div>
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch, defineEmits } from 'vue';
import { useRouter } from 'vue-router';

const categories = ['Furniture', 'Vehicle', 'Tire'];

const emit = defineEmits('update:modelValue');

const isMenuOpen = ref(false);

const state = reactive({
  AssetID: '',
  AssetName: '',
  Category: 'Furniture',
  Status: 'Active',
  ModelNumber: '',
  SerialNumber: '',
  Description: '',
  PurchaseCost: null,
  PurchaseDate: null,
  VendorName: '',
});

const rules = {
  required: (value) => !!value || 'Field is required',
  numeric: (value) => !isNaN(parseFloat(value)) && isFinite(value) || 'Must be a number',
};

const router = useRouter();

const formattedDate = ref('');
const formatDate = (date: Date | null): string => {
  if (!date) {
    return '';
  }

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
};

// Watch for changes in state.PurchaseDate and update formattedDate accordingly
watch(() => state.PurchaseDate, (newDate) => {
  formattedDate.value = formatDate(newDate);
});

const backToAdd = () => {
  router.back();
};

const handleDateInput = () => {
  isMenuOpen.value = false;
};

const submitForm = () => {
  if (validateForm()) {
    const payload = {
      AssetID: state.AssetID,
      AssetName: state.AssetName,
      Category: state.Category,
      Status: state.Status,
      ModelNumber: state.ModelNumber,
      SerialNumber: state.SerialNumber,
      Description: state.Description,
      PurchaseCost: state.PurchaseCost,
      PurchaseDate: formattedDate.value,
      VendorName: state.VendorName,
    }
    console.log('Form submitted:', payload);
  }
};

const validateForm = () => {
  const fields = [
    'AssetID',
    'AssetName',
    'Category',
    'Status',
    'ModelNumber',
    'SerialNumber',
    'Description',
    'PurchaseCost',
    'PurchaseDate',
    'VendorName',
  ];

  for (const field of fields) {
    const isValid = validateField(field);
    if (!isValid) {
      return false;
    }
  }

  return true;
};

const validateField = (field) => {
  if (state[field] === null || state[field] === '') {
    return false;
  }
  return true;
};
</script>

<style scoped>
.error-highlight {
  border-color: red; /* Add any style to highlight the invalid input */
}
</style>