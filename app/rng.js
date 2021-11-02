function randomCreditPass(min = 50, max = 10000) {
    const maxNum = Math.floor(max)
    const minNum = Math.floor(min)
    const rand = Math.floor(Math.random() * (maxNum - minNum) + minNum)
    return `Great Work Citizen! Your Social Credit Score has Increased by ${rand}! Keep up the good work!`
}

function randomCreditFail(min = 50, max = 10000) {
    const maxNum = Math.floor(max)
    const minNum = Math.floor(min)
    const rand = Math.floor(Math.random() * (maxNum - minNum) + minNum)
    return `Bad Work Citizen! Your Social Credit Score has Decreased by ${rand}. Behave or you'll be sent to re-education camps!`
}

function rngLuck() {
    function random() {
        return Math.random() < 0.5
    }
    const rng = random()
    if (!rng) {
        return randomCreditFail()
    } else {
        return randomCreditPass()
    }
}

exports.rngLuck = rngLuck