function formatNumber(num) {
    // Convert the number to a string
    const strNum = num.toString();
    
    // Check if the number has a decimal part
    if (strNum.includes('.')) {
        // Split the number into integer and decimal parts
        const [integerPart, decimalPart] = strNum.split('.');
        
        // Trim trailing zeros from the decimal part
        const trimmedDecimalPart = decimalPart.replace(/0+$/, '');

        // If the trimmed decimal part is not empty, return the formatted number
        return trimmedDecimalPart.length > 0 ? `${integerPart}.${trimmedDecimalPart}` : integerPart;
    }
    
    // If there's no decimal part, return the integer part
    return strNum;
}

export default formatNumber