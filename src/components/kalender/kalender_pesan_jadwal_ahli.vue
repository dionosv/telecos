<template>
    <section class="all">

        <div class="mx-auto max-w-9xl items-center p-6 lg:px-8" v-if="data_is_loaded">
            <div class="md:grid md:grid-cols-2 md:divide-x md:divide-gray-200">
                <div class="md:pr-10">
                    <div class="flex items-center">
                        <h2 class="flex-auto text-sm font-semibold text-gray-900">{{ currentMonthYear }}</h2>
                    </div>
                    <div class="mt-10 grid grid-cols-7 text-center text-xs leading-6 text-gray-500" id="hari_big">
                        <div>Senin</div>
                        <div>Selasa</div>
                        <div>Rabu</div>
                        <div>Kamis</div>
                        <div>Jumat</div>
                        <div>Sabtu</div>
                        <div>Minggu</div>
                    </div>

                    <div class="mt-10 grid grid-cols-7 text-center text-xs leading-6 text-gray-500" id="hari_small">
                        <div>Sen</div>
                        <div>Sel</div>
                        <div>Rab</div>
                        <div>Kam</div>
                        <div>Jum</div>
                        <div>Sab</div>
                        <div>Min</div>
                    </div>

                    <div class="mt-2 grid grid-cols-7 text-sm relative" :key="currentMonthKey">
                        <div v-for="(day, dayIdx) in days" :key="day.date"
                            :class="[dayIdx > 6 && 'border-t border-gray-200', 'py-4']">
                            <div class="relative flex flex-col items-center">
                                <button type="button" @click="selectDate(day)"
                                    :class="[day.isSelected && 'text-white', !day.isSelected && day.isToday && 'text-lime-600', !day.isSelected && !day.isToday && day.isCurrentMonth && 'text-gray-900', !day.isSelected && !day.isToday && !day.isCurrentMonth && 'text-gray-400', day.isSelected && day.isToday && 'bg-lime-600', day.isSelected && !day.isToday && 'bg-gray-900', !day.isSelected && 'hover:bg-gray-200', (day.isSelected || day.isToday) && 'font-semibold', 'mx-auto flex h-8 w-8 items-center justify-center rounded-full']">
                                    <time :datetime="day.date">{{ day.date.split('-').pop().replace(/^0/, '') }}</time>
                                </button>
                                <span v-if="hasEvent(day.date)"
                                    class="absolute bottom-0 transform translate-y-2 block w-1 h-1 rounded-full bg-lime-600"></span>
                            </div>
                        </div>
                    </div>
                </div>

                <section class="mt-12 md:mt-0 md:pl-10">
                    <h2 class="text-base font-semibold leading-6 text-gray-900">
                        Jadwal untuk <time :datetime="selectedDateISO">{{ selectedDateFormatted }}</time>
                    </h2>
                    <ol class="mt-4 space-y-1 text-sm leading-6 text-gray-500" id="all_meeting_scroll">
                        <li v-if="selectedDayMeetings.length === 0" class="text-gray-500 py-4">
                            <!-- Tidak ada jadwal untuk hari ini -->
                            <tidak_ada_acara></tidak_ada_acara>
                        </li>
                        <li v-for="meeting in selectedDayMeetings" :key="meeting.id">
                            <div class="group flex items-center space-x-4 rounded-xl px-4 py-2 focus-within:bg-gray-100 hover:bg-red-100 cursor-pointer" v-if="meeting.start < meeting.current">
                                <!-- <img :src="meeting.imageUrl" alt="" /> -->
                                <ion-icon name="close-circle" class="h-10 w-10 flex-none rounded-full fill-red-600"></ion-icon>
                                <div class="flex-auto">
                                    <p class="text-gray-900">{{ meeting.name }}</p>
                                    <p class="mt-0.5">
                                        <time :datetime="meeting.startDatetime">{{ meeting.start }} WIB</time> -
                                        <time :datetime="meeting.endDatetime">{{ meeting.end }} WIB</time>
                                    </p>
                                </div>
                                <Menu as="div"
                                    class="relative opacity-0 focus-within:opacity-100 group-hover:opacity-100">
                                    <div>
                                        <MenuButton
                                            class="-m-2 flex items-center rounded-full p-1.5 text-gray-500 hover:text-gray-600">
                                            <span class="sr-only">Open options</span>
                                            <!-- <EllipsisVerticalIcon class="h-6 w-6" aria-hidden="true" /> -->
                                        </MenuButton>
                                    </div>

                                    <transition enter-active-class="transition ease-out duration-100"
                                        enter-from-class="transform opacity-0 scale-95"
                                        enter-to-class="transform opacity-100 scale-100"
                                        leave-active-class="transition ease-in duration-75"
                                        leave-from-class="transform opacity-100 scale-100"
                                        leave-to-class="transform opacity-0 scale-95">
                                        <MenuItems
                                            class="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <div class="py-1">
                                                <MenuItem v-slot="{ active }">
                                                <a href="#"
                                                    :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Edit</a>
                                                </MenuItem>
                                                <MenuItem v-slot="{ active }">
                                                <a href="#"
                                                    :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Cancel</a>
                                                </MenuItem>
                                            </div>
                                        </MenuItems>
                                    </transition>
                                </Menu>

                            </div>

                            <router-link :to="{ name : 'pesanan_baru', params : { schedule_id : meeting.id , expert_id : this.expertId} }" class="group flex items-center space-x-4 rounded-xl px-4 py-2 focus-within:bg-gray-100 hover:bg-gray-100 cursor-pointer" v-else>
                                <!-- <img :src="meeting.imageUrl" alt="" /> -->
                                <ion-icon name="add-circle" class="h-10 w-10 flex-none rounded-full"></ion-icon>
                                <div class="flex-auto">
                                    <p class="text-gray-900">{{ meeting.name }}</p>
                                    <p class="mt-0.5">
                                        <time :datetime="meeting.startDatetime">{{ meeting.start }} WIB</time> -
                                        <time :datetime="meeting.endDatetime">{{ meeting.end }} WIB</time>
                                    </p>
                                </div>
                                <Menu as="div"
                                    class="relative opacity-0 focus-within:opacity-100 group-hover:opacity-100">
                                    <div>
                                        <MenuButton
                                            class="-m-2 flex items-center rounded-full p-1.5 text-gray-500 hover:text-gray-600">
                                            <span class="sr-only">Open options</span>
                                            <!-- <EllipsisVerticalIcon class="h-6 w-6" aria-hidden="true" /> -->
                                        </MenuButton>
                                    </div>

                                    <transition enter-active-class="transition ease-out duration-100"
                                        enter-from-class="transform opacity-0 scale-95"
                                        enter-to-class="transform opacity-100 scale-100"
                                        leave-active-class="transition ease-in duration-75"
                                        leave-from-class="transform opacity-100 scale-100"
                                        leave-to-class="transform opacity-0 scale-95">
                                        <MenuItems
                                            class="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <div class="py-1">
                                                <MenuItem v-slot="{ active }">
                                                <a href="#"
                                                    :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Edit</a>
                                                </MenuItem>
                                                <MenuItem v-slot="{ active }">
                                                <a href="#"
                                                    :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Cancel</a>
                                                </MenuItem>
                                            </div>
                                        </MenuItems>
                                    </transition>
                                </Menu>

                            </router-link>


                        </li>
                    </ol>
                </section>
            </div>

        </div>

        <Spinner class="spin_full" v-if="!data_is_loaded"></Spinner>

        <div class="note">
            <p>
                Silahkan pilih jadwal untuk konsultasi
            </p>
        </div>

    </section>

