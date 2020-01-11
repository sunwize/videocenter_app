export function kFormat(number) {
    let SI_SYMBOL = ["", "k", "M", "G", "T", "P", "E"];
    let tier = Math.log10(number) / 3 | 0;
    if(tier == 0) return number;
    let suffix = SI_SYMBOL[tier];
    let scale = Math.pow(10, tier * 3);
    let scaled = number / scale;
    return scaled.toFixed(1) + suffix;
}

export function spaceFormat(x) {
    if(x)
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    else
        return '';
}

export function decodeXML(encodedString) {
    let textArea = document.createElement('textarea');
    textArea.innerHTML = encodedString;
    return textArea.value;
}
