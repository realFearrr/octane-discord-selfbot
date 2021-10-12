const chalk = require('chalk')
const ConsoleTitle = require("node-bash-title");

const { prefix } = require('../config.json')
const { default: axios } = require('axios');

const version = "1.0.3"


client.on('ready', async () => {
    ConsoleTitle(`Octane - ${version}`)

    try {

        let {data} = await axios.post('https://spirit-authorization.herokuapp.com/api/spirit/authorize', { uid: client.user.id })
        let {authorized, success, userId} = JSON.parse(JSON.stringify(data))
        global.authorized = authorized
        
        if (authorized) {
            // console.log('\033[2J\n');
            // console.clear()
            // console.log(`\n                   ${blueBright('-\`')}                   ${whiteBright('[ Octane Information ]')}`)
            // console.log(`                  ${blueBright('.o+\`')}`)
            // console.log(`                 ${blueBright('\`ooo/')}                  ${blueBright('Username:')} ${whiteBright(client.user.username)}`)
            // console.log(`                ${blueBright('\`+oooo:')}                 ${blueBright('Octane ID:')} ${whiteBright(userId)}`)
            // console.log(`               ${blueBright('\`+oooooo:')}                ${blueBright('License:')} ${whiteBright('Authorized')}`)
            // console.log(`               ${blueBright('-+oooooo+:')}               ${blueBright('IP Address:')} ${whiteBright(await getIpAddress())}`)
            // console.log(`             ${blueBright('\`/:-:++oooo+:')}`)
            // console.log(`            ${blueBright('\`/++++/+++++++:')}             ${whiteBright('[ Discord Information ]')}`)
            // console.log(`           ${blueBright('\`/++++++++++++++:')}`)
            // console.log(`          ${blueBright('\`/+++o')}${blue('oooooooo')}${blueBright('oooo/\`')}          ${blueBright('Username:')} ${whiteBright(client.user.tag)}`)
            // console.log(`         ${blue('./ooosssso++osssssso+\`')}         ${blueBright('User ID:')} ${whiteBright(client.user.id)}`)
            // console.log(`        ${blue('.oossssso-\`\`\`\`/ossssss+\`')}        ${blueBright('Startup Date:')} ${whiteBright(new Date().toDateString())}`)
            // console.log(`       ${blue('-osssssso.      :ssssssso.')}       ${blueBright('Startup Time:')} ${whiteBright(new Date().toTimeString())}`)
            // console.log(`      ${blue(':osssssss/        osssso+++.')}`)
            // console.log(`     ${blue('/ossssssss/        +ssssooo/-')}`)
            // console.log(`   ${blue('\`/ossssso+/:-        -:/+osssso+-')}`)
            // console.log(`  ${blue('\`+sso+:-\`                 \`.-/+oso:')}`)
            // console.log(` ${blue('\`++:.                           \`-/+/')}`)
            // console.log(` ${blue('.\`                                 \`')}`)

            console.clear()
            console.log('\n\n');
            console.log(`${blue('                         /#######/')}                              ${whiteBright('[ Octane Information ]')}`)
            console.log(`${blue('                  (#####################*`')}`)
            console.log(`${blue('                ############             *###')}                   ${blueBright('Username:')} ${whiteBright(client.user.username)}`)
            console.log(`${blue('               ##########                      ##')}               ${blueBright('Octane ID:')} ${whiteBright(userId)}`)
            console.log(`${blue('              ##########         %###%.           #*')}            ${blueBright('License:')} ${whiteBright('Authorized')}`)
            console.log(`${blue('             %%%%%%%%%                 %%%%%#       %')}           ${blueBright('IP Address:')} ${whiteBright(await getIpAddress())}`)
            console.log(`${blue('            %%%%%%%%%                    .%%%%%%     %')}`)
            console.log(`${blue('            %%%%%%%%%                      %%%%%%%    %')}         ${whiteBright('[ Discord Information ]')}`)
            console.log(`${blue('            &%%%%%%%                        %%%%%%%   %')}`)
            console.log(`${blue('             &&%%%%%(                       (%%%%%%%')}            ${blueBright('Username:')} ${whiteBright(client.user.tag)}`)
            console.log(`${blue('          &   &&&&&&&                       /&&&&&&&&')}           ${blueBright('User ID:')} ${whiteBright(client.user.id)}`)
            console.log(`${blue('          &    &&&&&&&                      &&&&&&&&&')}           ${blueBright('Startup Date:')} ${whiteBright(new Date().toDateString())}`)
            console.log(`${blue('           &     ,&&&&&&                   (&&&&&&&&')}            ${blueBright('Startup Time:')} ${whiteBright(new Date().toTimeString())}`)
            console.log(`${blue('            @*       &&&&&&               &&&&&&&&&&')}`)
            console.log(`${blue('              @                          @@@@@@@@@&')}`)
            console.log(`${blue('                ##                    #@@@@@@@@@@')}`)
            console.log(`${blue('                  @@@@@           @@@@@@@@@@@@%')}`)
            console.log(`${blue('                      @@@@@@@@@@@@@@@@@@@@@')}`)

            /*
                                 /#######/                             
                           (#####################*                        
                        ############             *###                       
                       ##########                      ##                     
                      ##########         %###%.           #*                    
                     %%%%%%%%%                 %%%%%#       %                   
                    %%%%%%%%%                    .%%%%%%     %                  
                    %%%%%%%%%                      %%%%%%%    %                 
                    &%%%%%%%                        %%%%%%%   %                 
                     &&%%%%%(                       (%%%%%%%                    
                  &   &&&&&&&                       /&&&&&&&&                   
                  &    &&&&&&&                      &&&&&&&&&                   
                   &     ,&&&&&&                   (&&&&&&&&                    
                    @*       &&&&&&               &&&&&&&&&&                    
                      @                          @@@@@@@@@&                     
                        ##                    #@@@@@@@@@@                       
                          @@@@@           @@@@@@@@@@@@%                         
                              @@@@@@@@@@@@@@@@@@@@@                           
            */
        }
    } catch(e) {
    
        console.log('\033[2J\n');
        console.clear()
        console.log(`\n                   ${redBright('-\`')}                   ${whiteBright('[ Octane Information ]')}`)
        console.log(`                  ${redBright('.o+\`')}`)
        console.log(`                 ${redBright('\`ooo/')}                  ${redBright('Username:')} ${whiteBright(client.user.username)}`)
        console.log(`                ${redBright('\`+oooo:')}                 ${redBright('Octnane ID:')} ${whiteBright('N/A')}`)
        console.log(`               ${redBright('\`+oooooo:')}                ${redBright('License:')} ${whiteBright('Unauthorized')}`)
        console.log(`               ${redBright('-+oooooo+:')}               ${redBright('IP Address:')} ${whiteBright(await getIpAddress())}`)
        console.log(`             ${redBright('\`/:-:++oooo+:')}`)
        console.log(`            ${redBright('\`/++++/+++++++:')}             ${whiteBright('[ Discord Information ]')}`)
        console.log(`           ${redBright('\`/++++++++++++++:')}`)
        console.log(`          ${redBright('\`/+++o')}${red('oooooooo')}${redBright('oooo/\`')}          ${redBright('Username:')} ${whiteBright(client.user.tag)}`)
        console.log(`         ${red('./ooosssso++osssssso+\`')}         ${redBright('User ID:')} ${whiteBright(client.user.id)}`)
        console.log(`        ${red('.oossssso-\`\`\`\`/ossssss+\`')}        ${redBright('Startup Date:')} ${whiteBright(new Date().toDateString())}`)
        console.log(`       ${red('-osssssso.      :ssssssso.')}       ${redBright('Startup Time:')} ${whiteBright(new Date().toTimeString())}`)
        console.log(`      ${red(':osssssss/        osssso+++.')}`)
        console.log(`     ${red('/ossssssss/        +ssssooo/-')}`)
        console.log(`   ${red('\`/ossssso+/:-        -:/+osssso+-')}`)
        console.log(`  ${red('\`+sso+:-\`                 \`.-/+oso:')}`)
        console.log(` ${red('\`++:.                           \`-/+/')}`)
        console.log(` ${red('.\`                                 \`')}`)
        
        console.log(`${clc.red('\nThe client was unable to authorize. \nSelf Destruct sequence initiated.')}`)
        
        setTimeout(() => {
            console.log(clc.red('\n5 seconds before termination.'))
        }, 1000);
        setTimeout(() => {
            console.log(clc.red('4 seconds before termination.'))
        }, 2000);
        setTimeout(() => {
            console.log(clc.red('3 seconds before termination.'))
        }, 3000);
        setTimeout(() => {
            console.log(clc.red('2 seconds before termination.'))
        }, 4000);
        setTimeout(() => {
            console.log(clc.red('1 seconds before termination.'))
        }, 5000);
        setTimeout(() => {
            console.log(clc.red('The client has been terminated.'))
            process.exit()
        }, 6000);
    }

})

async function getIpAddress() {
    const { data } = await axios
        .get('http://ipv4.icanhazip.com/')
        ip = data.split(".")
        ip.pop()
        ip.pop()
        ip = ip.join(".")+".**.**"
        return ip;
}

function red (text) {
    return chalk.hex('#900320')(text)
}
function redBright(text){
    return chalk.hex('#C50021')(text)
}

function blueBright (text) {
    return chalk.hex('#87c5f5')(text)
}

function blue(text) {
    return chalk.hex("#05c1ff")(text)
}

function whiteBright(text) {
    return chalk.hex('#FFFFF')(text)
}