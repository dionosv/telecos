import { defineStore } from 'pinia';
import Cookies from 'js-cookie';

export const usetelecos_session_detailsStore = defineStore('telecos_session_details', {
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
    birthdate: null
  }),

  actions: {
    savetelecos_session_details(userid, user_role, expirate) {
      this.userid = userid;
      this.user_role = user_role; 

      Cookies.set('telecos_session_details', JSON.stringify({
        phase: 1, //kalo phase 1 user udah login
        userid: this.userid,
        user_role: this.user_role, 
      }), { expires: new Date(expirate), secure: true, sameSite: 'None' });
    },

    save_temporary_telecos_register({ phase ,nama, email, telp, sandi, jenis_kelamin, birthdate, expirate }) {
      Cookies.set('telecos_session_details', JSON.stringify({
        phase: phase, // phase 2 user udah daftar
        akun_nama: nama,
        akun_email: email,
        akun_telp: telp,
        akun_sandi: sandi,
        jenis_kelamin: jenis_kelamin, 
        birthdate: birthdate,
      }), { expires: new Date(expirate), secure: true, sameSite: 'None' });
    },

    loadtelecos_session_details() {
      const cookieValue = Cookies.get('telecos_session_details');
      if (cookieValue) {
        const telecos_session_details = JSON.parse(cookieValue);
        if (telecos_session_details) {
          //if date time lebih dari sekarang bisa langsung logout dari fungsi ini
          if (telecos_session_details.phase == 1) {
            return {
              phase: telecos_session_details.phase,
              userid: telecos_session_details.userid,
              user_role: telecos_session_details.user_role,
              expirate: telecos_session_details.expirate,
            };
          }
          else if (telecos_session_details.phase == 2) {
            return {
              phase: telecos_session_details.phase,
              akun_nama: telecos_session_details.akun_nama,
              akun_email: telecos_session_details.akun_email,
              akun_telp: telecos_session_details.akun_telp,
              akun_sandi: telecos_session_details.akun_sandi,
              jenis_kelamin: telecos_session_details.jenis_kelamin,
              birthdate: telecos_session_details.birthdate, 
              expirate: telecos_session_details.expirate,
            };
          }
          else if (telecos_session_details.phase == 3) {
            return {
              phase: telecos_session_details.phase,
              akun_nama: telecos_session_details.akun_nama,
              akun_email: telecos_session_details.akun_email,
              akun_telp: telecos_session_details.akun_telp,
              akun_sandi: telecos_session_details.akun_sandi,
              jenis_kelamin: telecos_session_details.jenis_kelamin,
              birthdate: telecos_session_details.birthdate, 
              expirate: telecos_session_details.expirate,
            };
          }
        }
      }
      return false;
    },
    cleartelecos_session_details() {
      Cookies.remove('telecos_session_details');
    }
  }
});
