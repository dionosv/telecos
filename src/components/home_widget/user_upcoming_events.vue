<template>
    <div class="" v-if="loaded"> 
        <div class="jadwal">
            <ion-icon name="calendar-outline" size="large"></ion-icon>
            <h1 class="text-sm">Jadwal Konsultasi Anda</h1>
        </div>
        <ul role="list" class="divide-y divide-gray-100" v-if="all_session.status === 1" id="widget_upcoming_events">
            <li v-for="session in sortedSessions" :key="session.sessionId">

                <router-link :to="{ name: 'single_jadwal_konsultasi', params: { session_id: session.sessionId } }"

                    class="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6 lg:px-8">
                    <div class="flex items-center gap-x-4">
                        <div class=" sm:flex sm:flex-col sm:items-start">
                            <div class="split_x">
                                <p class="text-sm leading-6 text-gray-000">{{ session.sessionName }}</p>
                                <!-- <span class="relative flex h-3 w-3">
                                    <span
                                        class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                    <span class="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                                </span> -->
                            </div>
                            <p class="mt-1 text-xs leading-5 text-gray-500">
                                {{ formatDateTime(session.date, session.endDate) }}
                            </p>
                        </div>
                    </div>
                    <!-- <div class="flex items-center gap-x-4 right-section">
                        <div class="min-w-0 flex-auto text-right">
                            <p class="text-sm font-semibold leading-6 text-gray-900">
                                <span class="inset-x-0 -top-px bottom-0" />
                                {{ expertDetails[session.expertId]?.name || 'Loading...' }}
                            </p>
                            <p class="mt-1 text-xs leading-5 text-gray-500">
                                <span class="relative truncate">{{ expertDetails[session.expertId]?.description ||
                                    'Expert' }}</span>
                            </p>
                        </div>
                        <img class="h-12 w-12 flex-none rounded-full bg-gray-50" :src="getExpertImage(session.expertId)"
                            alt="" />
                        <ion-icon name="chevron-forward-outline" id="chevron_icon"></ion-icon>
                    </div>  -->
                </router-link>
            </li>
        </ul> 
    </div>

    <Spinner v-if="!loaded"></Spinner>
</template>
<script>
import { get_experts_byID } from '@/components/logic/API/experts_service';
import { usetelecos_session_detailsStore } from '@/components/logic/API/save_session_service';
import { get_session_by_user_Id } from '@/components/logic/API/session/session_service';
import { always_scroll_on_top } from '@/components/logic/tools/handle_always_scroll_on_top';
import Spinner from '@/components/spinner/spinner.vue';

export default {
    mounted() {
        always_scroll_on_top();
        this.try_get_session();
    },
    components: {
        Spinner
    },
    data() {
        return {
            userId: '',
            session: {},
            all_session: {},
            loaded: false,
            expertDetails: {} // Add this line
        }
    },
    computed: {
        sortedSessions() {
            if (!this.all_session.session) return [];

            return [...this.all_session.session]
                .filter(session => session.status === "pending") // Only show pending sessions
                .sort((a, b) => {
                    const dateA = new Date(a.date);
                    const dateB = new Date(b.date);
                    return dateA - dateB;
                });

        }
    },
    methods: {

        async try_get_session() {
            try {
                const sessionStore = usetelecos_session_detailsStore();
                const sessionDetails = await sessionStore.loadtelecos_session_details();

                if (sessionDetails === false) {
                    this.$router.push({ name: 'akun' });
                } else {
                    if (sessionDetails.phase == 1) {
                        this.userId = sessionDetails.userid;
                        console.log("user id : " + this.userId);
                        await this.wrapper_get_session_by_user_Id();
                        await this.get_session_by_id();
                    }
                }
            } catch (error) {
                console.error('Failed to load session details:', error);
            } finally {
                this.isLoading = false;
            }
        },

        async wrapper_get_session_by_user_Id() {
            this.session = await get_session_by_user_Id(this.userId);
        },

        async get_session_by_id() {
            this.all_session = await get_session_by_user_Id(this.userId);
            // After getting sessions, fetch expert details for each session
            if (this.all_session.status === 1) {
                const expertIds = new Set(this.all_session.session.map(s => s.expertId));
                await Promise.all(
                    Array.from(expertIds).map(id => this.fetchExpertDetails(id))
                );
            }
            else {
                console.log("no session");
            }
            this.loaded = true;
        },

        async fetchExpertDetails(expertId) {
            try {
                const expertData = await get_experts_byID(expertId);
                if (expertData.status === 1) {
                    this.expertDetails = {
                        ...this.expertDetails,
                        [expertId]: expertData.user
                    };
                }
            } catch (error) {
                console.error('Failed to fetch expert details:', error);
            }
        },

        getExpertImage(expertId) {
            const expert = this.expertDetails[expertId];
            if (expert?.imageName) {
                return `https://claudio.codes/telecos-be/image-rs/expert/${expert.imageName}`;
            }
            return 'default-image-url';
        },

        async wrapper_get_detail_ahli_by_id(expert_id) {
            console.log(await get_experts_byID(expert_id));
        },

        formatDateTime(startTime, endTime) {
            const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
            const months = [
                'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
                'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
            ];

            const date = new Date(startTime);
            const day = days[date.getDay()];
            const dateNum = String(date.getDate()).padStart(2, '0');
            const month = months[date.getMonth()];
            const year = date.getFullYear();

            // Convert UTC to WIB (UTC+7)
            const startDate = new Date(startTime);
            const endDate = new Date(endTime);

            const startHour = startDate.toLocaleTimeString('id-ID', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
                timeZone: 'Asia/Jakarta'
            });

            const endHour = endDate.toLocaleTimeString('id-ID', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
                timeZone: 'Asia/Jakarta'
            });

            return `${day}, ${dateNum} ${month} ${year} ${startHour} - ${endHour} WIB`;
        }

    },
}
</script>
<style scoped>

