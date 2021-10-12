const axios = require("axios").default;

module.exports = {
    name: 'spacedata',
    aliases: ['sd'],
    async execute(message) {
       
        let { data } = await axios.get("http://api.open-notify.org/astros.json");
        if (data.message == "success") {
            let shipData = {};
            for (person of data.people) {
                if (!shipData[person.craft]) shipData[person.craft] = 0;
                shipData[person.craft] += 1;
            }
            let finalStr = `Total of ${data.number} people in space,`;
            Object.entries(shipData).forEach(([craft, property]) => {
                finalStr += ` ${property} aboard the ${craft},`;
            });
            message.channel.send(finalStr);
    }
}
}