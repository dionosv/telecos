<template>
    <section class="all">


        <div class="mx-auto max-w-8xl items-center   p-6 lg:px-8">
            <div class="md:grid md:grid-cols-2 md:divide-x md:divide-gray-200">
                <div class="md:pr-10" @touchstart.passive="handleTouchStart" @touchmove="handleTouchMove"
                    @touchend="handleTouchEnd">
                    <div class="flex items-center">
                        <h2 class="flex-auto text-sm font-semibold text-gray-900">{{ currentMonthYear }}</h2>
                        <button type="button" @click="previousMonth"
                            :class="['hidden md:flex -my-1.5 flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500', isPreviousDisabled && 'cursor-not-allowed']"
                            :disabled="isPreviousDisabled">
                            <span class="sr-only">Previous month</span>
                            <ion-icon name="caret-back"></ion-icon>
                        </button>
                        <button type="button" @click="nextMonth"
                            :class="['hidden md:flex -my-1.5 -mr-1.5 ml-2 flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500', isNextDisabled && 'cursor-not-allowed']"
                            :disabled="isNextDisabled">
                            <span class="sr-only">Next month</span>
                            <ion-icon name="caret-forward"></ion-icon>
                        </button>
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
                                    :class="[day.isSelected && 'text-white', !day.isSelected && day.isToday && 'text-orange-600', !day.isSelected && !day.isToday && day.isCurrentMonth && 'text-gray-900', !day.isSelected && !day.isToday && !day.isCurrentMonth && 'text-gray-400', day.isSelected && day.isToday && 'bg-orange-600', day.isSelected && !day.isToday && 'bg-gray-900', !day.isSelected && 'hover:bg-gray-200', (day.isSelected || day.isToday) && 'font-semibold', 'mx-auto flex h-8 w-8 items-center justify-center rounded-full']">
                                    <time :datetime="day.date">{{ day.date.split('-').pop().replace(/^0/, '') }}</time>
                                </button>
                                <span v-if="hasEvent(day.date)"
                                    class="absolute bottom-0 transform translate-y-2 block w-1 h-1 rounded-full bg-orange-600"></span>
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
                        <li v-for="meeting in selectedDayMeetings" :key="meeting.id"
                            :class="['group flex items-center space-x-4 rounded-xl px-4 py-2 focus-within:bg-gray-100 hover:bg-gray-100 cursor-pointer', 
                                    meeting.occupied ? 'bg-orange-100' : '']"
                            @click="handle_toogle_block(meeting.id)">
                            <!-- <img :src="meeting.imageUrl" alt="" /> -->
                            <ion-icon name="add-circle" class="h-10 w-10 flex-none rounded-full"></ion-icon>
                            <div class="flex-auto">
                                <p class="text-gray-900">{{ meeting.name }}</p>
                                <p class="mt-0.5">
                                    <time :datetime="meeting.startDatetime">{{ meeting.start }}</time> -
                                    <time :datetime="meeting.endDatetime">{{ meeting.end }}</time>
                                </p>

                                <!-- <p>{{ meeting.occupied }}</p> -->
                            </div>
                        </li>
                    </ol>
                </section>
            </div>

        </div>

        <div class="note">
            <p>
                Silahkan pilih jadwal dimana anda siap untuk melayani konsultasi
            </p>
            <p>Anda hanya dapat memilih jadwal untuk bulan ini saja</p>
        </div>

    </section>
</template>

<script>
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import tidak_ada_acara from './tidak_ada_acara.vue';

