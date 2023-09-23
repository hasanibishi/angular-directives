export class Utility {
    static formatNumberViaLocale(value: number, locale: string) {
        const strValue = value.toString();

        if (locale === 'de-DE') {
            return Number(strValue.replace(/[.,]/g, x => x === '.' ? ',' : '.').replace(/,/g, ''));
        }
        else {
            return Number(strValue.replace(/,/g, ''));
        }
    }
}