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
    const guildsSize = client.guilds.cache.size
    const botId = client.user.id
    const tag = client.user.tag

    const commands = await client.application.commands.fetch()

    log("Bot information:")
    log(`  Name: ${tag}`)
    log(`  ID: ${botId}`)
    log(`  Guilds: ${guildsSize}`)
    log(`  Commands: ${commands.size}`)

    if(commands.size != 0) {
        log("Commands list:")

        for(const command of commands.values()) {
            log(`  Name: ${command.name} (ID: ${command.id})`)
        }
    }

    logWarn("Please verify that this is the correct bot before proceeding with any actions.")
    client.destroy()
})