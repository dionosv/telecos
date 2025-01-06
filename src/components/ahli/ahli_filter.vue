<template>
    <div class="">
        <TransitionRoot as="template" :show="open">
            <Dialog class="relative z-40 sm:hidden" @close="open = false">
                <TransitionChild as="template" enter="transition-opacity ease-linear duration-300"
                    enter-from="opacity-0" enter-to="opacity-100" leave="transition-opacity ease-linear duration-300"
                    leave-from="opacity-100" leave-to="opacity-0">
                    <div class="fixed inset-0 bg-black bg-opacity-25"></div>
                </TransitionChild>

                <div class="fixed inset-0 z-40 flex" @click="open = false">
                    <TransitionChild as="template" enter="transition ease-in-out duration-300 transform"
                        enter-from="translate-x-full" enter-to="translate-x-0"
                        leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0"
                        leave-to="translate-x-full">
                        <DialogPanel
                            class="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl">
                            <div class="flex items-center justify-between px-4">
                                <h2 class="text-lg font-medium text-gray-900">Cari</h2>
                                <button type="button"
                                    class="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    @click="open = false">
                                    <span class="sr-only">Close menu</span>
                                    <ion-icon name="close"></ion-icon>
                                    <!-- <ion-icon name="menu-outline"></ion-icon> -->
                                </button>
                            </div>

                            <form class="mt-4">

                                <div class="input_search px-4 py-6">
                                    <div class="mt-2 flex rounded-md= shadow-sm">
                                        <div class="relative flex flex-grow items-stretch focus-within:z-10">
                                            <div
                                                class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                <!-- <ion-icon name="people-outline"></ion-icon> -->
                                                <ion-icon name="search"></ion-icon>

                                            </div>
                                            <input type="text" v-model="searchQuery" @input="handleSearch" name="nama"
                                                id="nama"
                                                class="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-500 sm:text-sm sm:leading-6"
                                                placeholder="Cari Ahli" />
                                        </div>
                                        <!-- <button type="button"
                                            class="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                            Cari
                                        </button> -->
                                    </div>
                                </div>

                                <Disclosure as="div" v-for="section in filters" :key="section.name"
                                    class="border-t border-gray-200 px-4 py-6" v-slot="{ open }">
                                    <h3 class="-mx-2 -my-3 flow-root">
                                        <DisclosureButton
                                            class="flex w-full items-center justify-between bg-white px-2 py-3 text-sm text-gray-400">
                                            <span class="font-medium text-gray-900">{{ section.name }}</span>
                                            <span class="ml-6 flex items-center">
                                                <ion-icon name="chevron-down-outline"></ion-icon>
                                            </span>
                                        </DisclosureButton>
                                    </h3>
                                    <DisclosurePanel class="pt-6">
                                        <div class="space-y-6">
                                            <div v-for="(option, optionIdx) in section.options" :key="option.value"
                                                class="flex items-center">
                                                <input :id="`filter-mobile-${section.id}-${optionIdx}`"
                                                    :name="section.id" :value="option.value" type="radio"
                                                    :checked="selectedFilters.includes(option.value)"
                                                    @change="handleFilterChange($event, option.value)"
                                                    class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                                <label :for="`filter-mobile-${section.id}-${optionIdx}`"
                                                    class="ml-3 text-sm text-gray-500">{{ option.label }}</label>
                                            </div>
                                        </div>
                                    </DisclosurePanel>
                                </Disclosure>
                            </form>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </Dialog>
        </TransitionRoot>

        <div class="py-10 text-center">
            <div class="py-6">
                <h1 class="text-4xl font-bold tracking-tight text-gray-900">Ahli</h1>
                <p class="mx-auto mt-4 max-w-3xl text-base text-gray-500">Layanan ahli konsultasi yang siap untuk bantu
                    kamu dalam masalah kulit dan kecantikan</p>
            </div>

            <section aria-labelledby="filter-heading" class="py-8">
                <h2 id="filter-heading" class="sr-only">Ahli filters</h2>

                <div class="flex items-center justify-between" id="custom_filter">
                    <Menu as="div" class="relative inline-block text-left hidden sm:block sticky top-0 bg-white z-10">
                        <div class="left_side_input">
                            <div class="mt-2 flex rounded-md shadow-sm">
                                <div class="relative flex flex-grow items-stretch focus-within:z-10">
                                    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <!-- <ion-icon name="people-outline"></ion-icon> -->
                                        <ion-icon name="search"></ion-icon>
                                    </div>
                                    <input type="text" v-model="searchQuery" @input="handleSearch" name="nama" id="nama"
                                        class="block rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-500 sm:text-sm sm:leading-6"
                                        placeholder="Cari Ahli" style="width: 300px;" />
                                </div>
                                <!-- <button type="button"
                                    class="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                    <ion-icon name="search"></ion-icon>
                                    Cari
                                </button> -->
                            </div>
                        </div>
                    </Menu>

                    <button type="button"
                        class="inline-block text-sm font-medium text-gray-700 hover:text-gray-900 sm:hidden flex gap-2 shadow-md border-b border-gray-200 p-4 rounded-lg"
                        @click="open = true">
                        <ion-icon name="search"></ion-icon>
                        <p v-if="searchQuery.length === 0 && selectedFilters.length === 0">
                            Cari berdasarkan nama dan kategori
                        </p>

                        <div class="selain" v-else>
                            <p v-if="searchQuery.length != 0" class="search_query">
                                {{ searchQuery }}
                            </p>

                            <p v-if="selectedFilters.length > 0 && searchQuery.length == 0" >
                                <span class="ml-1 font-medium">
                                    Ahli dengan spesialis
                                </span>
                                <template v-for="(filter, index) in selectedFilters" :key="filter">
                                    <span class="ml-1 font-medium">
                                        {{ filter }}{{ index < selectedFilters.length - 1 ? ',' : '' }} </span>
                                </template>
                            </p>

                            <p v-if="selectedFilters.length > 0 && searchQuery.length != 0" >
                                <span class="ml-1 font-medium">
                                    spesialisasi
                                </span>
                                <template v-for="(filter, index) in selectedFilters" :key="filter">
                                    <span class="ml-1 font-medium">
                                        {{ filter }}{{ index < selectedFilters.length - 1 ? ',' : '' }} </span>
                                </template>
                            </p>
                        </div>

                    </button>

                    <PopoverGroup class="hidden sm:flex sm:items-baseline sm:space-x-8">
                        <Popover as="div" v-for="(section, looper) in filters" :key="section.name"
                            :id="`desktop-menu-${looper}`" class="relative inline-block text-left">
                            <div>
                                <PopoverButton
                                    class="group inline-flex items-center justify-center text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none">
                                    <span>{{ section.name }}</span>
                                    <ion-icon name="chevron-down-outline"
                                        class="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"></ion-icon>
                                </PopoverButton>
                            </div>

                            <transition enter-active-class="transition ease-out duration-100"
                                enter-from-class="transform opacity-0 scale-95"
                                enter-to-class="transform opacity-100 scale-100"
                                leave-active-class="transition ease-in duration-75"
                                leave-from-class="transform opacity-100 scale-100"
                                leave-to-class="transform opacity-0 scale-95">
                                <PopoverPanel
                                    class="absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white p-4 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <form class="space-y-4 select-none">
                                        <div v-for="(option, optionIdx) in section.options" :key="option.value"
                                            class="flex items-center">
                                            <input :id="`filter-${section.id}-${optionIdx}`" :name="section.id"
                                                :value="option.value" type="radio"
                                                :checked="selectedFilters.includes(option.value)"
                                                @change="handleFilterChange($event, option.value)"
                                                class="h-4 w-4 border-gray-300 text-lime-500 focus:ring-lime-300" />
                                            <label :for="`filter-${section.id}-${optionIdx}`"
                                                class="ml-3 whitespace-nowrap pr-6 text-sm font-medium text-gray-900">
                                                {{ option.label }}
                                            </label>
                                        </div>
                                    </form>
                                </PopoverPanel>
                            </transition>
                        </Popover>
                    </PopoverGroup>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
