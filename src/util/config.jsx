import axios from "axios";
import { customNavigate } from "..";

export const DOMAIN = 'https://shop.cyberlearn.vn/'
export const USER_LOGIN = 'userLogin'
export const TOKKEN = 'accessToken'
export const http = axios.create({
    baseURL: DOMAIN,
    timeout: 3000
})
const configStore = {
    setStoreJson: (name, data) => {
        let stringData = JSON.stringify(data);
        localStorage.setItem(name, stringData);
    },
    getStoreJson: name => {
        if (localStorage.getItem(name)) {
            let stringData = localStorage.getItem(name);
            let data = JSON.parse(stringData);
            return data
        }
        return undefined
    },
    // Lưu và lấy chuỗi
    setStore: (name, data) => {

        localStorage.setItem(name, data);
    },
    getStore: name => {
        if (localStorage.getItem(name)) {
            let data = localStorage.getItem(name);
            return data
        }
        return undefined
    },
    setCookieJson(name, value, days) {
        value = JSON.stringify(value)
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    },
    getCookieJson(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) {
                return JSON.parse(c.substring(nameEQ.length, c.length));
            }
        }
        return undefined;
    },
    clearCookieJson(name) {
        document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
}
export const { setStoreJson, getStoreJson, getCookieJson, setCookieJson, clearCookieJson } = configStore
//Cấu hình cho các lệnh request gửi đi
http.interceptors.request.use(request => {
    request.headers = { ...request.headers }
    if (getStoreJson(USER_LOGIN)) {
        request.headers = { ...request.headers, Authorization: `Bearer ` + getStoreJson(USER_LOGIN).accessToken }
    }
    return request
}, err => {
    return Promise.reject(err)
})
// cấu hình cho các lệnh response từ server trả về
http.interceptors.response.use(res => {
    return res
}, err => {
    if (err.response?.status == 400 || err.response?.status == 404) {
        window.alert(err.response.data.message);
    }
    if (err.response?.status == 401) {
        window.alert("Please sign in !");
    }
    if (err.response?.status == 500) {
        window.alert(err.response.data.content)
    }
})
// Ẩn hiện trang
