import {defineStore} from 'pinia';
import { EMsg } from '../ErrCode/errmsg';

export default defineStore("snackbarStore", {
    state: () : {
        snackbar_switch: boolean,
        snackbar_message: string,
        kind_flag: boolean | number,
        time_flag: boolean
    } => {
        return {
            snackbar_switch: false,
            snackbar_message: "",
            kind_flag: false,
            time_flag: false,
        };
    },
    actions: {
        sendEmail(kind_flag: boolean | number, message: string | number, time_flag: boolean = false) {
            this.snackbar_message = typeof message === 'number' ? EMsg[message]: message;
            this.kind_flag = kind_flag;
            this.time_flag = time_flag;
            // 开启视图
            this.snackbar_switch = true;
        }
    }
})