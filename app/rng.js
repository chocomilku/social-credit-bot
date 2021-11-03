function constructMessage(win = false, amount = 50) {
    if (win) {
        return {
            "win": win,
            "message": `Great Work Citizen! Your Social Credit Score has Increased by ${amount}! Keep up the good work!`
        }
    } else if (!win) {
        return {
            "win": win,
            "message":`Bad Work Citizen! Your Social Credit Score has Decreased by ${amount}. Behave or you'll be sent to re-education camps!`
        }
    }
}

function randomCreditPass(min = 10, max = 1000000) {
    const maxNum = Math.floor(max)
    const minNum = Math.floor(min)
    const rand = Math.floor(Math.random() * (maxNum - minNum) + minNum)
    return constructMessage(true, rand)
}

function randomCreditFail(min = 1, max = 1000000) {
    const maxNum = Math.floor(max)
    const minNum = Math.floor(min)
    const rand = Math.floor(Math.random() * (maxNum - minNum) + minNum)
    return constructMessage(false, rand)
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