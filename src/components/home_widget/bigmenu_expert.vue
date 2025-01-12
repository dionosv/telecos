<template>

    <div class="all_menu">
        <div class="big_menu">
            <div class="menu-container">
                <router-link :to="{ name: 'sesi_aktif_expert' }">
                    <div class="single_menu">
                        <ion-icon name="videocam-outline"></ion-icon>
                        <span class="tooltip">Sesi Aktif</span>
                    </div>
                </router-link>

                <span class="mobile-label">Sesi Aktif</span>
            </div>

            <div class="menu-container">
                <router-link :to="{ name: 'atur_waktu_konsultasi' }">
                    <div class="single_menu">
                        <ion-icon name="time-outline"></ion-icon>
                        <span class="tooltip">Atur Waktu Konsultasi</span>
                    </div>
                </router-link>
                <span class="mobile-label">Atur Waktu</span>
            </div>

            <div class="menu-container">
                <router-link :to="{ name: 'jadwal_konsultasi' }">

                    <div class="single_menu">
                        <ion-icon name="calendar-outline"></ion-icon>
                        <span class="tooltip">Jadwal Konsultasi</span>
                    </div>
                </router-link>

                <span class="mobile-label">Jadwal</span>
            </div>

            <div class="menu-container">
                <router-link :to="{ name: 'riwayat_konsultasi' }">

                    <div class="single_menu">
                        <ion-icon name="reader-outline"></ion-icon>
                        <span class="tooltip">Riwayat Konsultasi</span>
                    </div>

                </router-link>

                <span class="mobile-label">Riwayat</span>
            </div>
        </div>

        <!-- <div class="med_menu">
            <div class="long-container">
                <router-link :to="{ name: 'buat_artikel_expert' }">
                    <div class="long_menu">
                        <ion-icon name="add-circle-outline"></ion-icon>
                        <span class="tooltip">Buat Artikel</span>
                    </div>
                </router-link>

                <span class="mobile-label">Buat Artikel</span>
            </div>

            <div class="long-container">
                <router-link :to="{ name: 'landing_page_artikel_expert' }">
                    <div class="long_menu">
                        <ion-icon name="newspaper-outline"></ion-icon>
                        <span class="tooltip">Baca Artikel</span>
                    </div>
                </router-link>
                <span class="mobile-label">Baca Artikel</span>
            </div>
        </div> -->

    </div>
</template>
<script>
export default {
    mounted() {
        // this.try_get_session();
    },
    data() {
        return {
            isLogin: false
        }
    },
    methods: {
        async try_get_session() {
            try {
                const sessionStore = usetelecos_session_detailsStore();
                const sessionDetails = await sessionStore.loadtelecos_session_details();
                if (sessionDetails === false) {
                    this.isLogin = false;
                } else {
                    if (sessionDetails.phase == 1) {
                        this.isLogin = true;
                    }

                }
            } catch (error) {
                console.error('Failed to load session details:', error);
            }
        },
    }

}
</script>
<style scoped>
.single_menu {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: auto;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    border-radius: 8px;
    cursor: pointer;
    width: 80px;
    height: 80px;
}

.long_menu {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: auto;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    border-radius: 8px;
    cursor: pointer;
    width: 175px;
    height: 80px;
}

.all_menu {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.big_menu {
    /* display: grid; */
    display: flex;
    gap: 15px;
    justify-content: center;
}

.med_menu {
    display: flex;
    gap: 15px;
    justify-content: center;
}

.menu_row {
    display: flex;
    justify-content: center;
    gap: 20px;
}

div.single_menu ion-icon.md.hydrated {
    font-size: 36px !important;
    color: #F97316;
}

div.long_menu ion-icon.md.hydrated {
    font-size: 36px !important;
    color: #F97316;

}

.tooltip {
    position: absolute;
    bottom: -30px;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 4px 8px;
    border-radius: 5px;
    font-size: 12px;
    white-space: nowrap;
    opacity: 0;
    visibility: hidden;
    transition: all 0.2s ease;
    z-index: 10;
}

.tooltip::before {
    content: '';
    position: absolute;
    top: -4px;
    left: 50%;
    transform: translateX(-50%);
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 5px solid rgba(0, 0, 0, 0.8);
}

.single_menu:hover .tooltip {
    opacity: 1;
    visibility: visible;
    bottom: -35px;
}

.long_menu:hover .tooltip {
    opacity: 1;
    visibility: visible;
    bottom: -35px;
}

.menu-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
}

.long-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
}

.mobile-label {
    display: none;
    font-size: 12px;
    color: #666;
    text-align: center;
}

@media screen and (max-width: 768px) {
 
    .big_menu {
        /* grid-template-columns: repeat(4, 1fr); */
        /* gap: 8px; */
        gap: 20px;
        height: auto;
        padding: 10px 0;
        /* justify-content: space-between; */
    }

    .med_menu{
        gap: 20px;
        height: auto;
        padding: 10px 0;
    }
    .all_menu{
        /* width: 300px; */
        margin-left: 15px;
        margin-right: 15px;
    }

    .menu_row {
        flex: 1;
        gap: 10px;
    }

    .tooltip {
        display: none;
    }

    .mobile-label {
        display: block;
    }

    .single_menu {
        width: 60px;
        height: 60px;
    }

    .long_menu{
        width: 140px;
        height: 60px;
    }

    div.single_menu ion-icon.md.hydrated {
        font-size: 24px !important;
    }

    div.long_menu ion-icon.md.hydrated {
        font-size: 24px !important;
    }
}
</style>