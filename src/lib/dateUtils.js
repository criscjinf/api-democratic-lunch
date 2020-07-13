export default class DateUtils {
    static formatDateBr(date) {
        let day = date.getDate().toString().padStart(2, '0');
        let month  = (date.getMonth()+1).toString().padStart(2, '0');
        let year  = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

}