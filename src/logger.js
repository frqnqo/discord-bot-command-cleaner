const colors = {
    red: "\x1b[31m",
    green: "\x1b[32m",
    reset: "\x1b[0m",
    yellow: "\x1b[33m"
}

function getDateTime() {
    const now = new Date()
    
    const hour = now.getHours().toString().padStart(2, "0")
    const minute = now.getMinutes().toString().padStart(2, "0")
    const second = now.getSeconds().toString().padStart(2, "0")
    
    return `[${hour}:${minute}:${second}] `
}

module.exports = {
    logError: (message) => {
        console.log(`${getDateTime()} ${colors.red}${message}${colors.reset}`)
    },

    logSuccess: (message) => {
        console.log(`${getDateTime()} ${colors.green}${message}${colors.reset}`)
    },

    log: (message) => {
        console.log(`${getDateTime()} ${message}`)
    },

    logWarn: (message) => {
        console.log(`${getDateTime()} ${colors.yellow}${message}${colors.reset}`)
    }
}