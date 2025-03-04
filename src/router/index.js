import { createRouter, createWebHistory } from 'vue-router'
import HomeUser from '../views/home/HomeUser.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
  routes: [
    {
      path: '/',
      component: () => import('../App_user.vue'),
      children: [

        {
          path: '',
          name: 'home',
          component: HomeUser
        },

        {
          path: 'akun/:param_1?/:param_2?',
          name: 'akun',
          component: () => import('../views/account/akun.vue'),
        },

        {
          path: 'lupa-kata-sandi',
          name: 'lupa',
          component: () => import('../views/account/lupa_kata_sandi.vue'),
        },

        {
          path: 'detail-akun',
          name: 'detail_akun',
          component: () => import('../views/account/ganti_detail_akun.vue'),
          
        },
        {
          path: 'ubah-kata-sandi',
          name: 'ubah_kata_sandi',
          component: () => import('../views/account/ubah_kata_sandi.vue'),
        },

        {
          path: 'otp',
          name: 'otp',
          component: () => import('../views/account/otp_email.vue'),
        },
        {
          path: 'otp-lupa-kata-sandi',
          name: 'otp_lupa_kata_sandi',
          component: () => import('../views/account/otp_lupa_kata_sandi.vue'),
        },



        {
          path: 'daftar-ahli-favorit',
          name: 'daftar_ahli_favorit',
          component: () => import('../views/account/daftar_ahli_fav.vue'),
          
        },

        {
          path: 'daftar-sukses',
          name: 'daftar_sukses',
          component: () => import('../views/account/daftar_sukses.vue'),
        },

        {
          path: 'daftar-gagal',
          name: 'daftar_gagal',
          component: () => import('../views/account/daftar_gagal.vue'),
        },
        {
          path: 'wallet',
          name: 'wallet',
          component: () => import('../views/account/wallet.vue'),
        },
        {
          path: 'pusat-bantuan',
          name: 'pusat_bantuan',
          component: () => import('../views/settings/pusat_bantuan.vue'),
        }, 

        {
          path: 'pertanyaan-yang-sering-ditanyakan',
          name: 'pertanyaan_yang_sering_ditanyakan',
          component: () => import('../views/settings/pertanyaan_yang_sering_ditanyakan.vue'),
        },

        {
          path: 'lapor-telecos-care',
          name: 'lapor_telecos_care_user',
          component: () => import('../views/settings/create_telecos_care.vue'),
        },

{
        path: 'iframe',
        name: 'iframe',
        component: () => import('../views/konsultasi/live_konsultasi/live_session_user.vue'),
      },


       

        {
          path: 'telecos-care',
          name: 'telecos_care',
          component: () => import('../views/settings/telecos_care.vue'),
          
        },

        {
          path: 'telecos-care/:laporan_id',
          name: 'detail_laporan_telecos_care',
          component: () => import('../views/settings/single_laporan_telecos_care.vue'),
        },

        {
          path: 'konsultasi/sesi-aktif',
          name: 'sesi_aktif',
          component: () => import('../views/konsultasi/sesi_aktif.vue'),
        },

        {
          path: 'konsultasi/riwayat-konsultasi',
          name: 'riwayat_konsultasi',
          component: () => import('../views/konsultasi/lihat_riwayat_konsultasi.vue'),
        },
        {
          path: 'konsultasi/jadwal-konsultasi',
          name: 'jadwal_konsultasi',
          component: () => import('../views/konsultasi/lihat_jadwal_konsultasi.vue'),
        },

        {
          path: 'konsultasi/live-konsultasi/:session_id?',
          name: 'single_jadwal_konsultasi',
          component: () => import('../views/konsultasi/live_konsultasi/user_live_konsultasi.vue'),
        },
        {
          path: 'konsultasi/rating-sesi-konsultasi/:session_id?',
          name: 'rating_sesi',
          component: () => import('../views/konsultasi/rating_konsultasi/rating_single.vue'),
        },

        {
          path: 'konsultasi/buat-konsultasi',
          name: 'daftar_ahli_konsultasi',
          component: () => import('../views/konsultasi/lihat_daftar_ahli.vue'),
        },
        {
          path: 'ahli/:expertId',
          name: 'detail_expert_id',
          component: () => import('../views/konsultasi/single_page_detail_ahli/detail_ahli.vue'),
          
        }, 

        {
          path: "artikel",
          children: [
            {
              path: "",
              name: "landing_page_artikel",
              component: () => import('../views/article/landing_page_article_user.vue'),
            },
            {
              path: 'baca/:articleId',
              name: 'single_page_article',
              component: () => import('../views/article/single_article/single_page_article_user.vue'),
              
            },

          ]
        },

        {
          path: "pesanan",
          children: [ 
            {
              path:'baru/:schedule_id?/:expert_id?',
              name:'pesanan_baru',
              component: () => import('../views/konsultasi/buat_pesanan_baru.vue'),
              //butuh shield
            }

          ]
        },


      ]
    },
 
    {
      path: '/expert',
      name: 'main_expert',
      component: () => import('../App_expert.vue'),
      children: [
        {
          path: '',
          name: 'home_expert',
          component: () => import('../views/expert/home_expert.vue'),
        },

        {
          path: 'daftar',
          name: 'daftar_kan_expert',
          component: () => import('../views/expert/akun_expert/daftar_expert.vue'),
        },

        {
          path: 'akun',
          name: 'akun_expert',
          component: () => import('../views/expert/akun_expert/akun_expert.vue'),
        },
        {
          path: "otp",
          name: "otp_expert",
          component: () => import('../views/expert/akun_expert/otp_email_expert.vue'),
        },
        {
          path: "lupa-kata-sandi",
          name: "lupa_kata_sandi_expert",
          component: () => import('../views/expert/akun_expert/lupa_kata_sandi_expert.vue'),
        },
        {
          path: "ubah-kata-sandi",
          name: "ubah_kata_sandi_expert",
          component: () => import('../views/expert/akun_expert/ubah_kata_sandi_expert.vue'),
        },
        {
          path: "detail-akun",
          name: "detail_akun_expert",
          component: () => import('../views/expert/akun_expert/ganti_detail_akun_expert.vue'),
        },
        {
          path: "ganti-foto-profil",
          name: "ganti_foto_profil_expert",
          component: () => import('../views/expert/akun_expert/ganti_foto_profil.vue'),
        },

        {
          path: 'daftar-sukses',
          name: 'daftar_sukses_expert',
          component: () => import('../views/expert/akun_expert/daftar_sukses_expert.vue'),
        },

        {
          path: 'daftar-gagal',
          name: 'daftar_gagal_expert',
          component: () => import('../views/expert/akun_expert/daftar_gagal_expert.vue'),
        },

        {
          path: "atur-waktu-konsultasi",
          name: "atur_waktu_konsultasi",
          component: () => import('../views/schedule/landing_availability_expert.vue'),
        },


        {
          path: "telecos-care-expert",
          name: "telecos_care_expert",
          component: () => import('../views/expert/settings_expert/telecos_care_expert.vue'),
        },

        {
          path: 'lapor-telecos-care',
          name: 'lapor_telecos_care',
          component: () => import('../views/expert/settings_expert/create_telecos_care_expert.vue'),
        },
        {
          path: 'telecos-care-expert/:laporan_id',
          name: 'detail_laporan_telecos_care_expert',
          component: () => import('../views/expert/settings_expert/single_laporan_telecos_care_expert.vue'),
        },


        {
          path: 'jadwal-konsultasi',
          name: 'jadwal_konsultasi_expert',
          component: () => import('../views/expert/jadwal_konsultasi_expert/jadwal_konsultasi_expert.vue'),
        },

        {
          path: 'riwayat-konsultasi',
          name: 'riwayat_konsultasi_expert',
          component: () => import('../views/expert/riwayat_konsultasi_expert/riwayat_konsultasi_expert.vue'),
        },
        
        {
          path:'saldo',
          children:[
            {
              path:'',
              name:'view_payroll',
              component:()=>import('../views/expert/saldo_expert/payroll_expert.vue')
            }
          ]
        },
        
        {
          path:'konsultasi',
          children:[
            {
              path:'',
              name:'sesi_aktif_expert',
              component:()=>import('../views/expert/sesi_aktif/sesi_aktif_expert.vue')
            },
            {
              path: 'live-konsultasi/:session_id?',
              name: 'expert_single_jadwal_konsultasi',
              component: () => import('../views/expert/live_konsultasi/expert_live_konsultasi.vue'),
            },
          ]

        },
      ]
    },

    {
      path: '/admin',
      name: 'main_admin',
      component: () => import('../App_admin.vue'),
      children: [
        {
          path: '',
          name: 'home_admin',
          component: () => import('../views/all_admin/home_admin.vue'),
        }, 
        {
          path: 'akun',
          name: 'akun_admin',
          component: () => import('../views/all_admin/akun_admin/akun_admin.vue'),
        },   
        {
          path: 'acc-ahli',
          name: 'admin_acc_ahli_admin',
          component: () => import('../views/all_admin/akses_admin/acc_ahli.vue'),
        },
        
        {
          path: 'daftar-ahli',
          name: 'lihat_ahli_admin',
          component: () => import('../views/all_admin/akses_admin/lihat_semua_ahli.vue'),
        },
        {
          path: 'sesi',
          name: 'lihat_sesi_admin',
          component: () => import('../views/all_admin/akses_admin/lihat_sesi.vue'),
        },
        {
          path: 'telecos-care-admin',
          name: 'telecos_care_admin',
          component: () => import('../views/all_admin/akses_admin/telecos_care_admin.vue'),
        },
        {
          path: 'lihat-tc/:laporan_id?',
          name: 'single_telecos_care_admin',
          component: () => import('../views/all_admin/akses_admin/single_telecos_care_admin.vue'),
        },
        {
          path: 'transaksi',
          name: 'lihat_transaksi_admin',
          component: () => import('../views/all_admin/akses_admin/lihat_transaksi.vue'),
        },

        {
          path : "pengguna",
          children: [
            {
              path :"",
              name : "lihat_user_admin",
              component: () => import('../views/all_admin/akses_admin/pengguna/user_admin.vue'),
            },
            {
              path :"lihat-semua-user",
              name : "lihat_semua_user_admin",
              component: () => import('../views/all_admin/akses_admin/pengguna/lihat_semua_pengguna.vue'),
            },
            {
              path :"top-up-user",
              name : "top_up_user_admin",
              component: () => import('../views/all_admin/akses_admin/pengguna/top_up_user.vue'),
            }

          ]
        },

        {
          path: "artikel",
          children: [
            {
              path: '',
              name: 'artikel_admin',
              component: () => import('../views/all_admin/akses_admin/artikel_admin.vue'),
            }, 
            {
              path: 'baca/:articleId',
              name: 'single_page_article_admin',
              component: () => import('../views/article/single_article/single_page_article_expert.vue'),
              
            },
            {
              path: 'buat-artikel-baru',
              name: 'buat_artikel_admin',
              component: () => import('../views/article/create_article.vue'),
            },
            {
              path: 'lihat-artikel-saya/', 
              name: 'lihat_artikel_saya_admin',
              component: () => import('../views/article/lihat_artikel_saya.vue'),
            },
            {
              path: 'edit-artikel/:articleId?',
              name: 'edit_artikel_admin',
              component: () => import('../views/article/edit_article.vue'),
            },
            {
              path: 'berhasil-buat-artikel-baru',
              name: 'berhasil_buat_artikel_admin',
              component: () => import('../views/article/create_article_success.vue'),
              
            },
          ]
        },
      ]
    }

    // {
    //   path: '/:catchAll(.*)',
    //   redirect: { name: 'home' }
    // }
  ],
})

export default router