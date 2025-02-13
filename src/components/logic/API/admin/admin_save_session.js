import { defineStore } from 'pinia';
import Cookies from 'js-cookie';
import { session_expirate } from './admin';

export const usetelecos_session_detailsStore = defineStore('admin_telecos_session_details', {
  state: () => ({
    phase: null,
    userid: null,
    user_role: null,
    expirate: null, 
  }),

  actions: {
    savetelecos_session_details(userid, user_role, expirate) {
      this.userid = userid;
      this.user_role = user_role; 

      Cookies.set('admin_telecos_session_details', JSON.stringify({ 
        userid: this.userid, 
        user_role: this.user_role
      }), { expires: new Date(session_expirate(30)), secure: true, sameSite: 'None' });
    },

    load_admin_telecos() {
      const cookieValue = Cookies.get('admin_telecos_session_details');
      if (cookieValue) {
        const admin_telecos_session_details = JSON.parse(cookieValue);
        if (admin_telecos_session_details) {
            return { 
              userid: admin_telecos_session_details.userid,
              user_role: admin_telecos_session_details.user_role,
              expirate: admin_telecos_session_details.expirate
          } 
        }
      }
      return false;
    },
    cleartelecos_session_details() {
      Cookies.remove('admin_telecos_session_details');
    }
  }
});
