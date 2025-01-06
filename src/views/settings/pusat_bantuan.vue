<template lang="">
    <div>
        <div class="flex min-h-full flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">

<div class="w-full max-w-sm space-y-10"> 

<nav class="flex flex-1 flex-col" aria-label="Sidebar">
    <ul role="list" class="-mx-2 space-y-1">

        <li>
            <router-link :to="{ name: 'pertanyaan_yang_sering_ditanyakan' }"
                class="text-gray-700 hover:bg-lime-50 hover:text-lime-500 group flex gap-x-3 rounded-md p-2 pl-3 text-sm font-semibold leading-6">Pertanyaan yang sering ditanyakan</router-link>
        </li>

        <li>
            <router-link :to="{ name: 'kebijakan_privasi' }"
                class="text-gray-700 hover:bg-lime-50 hover:text-lime-500 group flex gap-x-3 rounded-md p-2 pl-3 text-sm font-semibold leading-6">Kebijakan privasi</router-link>
        </li>
        <li>
            <router-link :to="{ name: 'telecos_care' }"
                class="text-gray-700 hover:bg-lime-50 hover:text-lime-500 group flex gap-x-3 rounded-md p-2 pl-3 text-sm font-semibold leading-6">Telecos Care</router-link>
        </li>
        
        
    </ul>
</nav>

</div>
</div>

        
    </div>
</template>
<script>
export default {

}
</script>
<style lang="">

</style>