import {
    Dialog,
    DialogPanel,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
    TransitionChild,
    TransitionRoot,
} from '@headlessui/vue'

export default {
    components: {
        Dialog,
        DialogPanel,
        Disclosure,
        DisclosureButton,
        DisclosurePanel,
        Menu,
        MenuButton,
        MenuItem,
        MenuItems,
        Popover,
        PopoverButton,
        PopoverGroup,
        PopoverPanel,
        TransitionChild,
        TransitionRoot,
    },
    props: {
        expertList: {
            type: Array,
            default: () => []
        },
        descriptions: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            open: false,
            searchQuery: '',
            selectedFilters: [],
            filters: []
        }
    },
    watch: {
        descriptions: {
            immediate: true,
            handler(newDescriptions) {
                this.filters = [
                    {
                        id: 'spesialis',
                        name: 'Spesialis',
                        options: [
                            { value: 'all', label: 'Semua Kategori' },
                            ...newDescriptions.map(desc => ({
                                value: desc,
                                label: desc
                            }))
                        ]
                    }
                ];
            }
        },
        selectedFilters: {
            handler(newFilters) {
                this.$emit('filter', newFilters);
            },
            deep: true
        }
    },
    methods: {
        handleSearch() {
            this.searchQuery = this.searchQuery.replace(/[^a-zA-Z\s]/g, '');
            this.$emit('search', this.searchQuery);
        },
        handleFilterChange(event, value) {
            if (event.target.checked) {
                if (value === 'all') {
                    this.selectedFilters = []; // Clear filters when "All" is selected
                } else {
                    this.selectedFilters = [value]; // Set single filter for other options
                }
            }
        }
    }
}
</script>

<style>
#custom_filter {
    display: flex;
    flex-direction: column;
}

.selain{
    display: flex;
}

@media (min-width: 768px) {
    #custom_filter {
        display: flex;
        gap: 27px;
        flex-direction: row;
    }
}
     
</style>
