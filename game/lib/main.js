function createMapEditor() {
    var world = new editor.WorldMap();
    var rows = mapData.length;
    var cols = mapData[0].length;
    for (var col = 0; col < rows; col++) {
        for (var row = 0; row < cols; row++) {
            var tile = new editor.Tile();
            // tile.setWalkable(mapData[row][col]);
            tile.source = "pic" + picData[row][col] + ".png";
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
function onTileClick(tile) {
    console.log(tile);
}
var storage = data.Storage.getInstance();
storage.readFile(readSuccess);
var mapEditor;
var mapData;
var picData;
var readSuccess = function () {
    mapData = storage.mapData;
    picData = storage.picData;
    mapEditor = createMapEditor();
    stage.addChild(mapEditor);
    //初始化人物
};
var renderCore = new render.RenderCore();
var eventCore = events.EventCore.getInstance();
eventCore.init();
var stage = new render.DisplayObjectContainer();
renderCore.start(stage, ['pic1.png', 'pic2.png', 'pic3.png', 'pic4.png', 'pic5.png', 'pic6.png', 'pic7.png', 'pic8.png']);
