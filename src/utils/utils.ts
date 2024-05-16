// date format
export const DateFormat = (date: string, fmt: string): string => {
    if (date && fmt) {
        const _date = new Date(date);
        const o = {
            'M+': _date.getMonth() + 1, //month
            'd+': _date.getDate(), //day
            'h+': _date.getHours(), //hour
            'm+': _date.getMinutes(), //min
            's+': _date.getSeconds(), //second
            'q+': Math.floor((_date.getMonth() + 3) / 3), //qiarter
            S: _date.getMilliseconds(), //mill seconds
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (_date.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        for (const k in o) {
            if (new RegExp('(' + k + ')').test(fmt)) {
                fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? (o as any)[k] : ('00' + (o as any)[k]).substr(('' + (o as any)[k]).length));
            }
        }
        return fmt;
    } else {
        return '';
    }
};