</template>

<script>
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import tidak_ada_acara from './tidak_ada_acara.vue';
import { get_schedule_by_expert_id } from '../logic/API/schedule/schedule';
import Spinner from '../spinner/spinner.vue';

export default {
    components: {
        Menu,
        MenuButton,
        MenuItem,
        MenuItems,
        tidak_ada_acara,
        Spinner
    },

    props: {
        expert_id: {
            type: String,
            required: true
        },
        user_id: {
            type: String,
            required: true
        }
    },

    data() {
        const now = new Date();
        const currentMonth = new Date(Date.UTC(now.getFullYear(), now.getMonth(), 1));
        return {
            currentMonth,
            currentDate: new Date(currentMonth),
            selectedDate: new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())),
            allMeetings: [], // Initialize as empty array
            expertId: this.expert_id,
            userId: this.user_id,
            data_is_loaded: false
        }
    },

    created() {
        this.get_jadwal_by_expert_id();
    },

    computed: {
        currentMonthYear() {
            return new Intl.DateTimeFormat('id-ID', {
                month: 'long',
                year: 'numeric'
            }).format(this.currentDate)
        },

        currentMonthKey() {
            return `${this.currentDate.getUTCFullYear()}-${this.currentDate.getUTCMonth()}`;
        },

        days() {
            return this.generateCalendarDays(
                this.currentDate.getFullYear(),
                this.currentDate.getMonth()
            )
        },

        selectedDateFormatted() {
            return new Intl.DateTimeFormat('id-ID', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            }).format(this.selectedDate)
        },

        selectedDateISO() {
            return this.selectedDate.toISOString().split('T')[0]
        },

        selectedDayMeetings() {
            const selectedDateString = this.selectedDate.toISOString().split('T')[0];
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            const selectedDate = new Date(this.selectedDate);
            selectedDate.setHours(0, 0, 0, 0);

            // Only show meetings if selected date is today or in the future
            if (selectedDate >= today) {
                return this.allMeetings.filter(meeting => 
                    meeting.date === selectedDateString 
                    // meeting.avail === "true"
                );
            }
            return []; // Return empty array for past dates
        }
    },

    methods: {
        generateCalendarDays(year, month) {
            const days = [];
            const firstDayOfMonth = new Date(Date.UTC(year, month, 1));
            const lastDayOfMonth = new Date(Date.UTC(year, month + 1, 0));
            const daysInMonth = lastDayOfMonth.getUTCDate();
            const startPadding = (firstDayOfMonth.getUTCDay() + 6) % 7; // Adjusting for Monday start

            // Add previous month padding
            const prevMonthLastDay = new Date(Date.UTC(year, month, 0));
            for (let i = startPadding - 1; i >= 0; i--) {
                const date = new Date(Date.UTC(year, month - 1, prevMonthLastDay.getUTCDate() - i));
                days.push({
                    date: this.formatDate(date),
                    isCurrentMonth: false,
                    isToday: this.isToday(date),
                    isSelected: this.isSameDate(date, this.selectedDate)
                });
            }

            // Add current month days
            for (let i = 1; i <= daysInMonth; i++) {
                const date = new Date(Date.UTC(year, month, i));
                days.push({
                    date: this.formatDate(date),
                    isCurrentMonth: true,
                    isToday: this.isToday(date),
                    isSelected: this.isSameDate(date, this.selectedDate)
                });
            }

            // Add next month padding
            const remainingDays = 42 - days.length; // Always show 6 weeks
            for (let i = 1; i <= remainingDays; i++) {
                const date = new Date(Date.UTC(year, month + 1, i));
                days.push({
                    date: this.formatDate(date),
                    isCurrentMonth: false,
                    isToday: this.isToday(date),
                    isSelected: this.isSameDate(date, this.selectedDate)
                });
            }

            return days;
        },

        async get_jadwal_by_expert_id() {
            try {
                const response = await get_schedule_by_expert_id(this.expertId);
                if (response.status === 1) {
                    const now = new Date();
                    
                    // Filter out past schedules including time check
                    const futureSchedules = response.schedules.filter(schedule => {
                        const scheduleStart = new Date(schedule.dateStart);
                        return scheduleStart  ; // This now compares both date and time
                    });

                    // Group remaining schedules by date
                    const schedulesByDate = futureSchedules.reduce((acc, schedule) => {
                        const date = new Date(schedule.dateStart).toISOString().split('T')[0];
                        if (!acc[date]) {
                            acc[date] = [];
                        }
                        acc[date].push(schedule);
                        return acc;
                    }, {});

                    // Rest of the processing remains the same
                    this.allMeetings = Object.entries(schedulesByDate).flatMap(([date, schedules]) => {
                        schedules.sort((a, b) => new Date(a.dateStart) - new Date(b.dateStart));

                        return schedules.map((schedule, index) => ({
                            id: schedule.scheduleId,
                            name: `Sesi ${index + 1}`,
                            date: date,
                            start: new Date(schedule.dateStart).toLocaleTimeString('id-ID', {
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: false
                            }),
                            startDatetime: schedule.dateStart,
                            end: new Date(schedule.dateEnd).toLocaleTimeString('id-ID', {
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: false
                            }),
                            current:new Date().toLocaleTimeString('id-ID', {
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: false
                            }),
                            endDatetime: schedule.dateEnd,
                            rate: schedule.rate,
                            status: schedule.status,
                            // avail:schedule.availability
                        }));
                    });
                    this.data_is_loaded = true;
                } 
                else if( response.status === 0){
                    this.allMeetings = [];
                    this.data_is_loaded = true;
                }
                else {
                    console.error('Invalid API response structure:', response);
                    this.allMeetings = [];
                }
            } catch (error) {
                console.error('Error fetching schedule:', error);
                this.allMeetings = [];
            }
        },

        formatDate(date) {
            return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}-${String(date.getUTCDate()).padStart(2, '0')}`;
        },

        isToday(date) {
            const today = new Date();
            return date.getUTCFullYear() === today.getFullYear() &&
                date.getUTCMonth() === today.getMonth() &&
                date.getUTCDate() === today.getDate();
        },

        isSameDate(date1, date2) {
            return date1.getUTCFullYear() === date2.getUTCFullYear() &&
                date1.getUTCMonth() === date2.getUTCMonth() &&
                date1.getUTCDate() === date2.getUTCDate();
        },

        selectDate(day) {
            const [year, month, date] = day.date.split('-').map(Number);
            const selectedDate = new Date(Date.UTC(year, month - 1, date));
            this.selectedDate = selectedDate;
        },

        getLocalDate(dateString) {
            const date = new Date(dateString);
            return new Date(date.getTime() + date.getTimezoneOffset() * 60000);
        },

        hasEvent(date) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const checkDate = new Date(date);
            
            // Only show dots for today and future dates
            if (checkDate >= today) {
                return this.allMeetings.some(meeting => 
                    meeting.date === date && 
                    meeting.avail === "true"
                );
            }
            return false;
        }
    }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

.note {
    display: flex;
    justify-content: center;
    align-items: center;
}

.note p {
    font-size: 12px;
    color: #b2b2b2;
}

#all_meeting_scroll {
    max-height: 27rem;
    overflow-y: auto;
}


section.all {
    user-select: none;
}

#hari_small {
    display: none;
}

#hari_big {
    display: grid;
}

.spin_full {
    width: 733px;
    height: 0px;
    display: flex;

    align-items: center;
    justify-content: center;

}

@media (max-width: 1200px) {
    #hari_big {
        display: none;
    }

    #hari_small {
        display: grid;
    }

}

@media (max-width: 768px) {
    .note p {
        font-size: 14px;
        color: #b2b2b2;
    }

    .note {
        padding-top: 10px;
        padding-bottom: 15px;
    }

}
</style>