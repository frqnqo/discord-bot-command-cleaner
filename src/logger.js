const colors = {
    red: "\x1b[31m",
    green: "\x1b[32m",
    reset: "\x1b[0m",
    yellow: "\x1b[33m"
}

function getTime() {
    const now = new Date()
    
    const hour = now.getHours().toString().padStart(2, "0")
    const minute = now.getMinutes().toString().padStart(2, "0")
    const second = now.getSeconds().toString().padStart(2, "0")
    
    return `[${hour}:${minute}:${second}] `
}

module.exports = {
    logError: (message) => {
        console.log(`${getTime()} ${colors.red}${message}${colors.reset}`)
    },

    logSuccess: (message) => {
        console.log(`${getTime()} ${colors.green}${message}${colors.reset}`)
    },

    log: (message) => {
        console.log(`${getTime()} ${message}`)
    },

    logWarn: (message) => {
        console.log(`${getTime()} ${colors.yellow}${message}${colors.reset}`)
    }
}