export default {
    components: {
        Menu,
        MenuButton,
        MenuItem,
        MenuItems,
        tidak_ada_acara
    },

    data() {
        const now = new Date();
        const currentMonth = new Date(Date.UTC(now.getFullYear(), now.getMonth(), 1));
        return {
            currentMonth,
            currentDate: new Date(currentMonth),
            selectedDate: new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())),
            allMeetings: this.generateAllMeetings(),
            touchStartX: 0,
            touchEndX: 0,
            minDate: new Date(Date.UTC(now.getFullYear(), now.getMonth(), 1)),
            maxDate: new Date(Date.UTC(now.getFullYear(), now.getMonth() + 3, 0)) // Include the entire month
        }
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
            const selectedDateString = this.selectedDate.toISOString().split('T')[0]
            return this.allMeetings.filter(meeting => meeting.date === selectedDateString)
        },

        isPreviousDisabled() {
            return this.currentDate <= this.minDate
        },

        isNextDisabled() {
            return this.currentDate >= this.maxDate
        }
    },

    methods: {
        generateAllMeetings() {
            const meetings = [];

            const today = new Date();
            const startDay = today.getDate();
            const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
            let meeting_id = 1;
            for (let day = startDay; day <= daysInMonth; day++) {
            let sessionCount = 1;
                for (let hour = 6; hour < 24; hour++) {
                    for (let min = 0; min < 60; min += 30) {
                        const date = `2025-01-${String(day).padStart(2, '0')}`;
                        const startHour = String(hour).padStart(2, '0');
                        const endHour = String(hour + (min + 30 >= 60 ? 1 : 0)).padStart(2, '0');
                        const endMin = String((min + 30) % 60).padStart(2, '0');

                        meetings.push({
                            id: meeting_id,
                            name: `Sesi ${sessionCount}`,
                            date,
                            start: `${startHour}:${String(min).padStart(2, '0')} WIB`,
                            startDatetime: `${date}T${startHour}:${String(min).padStart(2, '0')}`,
                            end: `${endHour}:${endMin} WIB`,
                            endDatetime: `${date}T${endHour}:${endMin}`,
                            occupied:false
                        });
                        sessionCount++;
                        meeting_id++;
                    }
                }
            }
            return meetings;
        },

        handle_toogle_block(id) {
            const meeting = this.allMeetings.find(m => m.id === id);
            if (!meeting) return;

            if (!meeting.occupied) {
                // Check limit before setting to true
                const date = meeting.date;
                const occupiedSessionsForDay = this.allMeetings.filter(m => 
                    m.date === date && m.occupied
                ).length;

                if (occupiedSessionsForDay >= 18) {
                    alert('Anda sudah mencapai batas maksimal 18 sesi per hari');
                    return;
                }
            }
            
            meeting.occupied = !meeting.occupied;
        },

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

        previousMonth() {
            const minMonth = new Date(Date.UTC(this.minDate.getUTCFullYear(), this.minDate.getUTCMonth(), 1));
            if (this.currentDate > minMonth) {
                this.currentDate = new Date(Date.UTC(this.currentDate.getUTCFullYear(), this.currentDate.getUTCMonth() - 1, 1));
            }
        },

        nextMonth() {
            const maxMonth = new Date(Date.UTC(this.maxDate.getUTCFullYear(), this.maxDate.getUTCMonth(), 1));
            if (this.currentDate < maxMonth) {
                this.currentDate = new Date(Date.UTC(this.currentDate.getUTCFullYear(), this.currentDate.getUTCMonth() + 1, 1));
            }
        },

        getLocalDate(dateString) {
            const date = new Date(dateString);
            return new Date(date.getTime() + date.getTimezoneOffset() * 60000);
        },

        selectDate(day) {
            const [year, month, date] = day.date.split('-').map(Number);
            const selectedDate = new Date(Date.UTC(year, month - 1, date));

            if (selectedDate >= this.minDate && selectedDate <= this.maxDate) {
                this.selectedDate = selectedDate;
                this.currentDate = new Date(Date.UTC(year, month - 1, 1));
            }
        },

        handleTouchStart(event) {
            this.touchStartX = event.changedTouches[0].screenX
        },

        handleTouchMove(event) {
            this.touchEndX = event.changedTouches[0].screenX
        },

        handleTouchEnd() {
            if (this.touchStartX - this.touchEndX > 50) {
                this.nextMonth()
            } else if (this.touchEndX - this.touchStartX > 50) {
                this.previousMonth()
            }
        },

        hasEvent(date) {
            return this.allMeetings.some(meeting => meeting.date === date)
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
    flex-direction: column;
}

.note p {
    font-size: 12px;
    color: #b2b2b2;
}

#all_meeting_scroll{
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

    .note{
        padding-top: 10px;
        padding-bottom: 15px;
    }

    }
</style>