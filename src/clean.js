const discord = require("discord.js")
const { logError, logSuccess, log, logWarn } = require("./logger")

const token = require("../token.json").token

const client = new discord.Client({intents: []})

client.login(token)
    .then(() => {
        logSuccess("Logged in as " + client.user.tag)
    })
    .catch((error) => {
        logError(error)
    })

client.once("ready", async () => {
    const commands = await client.application.commands.fetch()

    if(commands.size === 0) { 
        log("No commands found.")
        client.destroy()
        return
    }

    log(`Found ${commands.size} commands. Deleting in 5 seconds, press CTRL+C to cancel.`)

    await new Promise((resolve) => setTimeout(resolve, 5000))

    let errorsCount = 0
    let errorsContent = []

    for(const command of commands.values()) {
        log(`Trying to delete command ${command.name} (${command.id})...`)

        await command.delete()
            .then(() => {
                logSuccess(`Deleted command ${command.name} (${command.id})`)
            })
            .catch((err) => {
                errorsCount++
                errorsContent.push(err)

                logError(`Failed to delete command ${command.name} (${command.id})`)
            })
    }

    if(errorsCount === commands.size) {
        logError("Failed to delete all commands")
        
        printErrors(errorsContent)
    } else if(errorsCount > 0) {
        logWarn(`Deleted ${commands.size - errorsCount} out of ${commands.size} commands`)

        printErrors(errorsContent)
    } else {
        logSuccess(`Deleted ${commands.size} commands successfully`)
    }

    client.destroy()
})

function printErrors(errors) {
    for(let i = 0; i < errors.length; i++) {
        logError(`Error ${i + 1}: ${errors[i]}`)
    }
}