var path = require('path');
var fs = require('fs');

var pattern = /s([0-9]{1,3})\.{0,1}e[0-9]{1,3}/i;
var regexp = new RegExp(pattern);

var FileSystem = {
  renameDirectories: function(dir, episodes) {
    var name = episodes[0].show.title;

    files = fs.readdirSync(dir);
    files.forEach(function(file) {
      FileSystem.fileHandler(path.join(dir, file), name, episodes);
    });

    var season = FileSystem.extractSeason(dir);
    var dirname = path.dirname(dir);
    var rename = season === null ? name : name + ' - Season ' + season;

    if (rename !== path.basename(dir)) {
      rename = path.join(dirname, rename);

      if (fs.existsSync(rename)) {
        rename = rename + ' Bis';
      }

      fs.renameSync(dir, rename);
    }
  },
  fileHandler: function(filePath, name, episodes) {
    var stat = fs.statSync(filePath),
        episodes = episodes || [],
        dir = path.dirname(filePath);

    if (stat.isFile()) {
      var matches = regexp.exec(filePath);

      if (matches) {
        var episode = matches[0];
        episode = episode.replace('.', '');

        var episodeName = episodes.filter(function(element) {
          return episode === element.code;
        });

        var rename = [name, episode.toUpperCase()];

        if (episodeName.length > 0) {
          rename.push(episodeName[0].title);
        }

        rename = rename.join(' - ') + path.extname(filePath);
        rename = rename.replace(/[<>:"\/\\|?*]+/g, '');

        fs.renameSync(filePath, path.join(dir, rename));
      }
    }

    if (stat.isDirectory()) {
      FileSystem.renameDirectories(filePath, episodes);
    }
  },
  extractSeason: function(dir) {
    var seasons = {};
    var total = 0;
    var max = null;
    var seasonMax = null;

    files = fs.readdirSync(dir);

    if (files.length <= 2) {
      return null;
    }

    files.forEach(function(file) {
      var stat = fs.statSync(path.join(dir, file));

      if (stat.isFile()) {
        var matches = regexp.exec(file);

        if (matches) {
          var season = matches[1];

          if (!seasons.hasOwnProperty(season)) {
            seasons[season] = 0;
          }

          seasons[season]++;
        }
      }
    });

    for (index in seasons) {
      total += seasons[index];

      if (null === max || seasons[index] > max) {
        max = seasons[index];
        seasonMax = index;
      }
    }

    if (max === null) {
      return null;
    }

    return (max / total * 100) > 50 ? seasonMax : null;
  }
};

module.exports = FileSystem;