#widget_upcoming_events{
    overflow-y: auto;
    overflow-x: hidden;
    height: 280px;
    max-height: calc(100vh - 200px);
    padding: 0.5rem;
}
@media (max-width: 639px) {
    #chevron_icon {
        display: none;
    }

    .right-section {
        flex-direction: column;
        align-items: flex-end;
    }

    .right-section img {
        margin-top: 4px;
    }
}

.jadwal {
    display: flex;
    align-items: center; 
    padding: 1rem;
    margin-bottom: 0.5rem;
}

.jadwal h1 {

    margin-left: 10px;
    font-size: clamp(14px, 4vw, 18px);
    font-weight: 600;

}

.not_found {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    min-height: 200px;
    gap: 1rem;
    padding: 1rem;
    text-align: center;
}

.split_x {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 7px;
    flex-wrap: wrap;
}

.split_x span {
    flex-shrink: 0;
    /* Ensure the badge does not take full width */
}

.xx_note{
    margin : 20px; 
    text-align: center;
}

.xx_note p{
    font-size: 11px;
    font-weight: 600; 
}

.not_found ion-icon {
    font-size: 3rem;
    color: #666;
}

.not_found .s_query {
    font-size: 1.25rem;
    color: #666;
    max-width: 100%;
    word-wrap: break-word;
}

@media screen and (max-width: 768px) {
    .not_found {
        min-height: 150px;
        padding: 1.5rem;
    }

    .not_found ion-icon {
        font-size: 2.5rem;
    }

    .not_found .s_query {
        font-size: 1rem;
        padding: 0 1rem;
        line-height: 1.5;
    }

    .split_x {
        display: flex;
        flex-direction: column;
        gap: 0px;
    }

    .split_x span {
        margin-top: 5px;
        margin-bottom: 5px;
        align-self: flex-start;
        /* Align badge to the start */
    }

    #widget_upcoming_events {
        height: auto;
        max-height: 400px;
    }

    .jadwal {
        padding: 0.75rem;
    }

    .jadwal ion-icon {
        font-size: 24px;
    }

    .split_x {
        gap: 5px;
    }
}

@media screen and (max-width: 480px) {
    .not_found {
        min-height: 120px;
        padding: 1rem;
    }

    .not_found ion-icon {
        font-size: 2rem;
    }

    .not_found .s_query {
        font-size: 0.875rem;
    }

    #widget_upcoming_events {
        max-height: 350px;
    }

    .jadwal {
        padding: 0.5rem;
    }

    .jadwal h1 {
        font-size: 16px;
    }

    .text-sm {
        font-size: 14px;
    }

    .text-xs {
        font-size: 12px;
    }

    li {
        padding: 0.75rem 0.5rem;
    }

    .split_x {
        flex-direction: column;
        align-items: flex-start;
    }

    .split_x span {
        margin-top: 3px;
    }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
    .hover\:bg-gray-50:hover {
        background-color: rgba(75, 85, 99, 0.1);
    }

    .text-gray-900 {
        color: #e5e7eb;
    }

    .text-gray-500 {
        color: #9ca3af;
    }
}

/* Custom scrollbar */
#widget_upcoming_events::-webkit-scrollbar {
    width: 6px;
}

#widget_upcoming_events::-webkit-scrollbar-track {
    background: #f1f1f1;
}

#widget_upcoming_events::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 3px;
}

#widget_upcoming_events::-webkit-scrollbar-thumb:hover {
    background: #555;
}
</style>