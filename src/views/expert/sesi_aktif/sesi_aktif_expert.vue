<template>
    <div id="ada_sesi_aktif" class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div>
            <h2 class="text-base font-semibold leading-6 text-gray-900">Sesi Aktif</h2>
            <p class="mt-1 text-sm text-gray-500">Anda memiliki sesi aktif, silahkan segera terhubung dengan pengguna
            </p>
            <ul role="list" class="divide-y divide-gray-100">
                <li v-for="person in people" :key="person.email" class="flex justify-between gap-x-6 py-5">
                    <div class="flex min-w-0 gap-x-4">
                        <img class="h-12 w-12 flex-none rounded-full bg-gray-50" :src="person.imageUrl" alt="" />
                        <div class="min-w-0 flex-auto">
                            <p class="text-sm font-semibold leading-6 text-gray-900">
                                <a :href="person.href" class="hover:underline">{{ person.name }}</a>
                            </p>
                            <p class="mt-1 flex text-xs leading-5 text-gray-500">
                                <a :href="`mailto:${person.email}`" class="truncate hover:underline">{{ person.email
                                    }}</a>
                            </p>
                        </div>
                    </div>
                    <div class="flex shrink-0 items-center gap-x-6">
                        <div class="hidden sm:flex sm:flex-col sm:items-end">
                            <p class="text-sm leading-6 text-gray-900">{{ person.role }}</p>
                            <p v-if="person.lastSeen" class="mt-1 text-xs leading-5 text-gray-500">
                                Last seen <time :datetime="person.lastSeenDateTime">{{ person.lastSeen }}</time>
                            </p>
                            <div v-else class="mt-1 flex items-center gap-x-1.5">
                                <div class="flex-none rounded-full bg-emerald-500/20 p-1">
                                    <div class="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                </div>
                                <p class="text-xs leading-5 text-gray-500">Online</p>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>


            <ul role="list" class="mt-6 grid grid-cols-1 gap-6 border-b border-t border-gray-200 py-6 sm:grid-cols-2">
                <li class="flow-root">
                    <div
                        class="relative -m-2 flex items-center space-x-4 rounded-xl p-2 focus-within:ring-2 focus-within:ring-indigo-500 hover:bg-gray-50">
                        <div class="bg-pink-500 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg">
                            <ion-icon name="list-outline" class="h-6 w-6 text-white"></ion-icon>
                        </div>
                        <div>
                            <h3 class="text-sm font-medium text-gray-900">
                                <a href="#" class="focus:outline-none">
                                    <span class="absolute inset-0" aria-hidden="true" />
                                    <span>Create a List</span>
                                    <span aria-hidden="true"> &rarr;</span>
                                </a>
                            </h3>
                            <p class="mt-1 text-sm text-gray-500">Another to-do system you'll try but eventually give up
                                on.</p>
                        </div>
                    </div>
                </li>
                <li class="flow-root">
                    <div
                        class="relative -m-2 flex items-center space-x-4 rounded-xl p-2 focus-within:ring-2 focus-within:ring-indigo-500 hover:bg-gray-50">
                        <div class="bg-yellow-500 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg">
                            <ion-icon name="calendar-outline" class="h-6 w-6 text-white"></ion-icon>
                        </div>
                        <div>
                            <h3 class="text-sm font-medium text-gray-900">
                                <a href="#" class="focus:outline-none">
                                    <span class="absolute inset-0" aria-hidden="true" />
                                    <span>Create a Calendar</span>
                                    <span aria-hidden="true"> &rarr;</span>
                                </a>
                            </h3>
                            <p class="mt-1 text-sm text-gray-500">Stay on top of your deadlines, or don’t — it’s up to
                                you.</p>
                        </div>
                    </div>
                </li>
                <li class="flow-root">
                    <div
                        class="relative -m-2 flex items-center space-x-4 rounded-xl p-2 focus-within:ring-2 focus-within:ring-indigo-500 hover:bg-gray-50">
                        <div class="bg-green-500 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg">
                            <ion-icon name="images-outline" class="h-6 w-6 text-white"></ion-icon>
                        </div>
                        <div>
                            <h3 class="text-sm font-medium text-gray-900">
                                <a href="#" class="focus:outline-none">
                                    <span class="absolute inset-0" aria-hidden="true" />
                                    <span>Create a Gallery</span>
                                    <span aria-hidden="true"> &rarr;</span>
                                </a>
                            </h3>
                            <p class="mt-1 text-sm text-gray-500">Great for mood boards and inspiration.</p>
                        </div>
                    </div>
                </li>
                <li class="flow-root">
                    <div
                        class="relative -m-2 flex items-center space-x-4 rounded-xl p-2 focus-within:ring-2 focus-within:ring-indigo-500 hover:bg-gray-50">
                        <div class="bg-blue-500 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg">
                            <ion-icon name="grid-outline" class="h-6 w-6 text-white"></ion-icon>
                        </div>
                        <div>
                            <h3 class="text-sm font-medium text-gray-900">
                                <a href="#" class="focus:outline-none">
                                    <span class="absolute inset-0" aria-hidden="true" />
                                    <span>Create a Board</span>
                                    <span aria-hidden="true"> &rarr;</span>
                                </a>
                            </h3>
                            <p class="mt-1 text-sm text-gray-500">Track tasks in different stages of your project.</p>
                        </div>
                    </div>
                </li>
                <li class="flow-root">
                    <div
                        class="relative -m-2 flex items-center space-x-4 rounded-xl p-2 focus-within:ring-2 focus-within:ring-indigo-500 hover:bg-gray-50">
                        <div class="bg-indigo-500 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg">
                            <ion-icon name="spreadsheet-outline" class="h-6 w-6 text-white"></ion-icon>
                        </div>
                        <div>
                            <h3 class="text-sm font-medium text-gray-900">
                                <a href="#" class="focus:outline-none">
                                    <span class="absolute inset-0" aria-hidden="true" />
                                    <span>Create a Spreadsheet</span>
                                    <span aria-hidden="true"> &rarr;</span>
                                </a>
                            </h3>
                            <p class="mt-1 text-sm text-gray-500">Lots of numbers and things — good for nerds.</p>
                        </div>
                    </div>
                </li>
                <li class="flow-root">
                    <div
                        class="relative -m-2 flex items-center space-x-4 rounded-xl p-2 focus-within:ring-2 focus-within:ring-indigo-500 hover:bg-gray-50">
                        <div class="bg-purple-500 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg">
                            <ion-icon name="time-outline" class="h-6 w-6 text-white"></ion-icon>
                        </div>
                        <div>
                            <h3 class="text-sm font-medium text-gray-900">
                                <a href="#" class="focus:outline-none">
                                    <span class="absolute inset-0" aria-hidden="true" />
                                    <span>Create a Timeline</span>
                                    <span aria-hidden="true"> &rarr;</span>
                                </a>
                            </h3>
                            <p class="mt-1 text-sm text-gray-500">Get a birds-eye-view of your procrastination.</p>
                        </div>
                    </div>
                </li>
            </ul>
            <div class="mt-4 flex">
                <a href="#" class="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    Or start from an empty project
                    <span aria-hidden="true"> &rarr;</span>
                </a>
            </div>
        </div>

    </div>

