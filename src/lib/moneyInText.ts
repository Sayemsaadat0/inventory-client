export const moneyInText = (num : number) => {
    if (num === 0) return "Zero";

    const ones = [
        "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
        "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen",
        "Seventeen", "Eighteen", "Nineteen"
    ];

    const tens = [
        "", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"
    ];

    const thousands = ["", "Thousand", "Lakh", "Crore"];

    let word = "";

    const getHundreds = (n : any) => {
        let result = "";
        if (n >= 100) {
            result += ones[Math.floor(n / 100)] + " Hundred ";
            n %= 100;
        }
        if (n >= 20) {
            result += tens[Math.floor(n / 10)] + " ";
            n %= 10;
        }
        if (n > 0) {
            result += ones[n] + " ";
        }
        return result.trim();
    };

    // Process crores
    if (num >= 10000000) {
        word += getHundreds(Math.floor(num / 10000000)) + " " + thousands[3] + " ";
        num %= 10000000;
    }

    // Process lakhs
    if (num >= 100000) {
        word += getHundreds(Math.floor(num / 100000)) + " " + thousands[2] + " ";
        num %= 100000;
    }

    // Process thousands
    if (num >= 1000) {
        word += getHundreds(Math.floor(num / 1000)) + " " + thousands[1] + " ";
        num %= 1000;
    }

    // Process hundreds
    word += getHundreds(num);

    return word.trim();
}