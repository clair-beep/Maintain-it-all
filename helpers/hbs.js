
const { DateTime } = require("luxon");

module.exports = {
    formatDate: function (date, format) {
        return DateTime.fromJSDate(date)
    },
    }