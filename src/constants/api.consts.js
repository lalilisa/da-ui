
const HOSTNAME = 'http://192.168.1.29:8085';
const API_LOGIN = `${HOSTNAME}/api/auth/login`;
const API_REGISTER = `${HOSTNAME}/api/auth/register`;
const SEND_OTP = `${HOSTNAME}/api/auth/send-otp`;
const VERIFI_OTP = `${HOSTNAME}/api/auth/verifi-otp`;
const FILTER_MOVIES = `${HOSTNAME}/api/v1/movies`;
const MY_NOTIFICATION = `${HOSTNAME}/api/notification/me`;
const GET_USER_INFO = `${HOSTNAME}/api/api/user/user-info`;
const UPDATE_USER_INFO = `${HOSTNAME}/api/api/user/user-info`;
const CHANGED_PASSWORD = `${HOSTNAME}/api/api/user/change-password`;
const GET_DETAIL_ACTOR = `${HOSTNAME}/api/v1/actor/`
const GET_ACTOR_RELATE_MOVIES = `${HOSTNAME}/api/v1/actor/relateInMovies`;
export {
    HOSTNAME,
    API_LOGIN,
    API_REGISTER,
    SEND_OTP,
    VERIFI_OTP,
    CHANGED_PASSWORD,
    GET_USER_INFO,
    MY_NOTIFICATION,
    UPDATE_USER_INFO,
    FILTER_MOVIES,
    GET_ACTOR_RELATE_MOVIES,
    GET_DETAIL_ACTOR
}