import { defineStore } from 'pinia';
import Cookies from 'js-cookie';

export const usetelecos_session_detailsStore = defineStore('expert_telecos_session_details', {
  state: () => ({
    phase: null,
    userid: null,
    user_role: null,
    expirate: null,

    akun_nama: null,
    akun_email: null,
    akun_telp: null,
    akun_sandi: null,
    jenis_kelamin: null,
    jenis_ahli : null,
    birthdate: null,
    noSTR:null,
    lokasi_praktek : null,
    almamater:null,
  }),

  actions: {
    savetelecos_session_details(userid, user_role, expirate) {
      this.userid = userid;
      this.user_role = user_role; 

      Cookies.set('expert_telecos_session_details', JSON.stringify({
        phase: 1, //kalo phase 1 user udah login
        userid: this.userid,
        user_role: this.user_role, 
      }), { expires: new Date(expirate), secure: true, sameSite: 'None' });
    },

    save_temporary_telecos_register({ phase ,nama, email, telp, sandi, jenis_kelamin,jenis_ahli, birthdate, noSTR,lokasi_praktek,almamater, expirate }) {
      Cookies.set('expert_telecos_session_details', JSON.stringify({
        phase: phase, // phase 2 user udah daftar
        akun_nama: nama,
        akun_email: email,
        akun_telp: telp,
        akun_sandi: sandi,
        jenis_kelamin: jenis_kelamin, 
        jenis_ahli : jenis_ahli,
        birthdate: birthdate,
        noSTR:noSTR,
        lokasi_praktek : lokasi_praktek,
        almamater:almamater,
      }), { expires: new Date(expirate), secure: true, sameSite: 'None' });
    },

    loadtelecos_session_details() {
      const cookieValue = Cookies.get('expert_telecos_session_details');
      if (cookieValue) {
        const expert_telecos_session_details = JSON.parse(cookieValue);
        if (expert_telecos_session_details) {
          //if date time lebih dari sekarang bisa langsung logout dari fungsi ini
          if (expert_telecos_session_details.phase == 1) {
            return {
              phase: expert_telecos_session_details.phase,
              userid: expert_telecos_session_details.userid,
              user_role: expert_telecos_session_details.user_role,
              expirate: expert_telecos_session_details.expirate,
            };
          }
          else if (expert_telecos_session_details.phase == 2) {
            return {
              phase: expert_telecos_session_details.phase,
              akun_nama: expert_telecos_session_details.akun_nama,
              akun_email: expert_telecos_session_details.akun_email,
              akun_telp: expert_telecos_session_details.akun_telp,
              akun_sandi: expert_telecos_session_details.akun_sandi,
              jenis_kelamin: expert_telecos_session_details.jenis_kelamin,
              jenis_ahli : expert_telecos_session_details.jenis_ahli,
              birthdate: expert_telecos_session_details.birthdate, 
              expirate: expert_telecos_session_details.expirate,
              noSTR:expert_telecos_session_details.noSTR,
              almamater:expert_telecos_session_details.almamater
            };
          }
          else if (expert_telecos_session_details.phase == 3) {
            return {
              phase: expert_telecos_session_details.phase,
              akun_nama: expert_telecos_session_details.akun_nama,
              akun_email: expert_telecos_session_details.akun_email,
              akun_telp: expert_telecos_session_details.akun_telp,
              akun_sandi: expert_telecos_session_details.akun_sandi,
              jenis_kelamin: expert_telecos_session_details.jenis_kelamin,
              jenis_ahli : expert_telecos_session_details.jenis_ahli,
              birthdate: expert_telecos_session_details.birthdate, 
              expirate: expert_telecos_session_details.expirate,
              noSTR:expert_telecos_session_details.noSTR,
              almamater:expert_telecos_session_details.almamater
            };
          }
        }
      }
      return false;
    },
    cleartelecos_session_details() {
      Cookies.remove('expert_telecos_session_details');
    }
  }
});
