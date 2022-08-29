
const { DateTime } = require("luxon");

module.exports = {
    formatDate: function (date) {
        return DateTime.fromJSDate(date).toLocaleString(DateTime.DATE_SHORT);

    },
}