const toDecimal = (number: number | string) => {
    if (typeof number === 'string') number = Number(number)

    return number.toFixed(2)
}

export { toDecimal }
