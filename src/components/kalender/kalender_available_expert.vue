<template>

    <div aria-live="assertive" class="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6">
        <div class="flex w-full flex-col items-center space-y-4 sm:items-end">
            <transition enter-active-class="transform ease-out duration-300 transition"
                enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
                enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
                leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100"
                leave-to-class="opacity-0">
                <div v-if="mencapai_maksimum_sesi"
                    class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                    <div class="p-4">
                        <div class="flex items-start align-items-center">
                            <div class="flex-shrink-0">
                                <ion-icon name="alert-circle" class="mt-1" id="alert"></ion-icon>
                            </div>
                            <div class="ml-3 w-0 flex-1 pt-0.5">
                                <p class="text-sm font-medium text-gray-900">Gagal Menyimpan Sesi</p>
                                <p class="mt-1 text-sm text-gray-500">Maksimal 10 sesi dalam satu hari</p>
                            </div>
                            <div class="ml-4 flex flex-shrink-0">
                                <button type="button" @click="mencapai_maksimum_sesi = false"
                                    class="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                    <span class="sr-only">Close</span>
                                    <ion-icon name="close"></ion-icon>
                                    <!-- <XMarkIcon class="h-5 w-5" aria-hidden="true" /> -->
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
    </div>


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

                    <div class="split_1">


                        <h2 class="text-base font-semibold leading-6 text-gray-900">
                            Jadwal untuk <time :datetime="selectedDateISO">{{ selectedDateFormatted }}</time>
                        </h2>

                        <div class="split_3">
                            <div class="input_price">
                                <label for="price" class="  text-sm font-medium  text-gray-900">Tarif
                                    Konsultasi</label>
                                <div class="relative rounded-md shadow-sm">
                                    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <span class="text-gray-500 sm:text-sm">Rp</span>
                                    </div>
                                    <input type="text" name="price" id="price" v-model="tarif_konsultasi"
                                        @keypress="validateNumberInput"
                                        class="block w-full rounded-md border-0 pl-10  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm"
                                        placeholder="25000" aria-describedby="price-currency" />
                                </div>
                            </div>

                            <button type="button" @click="handle_simpan_sesi" 
                                :disabled="!toggleActivities.activate.length && !toggleActivities.deactivate.length"
                                :class="['inline-flex items-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold shadow-sm',
                                (!toggleActivities.activate.length && !toggleActivities.deactivate.length) 
                                    ? 'bg-gray-300 cursor-not-allowed' 
                                    : 'bg-orange-600 hover:bg-orange-500 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600']">
                                <ion-icon name="save"></ion-icon>
                                Simpan Sesi
                            </button>

                        </div>
                        <div class="note_1">
                            <p>
                                Tarif konsultasi dapat di atur (maksimal Rp 500.000). <br>Harap atur
                                tarif konsultasi terlebih dahulu sebelum membuat jadwal sesi konsultasi
                            </p>
                        </div>

                    </div>


                    <ol class="mt-4 space-y-1 text-sm leading-6 text-gray-500" id="all_meeting_scroll">
                        <li v-if="selectedDayMeetings.length === 0" class="text-gray-500 py-4">
                            <tidak_ada_acara></tidak_ada_acara>
                        </li>
                        <li v-for="meeting in selectedDayMeetings" :key="meeting.id" :class="['group flex items-center space-x-4 rounded-xl px-4 py-2 focus-within:bg-gray-100 hover:bg-gray-100 cursor-pointer',
                            meeting.occupied ? 'bg-orange-100 hover:bg-orange-300' : '']"
                            @click="handle_toogle_block(meeting.id, meeting.startDatetime, meeting.endDatetime)">

                            <!-- <ion-icon name="add-circle" ></ion-icon> -->
                            <ion-icon name="checkmark-circle"
                                class="h-10 w-10 flex-none rounded-full fill-orange-500 bg-white-100"
                                v-if="meeting.occupied"></ion-icon>
                            <ion-icon name="add-circle" class="h-10 w-10 flex-none rounded-full"
                                v-if="!meeting.occupied"></ion-icon>

                            <div class="flex-auto">
                                <p class="text-gray-900">{{ meeting.name }}</p>
                                <p class="mt-0.5">
                                    <time :datetime="meeting.startDatetime">{{ meeting.start }}</time> -
                                    <time :datetime="meeting.endDatetime">{{ meeting.end }}</time>
                                </p>
                            </div>

                            <p>{{ meeting.schedule_id }}</p>
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
import { get_schedule_by_expert_id, set_schedule_id } from '../logic/API/schedule/schedule';