</template>

<script> 

export default { 
    data() {
        return {
            people: [
                {
                    name: 'Leslie Alexander',
                    email: 'leslie.alexander@example.com',
                    role: 'Co-Founder / CEO',
                    imageUrl:
                        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                    href: '#',
                    lastSeen: '3h ago',
                    lastSeenDateTime: '2023-01-23T13:23Z',
                },
                {
                    name: 'Michael Foster',
                    email: 'michael.foster@example.com',
                    role: 'Co-Founder / CTO',
                    imageUrl:
                        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                    href: '#',
                    lastSeen: '3h ago',
                    lastSeenDateTime: '2023-01-23T13:23Z',
                },
                {
                    name: 'Dries Vincent',
                    email: 'dries.vincent@example.com',
                    role: 'Business Relations',
                    imageUrl:
                        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                    href: '#',
                    lastSeen: null,
                },
                {
                    name: 'Lindsay Walton',
                    email: 'lindsay.walton@example.com',
                    role: 'Front-end Developer',
                    imageUrl:
                        'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                    href: '#',
                    lastSeen: '3h ago',
                    lastSeenDateTime: '2023-01-23T13:23Z',
                },
                {
                    name: 'Courtney Henry',
                    email: 'courtney.henry@example.com',
                    role: 'Designer',
                    imageUrl:
                        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                    href: '#',
                    lastSeen: '3h ago',
                    lastSeenDateTime: '2023-01-23T13:23Z',
                },
                {
                    name: 'Tom Cook',
                    email: 'tom.cook@example.com',
                    role: 'Director of Product',
                    imageUrl:
                        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                    href: '#',
                    lastSeen: null,
                },
            ]
        }
    }
}
</script>