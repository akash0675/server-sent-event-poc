const fs = require('fs');
const path = require('path');
const uuid = require('uuid');

function getDirTree(filename) {
  var stats = fs.lstatSync(filename);
  var info = {
    filepath: filename,
    label: path.basename(filename),
    
  };

  if (stats.isDirectory()) {
    info.id = uuid.v4();
    info.type = "folder";
    info.icon = "folder-close";
    info.isExpanded = false;
    info.hasCaret = true;
    info.childNodes = fs.readdirSync(filename).map(function(child) {
      return getDirTree(filename + '/' + child);
    });
  } else {
    info.type = "file";
    info.icon = "document";
  }

  return info;
}

module.exports = {
  getDirTree: getDirTree
}