<template>
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" v-if="loaded">
        <div class="jadwal">
            <h1>Jadwal Konsultasi Anda</h1>
        </div>
        <ul role="list" class="divide-y divide-gray-100" v-if="all_session.status === 1">
            <li v-for="session in sortedSessions" :key="session.sessionId">

                <div
                    class="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6 lg:px-8">
                    <div class="flex items-center gap-x-4">
                        <div class=" sm:flex sm:flex-col sm:items-start">
                            <p class="text-sm leading-6 text-gray-900">{{ session.sessionName }}</p>
                            <p class="mt-1 text-xs leading-5 text-gray-500">
                                {{ formatDateTime(session.date, session.endDate) }}
                            </p>
                        </div>
                    </div>
                    <div class="flex items-center gap-x-4 right-section">
                        <div class="min-w-0 flex-auto text-right">
                            <p class="text-sm font-semibold leading-6 text-gray-900">
                                <span class="inset-x-0 -top-px bottom-0" />
                                {{ userDetails[session.userId] || 'Loading...' }}
                            </p>
                            <p class="mt-1 text-xs leading-5 text-gray-500">
                                <span class="relative truncate">Pengguna Telecos</span>
                            </p>
                        </div>
                        <!-- <img class="h-12 w-12 flex-none rounded-full bg-gray-50" :src="getExpertImage(session.expertId)"
                            alt="" /> -->
                        <!-- <ion-icon name="chevron-forward-outline" id="chevron_icon"></ion-icon> -->
                    </div>
                </div>

            </li>
        </ul>
        <div class="not_found" v-if="all_session.status === 0">
            <ion-icon name="alert-circle"></ion-icon>
            <p class="s_query">Tidak ada jadwal konsultasi</p>
            <!-- <router-link :to="{ name: 'daftar_ahli_konsultasi' }"
                class="rounded-md bg-orange-400 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">Buat
                Sesi Konsultasi</router-link> -->
        </div>
    </div>

    <Spinner v-if="!loaded"></Spinner>
</template>
<script>
import { get_experts_byID } from '@/components/logic/API/experts_service';
import { usetelecos_session_detailsStore } from '@/components/logic/API/expert/expert_save_session_service';
import { get_session_by_expert_Id, get_session_by_user_Id } from '@/components/logic/API/session/session_service';
import { always_scroll_on_top } from '@/components/logic/tools/handle_always_scroll_on_top';
import Spinner from '@/components/spinner/spinner.vue';
import { get_user_data } from '@/components/logic/API/user_service';

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
            userDetails: {} // Add this line
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
                    this.$router.push({ name: 'akun_expert' });
                } else {
                    if (sessionDetails.phase == 1) {
                        this.userId = sessionDetails.userid;
                        console.log("user id : " + this.userId);
                        // await this.wrapper_get_session_by_expert_Id();
                        await this.get_session_by_id();
                    }
                }
            } catch (error) {
                console.error('Failed to load session details:', error);
            } finally {
                this.isLoading = false;
            }
        }, 
        async get_session_by_id() {
            this.all_session = await get_session_by_expert_Id(this.userId);
            // After getting sessions, fetch expert details for each session
            // console.log(this.all_session);
            if (this.all_session.status === 1) {
                const userIds = new Set(this.all_session.session.map(s => s.userId));
                await Promise.all(
                    Array.from(userIds).map(id => this.fetchuserDetails(id))
                );
            }
            else {
                console.log("no session");
            }
            this.loaded = true;
        },

        async fetchuserDetails(expertId) {
            try {
                const response = await get_user_data(expertId);
                if (response.status === 1) {
                    this.userDetails = {
                        ...this.userDetails,
                        [expertId]: response.user.name
                    };
                }
            } catch (error) {
                console.error('Failed to fetch expert details:', error);
            }
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
<style>
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

.jadwal{
    display: flex;
    align-items: center;
    margin-top: 20px;
    margin-bottom: 20px;
}

.jadwal h1{
    
    margin-left: 10px;
    font-size: 25px;
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
}
</style>