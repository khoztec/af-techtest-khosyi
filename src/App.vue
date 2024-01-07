<script setup lang="ts">
import { ref, computed } from 'vue';
import { RouterView, useRoute } from 'vue-router'
const router = useRoute();
const navLinks = [
  { icon: 'mdi-home-outline', text: 'Home', route: '/' },
  { icon: 'mdi-wallet-outline', text: 'Manage Assets', route: '/asset' },
  { icon: 'mdi-cog-outline', text: 'Settings', route: '/' },
];
const drawer = ref(true);

const isRouteActive = (targetRoute: String) => {
  return computed(() => router.path === targetRoute).value;
};
</script>

<template>
  <v-app>
    <v-navigation-drawer app clipped v-model="drawer">
      <v-img
        class="bg-white ma-5"
        width="200"
        :aspect-ratio="1"
        src="https://s3-alpha-sig.figma.com/img/dd91/6209/7b7b9ce2584f14ff92a44489b4c6bd1f?Expires=1705276800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hRpTj2KeQXyxNiHaz8MNwuOgtePIoED8K-madi3lOu2a~oKs0TR10VjRf9X4y-~Ou2RLequq55bIYZeh4mMHvjFvSSNMhy9Unr1p50IuN2RYRUpp2J65aEyfKw5j2a2E~PftW-3g6qsSvlzAneqVVr9uXMYjHmGzYLcHtd4Q7rmmWzOrwAr1piJg4VUFp8drZlqFbS9PAnm-ePnr-S453to5MQYkw3lqyVN2CWGAOO4wv~w2YXXFkJBcbnHPv2ro54uzMceXxzqjIXNrlHyS0uq7WQo22ymG7W0PWpZ3HjQOo7eYVawrX6H5GqZdFmfQzRkpwJGi2ReVZawrPqHxrQ__"
      ></v-img>
      <v-list>
        <router-link
          v-for="(item, index) in navLinks"
          :key="index"
          :to="item.route"
          custom
        >
          <v-list-item :class="{ 'sidebar-active': isRouteActive(item.route) }" :prepend-icon="item.icon" link>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item>
        </router-link>
      </v-list>
      <!-- <v-list>
        <v-list-item prepend-icon="mdi-home-outline" title="Home" @click="router.push('/');"></v-list-item>
        <v-list-item prepend-icon="mdi-wallet-outline" title="Manage Assets" @click="router.push('/asset');"></v-list-item>
        <v-list-item prepend-icon="mdi-cog-outline" title="Settings"></v-list-item>
      </v-list> -->
    </v-navigation-drawer>

    <v-app-bar app clipped-left class="px-5" :elevation="0" color="#FCFCFC">
      <v-toolbar-title>Manage Asset</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-icon class="mx-2">mdi-bell-outline</v-icon>
      <v-btn class="mx-2" icon="" size="small" @click="drawer = !drawer">
        <v-avatar color="#FFBC99" image="https://s3-alpha-sig.figma.com/img/67dd/d3c0/5b4bfa35965c217f12aed603af6f2e45?Expires=1705276800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=bgfgVd3ltMqGJTSzK-ioMBSUKeviI0lXa28Xnmu9ESvx8aoRd-JlcjkP5-oRtHmKl8uYsSqBAOV~T7W~4mDq63UcsFfBqIlIEc2qMU~d09UkYcA0ZRTro9~7RWeyT9pIxX8d9~NYY9hB6-scmgEyTUbXl-YbUTAq6~dchpGjszpQl8aYDjxMBBrf4FJPB0ifxw7Sh01WKHd1Gc2hNSMvgcBoEBlOT4fQaBhPMn9TZ0KitOx1yDFu8PIGBwaKGNwdoAoBFVHjxQkcmvCMScsh-PZwjnSq~xven0TRLizXwOWHbQcB~a0W0E5ZOKBDXvZ2Ehs4HedDS5CPvCPlI7Kocw__"></v-avatar>
      </v-btn>
    </v-app-bar>

    <v-main style="background-color: #F2F4F7;">
      <RouterView />
    </v-main>
  </v-app>
</template>

<style scoped>
.sidebar-active {
  background-color: #e0e0e0; /* or your desired active background color */
}
</style>