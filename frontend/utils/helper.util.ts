export const formattingNumber = (value: number) => {
    const formatedValue = Intl.NumberFormat('ID', {
        maximumFractionDigits: 2,
    }).format(value)
    return formatedValue
}

export function getRandomArbitrary(min: number, max: number) {
    return Math.random() * (max - min) + min;
}
