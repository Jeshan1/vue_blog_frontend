<template>
    <NavComponent />
    <div class="mx -24 my-5">
        <router-view></router-view>
    </div>
    <FooterComponent />
    <GoToTopButton/>
</template>

<script setup>

import NavComponent from '../components/NavComponent.vue'
import FooterComponent from '../components/FooterComponent.vue'
import GoToTopButton from '@/components/GoToTopButton.vue'
</script>