

function createMapEditor() {
    var world = new editor.WorldMap();
    var rows = mapData.length;
    var cols = mapData[0].length;

    for (var col = 0; col < rows; col++) {
        for (var row = 0; row < cols; row++) {
            var tile = new editor.Tile();
           // tile.setWalkable(mapData[row][col]);
            tile.source="pic"+picData[row][col]+".png";
            tile.x = col * editor.GRID_PIXEL_WIDTH;
            tile.y = row * editor.GRID_PIXEL_HEIGHT
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



function onTileClick(tile: editor.Tile) {
    console.log(tile);
    //人物移动。。。。。。。。。。。。。。
    body.run(mapEditor.grid,nowPostion,tile);
}

var nowPostion=new editor.Tile();


var mapEditor;
var mapData;
var picData;
var boyShape:editor.BoyShape;
var body:editor.BoyBody;

var storage = data.Storage.getInstance();
storage.readFile(readSuccess);


var readSuccess = ()=> {
   
    mapData = storage.mapData;
    picData=storage.picData;
    mapEditor = createMapEditor();
    stage.addChild(mapEditor);
   
    //初始化人物
    boyShape = new editor.BoyShape();
    body = new editor.BoyBody(boyShape);
    body.x = 350;
    body.y = 350;
    nowPostion.ownedCol=7;
    nowPostion.ownedRow=7;
    stage.addChild(boyShape);
    
    
} 

var renderCore = new render.RenderCore();
var eventCore = events.EventCore.getInstance();
eventCore.init();



var stage = new render.DisplayObjectContainer();

renderCore.start(stage,['pic1.png','pic2.png','pic3.png','pic4.png','pic5.png','pic6.png','pic7.png','pic8.png']);

var ticker = new Ticker();
ticker.start([body]);