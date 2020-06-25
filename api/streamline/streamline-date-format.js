const formatDate = require('date-fns/format');

module.exports = date => formatDate(date, 'MM/DD/YYYY');
