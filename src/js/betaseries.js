var url = require('url');
var https = require('https');
var CONSTANTS = require('./constants');

var Betaseries = {
  getEndpoint: function(path, query) {
    var query = query || {};
    query.key = CONSTANTS.BETASERIES_KEY;

    return url.format({
      protocol: 'https',
      host: CONSTANTS.BETASERIES_HOST,
      pathname: path,
      query: query
    });
  },
  getShows: function getShows() {
    return new Promise(function(resolve, reject) {

      var endpoint = Betaseries.getEndpoint('/shows/list');

      https.get(endpoint, function(response) {

        var body = '';

        response.on('data', function(data) {
          body += data;
        });

        response.on('end', function() {
          var json = JSON.parse(body).shows;

          shows = json.map(function(element) {
            return {
              id: element.id,
              title: element.title
            };
          });

          resolve(shows);
        });
      });
    });
  },
  getShow: function(showId) {
    return new Promise(function(resolve, reject) {
      var endpoint = Betaseries.getEndpoint('/shows/display', {id: showId});

      https.get(endpoint, function(response) {
        var body = '';

        response.on('data', function(data) {
          body += data;
        });

        response.on('end', function() {
          var show = JSON.parse(body).show;
          
          resolve(show);
        });
      });
    });
  }
};

module.exports = Betaseries;