export default {
    components: {
        Menu,
        MenuButton,
        MenuItem,
        MenuItems,
        tidak_ada_acara
    },
    props: {
        expertId: {
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
            allMeetings: this.generateAllMeetings(),
            touchStartX: 0,
            touchEndX: 0,
            minDate: new Date(Date.UTC(now.getFullYear(), now.getMonth(), 1)),
            maxDate: new Date(Date.UTC(now.getFullYear(), now.getMonth() + 3, 0)),
            toggleActivities: {
                activate: [],    // Store activated sessions
                deactivate: []   // Store deactivated sessions
            },
            mencapai_maksimum_sesi: false, 
            tarif_konsultasi: '25000', // Set default price to 25000
        }
    },


     
    watch: {
        selectedDateISO: {
            immediate: true,
            handler(newDate) {
                 
            }
        },
        tarif_konsultasi: {
            immediate: true,
            handler(newPrice) {
                if (parseInt(newPrice) > 500000) {
                    this.tarif_konsultasi = '500000';
                }
            }
        },
        expertId: {
            immediate: true,
            handler(newExpertId) {
                // console.log(newExpertId)
                this.handle_on_reload();
            }
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
                // Create date object for current day
                const currentDate = new Date(today.getFullYear(), today.getMonth(), day);
                
                for (let hour = 6; hour < 24; hour++) {
                    for (let min = 0; min < 60; min += 30) {
                        const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                        const startHour = String(hour).padStart(2, '0');
                        const endHour = String(hour + (min + 30 >= 60 ? 1 : 0)).padStart(2, '0');
                        const endMin = String((min + 30) % 60).padStart(2, '0');

                        meetings.push({
                            id: meeting_id,
                            name: `Sesi ${sessionCount}`,
                            date: formattedDate,
                            start: `${startHour}:${String(min).padStart(2, '0')} WIB`,
                            startDatetime: `${formattedDate} ${startHour}:${String(min).padStart(2, '0')}:00`,
                            end: `${endHour}:${endMin} WIB`,
                            endDatetime: `${formattedDate} ${endHour}:${endMin}:00`,
                            occupied: false,
                            schedule_id: null
                        });
                        sessionCount++;
                        meeting_id++;
                    }
                }
            }
            return meetings;
        },

        async handle_on_reload() {
            try {
                const response = await get_schedule_by_expert_id(this.expertId);
                if (response && response.status === 1 && response.schedules) {
                    this.syncSchedulesToMeetings(response.schedules);
                    console.log(response.schedules);
                }
            } catch (error) {
                console.log('No meetings found for expert:', error);
            }
        },

        syncSchedulesToMeetings(schedules) {
            try {
                if (!Array.isArray(schedules)) {
                    console.log('No schedules available');
                    return;
                }

                console.log(`Processing ${schedules.length} schedules`);

                // First find the most common rate from all schedules
                const rates = schedules.map(schedule => schedule.rate);
                const mostCommonRate = rates.reduce((acc, curr) => {
                    acc[curr] = (acc[curr] || 0) + 1;
                    return acc;
                }, {});
                
                const defaultRate = Object.entries(mostCommonRate)
                    .sort((a, b) => b[1] - a[1])[0][0];
                
                this.tarif_konsultasi = String(defaultRate);

                schedules.forEach(schedule => {
                    try {
                        // Convert UTC to local time
                        const startDateUTC = new Date(schedule.dateStart);
                        const endDateUTC = new Date(schedule.dateEnd);
                        
                        // Add 7 hours to convert to WIB (UTC+7)
                        const startDate = new Date(startDateUTC.getTime());
                        const endDate = new Date(endDateUTC.getTime());
                        
                        // Format the date and time to match our meeting format
                        const formattedDate = this.formatDate(startDate);
                        const startTime = `${String(startDate.getHours()).padStart(2, '0')}:${String(startDate.getMinutes()).padStart(2, '0')} WIB`;
                        const endTime = `${String(endDate.getHours()).padStart(2, '0')}:${String(endDate.getMinutes()).padStart(2, '0')} WIB`;
                        
                        console.log(`Looking for meeting on: ${formattedDate} at ${startTime} to ${endTime}`);

                        // Find and update the corresponding meeting
                        const meeting = this.allMeetings.find(m => { 
                            const matchStart = m.start === startTime;
                            const matchEnd = m.end === endTime;
                            
                            if (matchStart && matchEnd) {
                                console.log(`Found matching meeting: ${m.date} ${m.start}-${m.end}`);
                                return true;
                            }
                            return false;
                        });

                        if (meeting) {
                            meeting.occupied = true;
                            meeting.schedule_id = schedule.scheduleId;
                            console.log(`Updated meeting with schedule ID: ${schedule.scheduleId}`);
                        } else {
                            console.log(`No matching meeting found for: ${formattedDate} ${startTime}-${endTime}`);
                        }
                    } catch (error) {
                        console.log('Error processing schedule:', error);
                    }
                });
            } catch (error) {
                console.log('Error syncing schedules:', error);
            }
        },

        async handle_simpan_sesi() {
            try {
                if(this.toggleActivities.activate.length != 0) {
                    console.log('Activated Sessions:', this.toggleActivities.activate);
                    for (let i = 0; i < this.toggleActivities.activate.length; i++) {
                        try {
                            await this.handle_upload_to_api(
                                this.expertId, 
                                this.toggleActivities.activate[i].start,
                                this.toggleActivities.activate[i].end,
                                this.tarif_konsultasi
                            );
                        } catch (error) {
                            console.log('Error uploading session:', error);
                            continue;
                        }
                    }
                }
                if(this.toggleActivities.deactivate.length != 0) {
                    console.log('Deactivated Sessions:', this.toggleActivities.deactivate);
                } 
                this.toggleActivities.activate = [];
                this.toggleActivities.deactivate = [];
                await this.handle_on_reload();
            } catch (error) {
                console.log('Error saving sessions:', error);
            }
        },

        async handle_upload_to_api(expertId, dateStart, dateEnd, rate) {
            try {
                const hasil = await set_schedule_id(expertId, dateStart, dateEnd, rate);
                console.log(hasil);
            } catch (error) {
                console.log('Error uploading to API:', error);
            }
        },

        handle_toogle_block(id, start_session, end_session) {
            const meeting = this.allMeetings.find(m => m.id === id);
            if (!meeting) { return };

            if (!meeting.occupied) {
                const date = meeting.date;
                const occupiedSessionsForDay = this.allMeetings.filter(m =>
                    m.date === date && m.occupied
                ).length;

                // console.log("Start : " + start_session + "\nEnd : " + end_session);

                if (occupiedSessionsForDay >= 10) {
                    this.mencapai_maksimum_sesi = true;

                    setTimeout(() => {
                        this.mencapai_maksimum_sesi = false;
                    }, 4000);
                    return;
                }
            } else {
                // console.log(`Meeting canceled time start: ${start_session} time end: ${end_session}`);
            }

            meeting.occupied = !meeting.occupied;

            // Create activity object
            const activity = {
                // id: id,
                // date: meeting.date,
                start: start_session,
                end: end_session,
                // timestamp: new Date().toISOString()
            };

            // Push to appropriate array based on action
            if (meeting.occupied) {

                this.toggleActivities.activate.push(activity);
                // console.log(activity)
            } else {
                this.toggleActivities.deactivate.push(activity);
            }

            // console.log('Activated sessions:', this.toggleActivities.activate);
            // console.log('Deactivated sessions:', this.toggleActivities.deactivate);
        },

        generateCalendarDays(year, month) {
            const days = [];
            const firstDayOfMonth = new Date(Date.UTC(year, month, 1));
            const lastDayOfMonth = new Date(Date.UTC(year, month + 1, 0));
            const daysInMonth = lastDayOfMonth.getUTCDate();
            const startPadding = (firstDayOfMonth.getUTCDay() + 6) % 7;

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

            for (let i = 1; i <= daysInMonth; i++) {
                const date = new Date(Date.UTC(year, month, i));
                days.push({
                    date: this.formatDate(date),
                    isCurrentMonth: true,
                    isToday: this.isToday(date),
                    isSelected: this.isSameDate(date, this.selectedDate)
                });
            }

            const remainingDays = 42 - days.length;
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
                // Update current price when date is selected
                // this.tarif_konsultasi = this.prices[day.date] || '';
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
        },
 

        validateNumberInput(event) {
            // Block any non-numeric key presses
            const charCode = (event.which) ? event.which : event.keyCode;
            if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                event.preventDefault();
            }
        },
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

.note_1 {
    display: flex;
    justify-content: center;
    /* align-items: center; */
    flex-direction: column;
}

.note_1 p {
    font-size: 12px;
    color: #b2b2b2;
}


#all_meeting_scroll {
    max-height: 20rem;
    overflow-y: auto;
}

#alert {
    font-size: 22px;
    color: red;
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

.split_1 {
    display: flex;
    flex-direction: column;
}

.split_3 {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

div.split_1 div.input_price input#price {
    width: 120px;
}

.input_price {
    display: flex;
    align-items: center;
    gap: 10px;

    margin-top: 20px;
    margin-bottom: 10px;


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