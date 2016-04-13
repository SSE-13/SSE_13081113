"use strict";
const fs = require('fs');
function readFile() {
    var map_path = __dirname + "/map.json";
    var content = fs.readFileSync(map_path, "utf-8");
    var obj = JSON.parse(content);
    var mapData = obj.map;
    return mapData;
}
function writeFile() {
    var map_path = __dirname + "/map.json";
    var content = fs.readFileSync(map_path, "utf-8");
    var obj = JSON.parse(content);
    obj.map = mapData;
    fs.writeFileSync(map_path, JSON.stringify(obj), "utf-8");
    //  return true;
}
function createMapEditor() {
    var world = new editor.WorldMap();
    var rows = mapData.length;
    var cols = mapData[0].length;
    for (var col = 0; col < rows; col++) {
        for (var row = 0; row < cols; row++) {
            var tile = new editor.Tile();
            tile.setWalkable(mapData[row][col]);
            tile.x = col * editor.GRID_PIXEL_WIDTH;
            tile.y = row * editor.GRID_PIXEL_HEIGHT;
            tile.ownedCol = col;
            tile.ownedRow = row;
            tile.width = editor.GRID_PIXEL_WIDTH;
            tile.height = editor.GRID_PIXEL_HEIGHT;
            world.addChild(tile);
            eventCore.register(tile, events.displayObjectRectHitTest, onTileClick);
        }
    }
    return world;
}
var backList = new Array();
function onTileClick(tile) {
    console.log(tile);
    backList.push(tile);
    if (tile.color == "#0000FF") {
        mapData[tile.ownedCol][tile.ownedRow] = 0;
        console.log("red");
    }
    else {
        mapData[tile.ownedCol][tile.ownedRow] = 1;
        console.log("blue");
    }
}
var saveOnClick = () => {
    writeFile();
    console.log("save");
};
var backOnClick = () => {
    if (backList.length > 0) {
        var lastStep = backList.pop();
        console.log(lastStep);
        if (lastStep.color == "#0000FF") {
            mapData[lastStep.ownedCol][lastStep.ownedRow] = 1;
        }
        else {
            mapData[lastStep.ownedCol][lastStep.ownedRow] = 0;
        }
        writeFile();
        console.log("back");
    }
    else {
        console.log("No More Step to Go Back");
    }
};
//mapData[0][0]=1;
//writeFile(mapData);
var renderCore = new render.RenderCore();
var eventCore = new events.EventCore();
eventCore.init();
var humanContainer = new render.DisplayObjectContainer();
var mapData = readFile();
var editor = createMapEditor();
humanContainer.addChild(editor);
var saveButton = new render.Bitmap();
saveButton.source = 'save.png';
humanContainer.addChild(saveButton);
saveButton.x = 25;
saveButton.y = 225;
var backButton = new render.Bitmap();
backButton.source = 'back.png';
humanContainer.addChild(backButton);
backButton.x = 125;
backButton.y = 225;
renderCore.start(humanContainer, ['save.png', 'back.png']);
eventCore.register(saveButton, events.displayObjectRectHitTest, saveOnClick);
eventCore.register(backButton, events.displayObjectRectHitTest, backOnClick);
