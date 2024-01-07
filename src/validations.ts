import { ref, computed } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';

export function useLoginFormValidation() {
  const validations = {
    AssetID: { required },
    AssetName: { required },
    Category: { required },
    Status: { required },
    ModelNumber: { required },
    SerialNumber: { required },
    Description: { required },
    PurchaseCost: { required },
    PurchaseDate: { required },
    VendorName: { required }
  };

  const formData = ref({
    AssetID: '',
    AssetName: '',
    Category: '',
    Status: '',
    ModelNumber: '',
    SerialNumber: '',
    Description: '',
    PurchaseCost: null,
    PurchaseDate: '',
    VendorName: ''
  });

  const v$ = useVuelidate(validations, formData)

  const isValid = computed(() => v.value.$pending || v.value.$pending === false);

  return { formData, v, isValid };
}