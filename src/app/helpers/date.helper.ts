export class DateHelper {

    static invertDate(value: string, separator: string, connector: string) {
        if (value == null || value == '' || value == undefined) return ''
        const arrValue = value.split(separator);
        return arrValue[2] + connector + arrValue[1] + connector + arrValue[0];
    }

    static formatDate(value: string, connector: string = '-'): string {

        let initialDate = new Date(value);

        let year = initialDate.getFullYear().toString();
        let month = (initialDate.getMonth() + 1).toString();
        let date = initialDate.getDate().toString();

        if (parseInt(month) < 10) {
            month = '0' + month;
        }

        if (parseInt(date) < 10) {
            date = '0' + date;
        }

        return date + connector + month + connector + year;
    }

    static getCurrentFormatDate(type = 'en', connector = '-') {
        let initialDate = new Date();

        let year = initialDate.getFullYear().toString();
        let month = (initialDate.getMonth() + 1).toString();
        let date = initialDate.getDate().toString();

        if (parseInt(month) < 10) {
            month = '0' + month;
        }

        if (parseInt(date) < 10) {
            date = '0' + date;
        }

        let response = '';

        if (type === 'en') response = year + connector + month + connector + date;
        if (type === 'es') response = date + connector + month + connector + year;

        return response;
    }
}
