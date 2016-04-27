var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var editor;
(function (editor) {
    editor.GRID_PIXEL_WIDTH = 50;
    editor.GRID_PIXEL_HEIGHT = 50;
    editor.picNum = 6;
    var backList = new Array();
    var origonBackList = new Array();
    var WorldMap = (function (_super) {
        __extends(WorldMap, _super);
        function WorldMap() {
            _super.call(this);
            this.isDirty = true;
            this.cache = document.createElement("canvas");
            this.cache.width = 400;
            this.cache.height = 400;
        }
        WorldMap.prototype.render = function (context) {
            _super.prototype.render.call(this, context);
        };
        return WorldMap;
    }(render.DisplayObjectContainer));
    editor.WorldMap = WorldMap;
    var Tile = (function (_super) {
        __extends(Tile, _super);
        function Tile() {
            _super.call(this);
        }
        Tile.prototype.setWalkable = function (value) {
            this.walkAble = value == 0 ? true : false;
        };
        return Tile;
    }(render.Bitmap));
    editor.Tile = Tile;
    var ControlPanel = (function (_super) {
        __extends(ControlPanel, _super);
        // public backList;
        function ControlPanel() {
            var _this = this;
            _super.call(this);
            // this.backList=[];
            var button = new ui.Button();
            button.text = "Hello";
            button.width = 150;
            button.height = 50;
            this.addChild(button);
            button.onClick = function () {
                alert(111);
            };
            //显示行信息
            this.textRow = new render.TextField();
            this.textRow.text = "行：";
            this.textRow.width = 75;
            this.textRow.height = 50;
            this.textRow.y = 50;
            this.addChild(this.textRow);
            //显示列信息
            this.textCol = new render.TextField();
            this.textCol.text = "列：";
            this.textCol.width = 75;
            this.textCol.height = 50;
            this.textCol.x = 75;
            this.textCol.y = 50;
            this.addChild(this.textCol);
            var textWalkable = new render.TextField();
            textWalkable.text = "是否可走：";
            textWalkable.width = 100;
            textWalkable.height = 50;
            textWalkable.y = 100;
            this.addChild(textWalkable);
            //是否可走按钮
            this.buttonWalkable = new ui.Button();
            this.buttonWalkable.text = "是";
            this.buttonWalkable.width = 50;
            this.buttonWalkable.height = 50;
            this.buttonWalkable.x = 100;
            this.buttonWalkable.y = 75;
            this.addChild(this.buttonWalkable);
            this.buttonWalkable.onClick = function () {
                //alert("设为可走");
                //修改mapDate
                _this.setNowTileWalkable();
            };
            var textPic = new render.TextField();
            textPic.text = "图片素材：";
            textPic.width = 100;
            textPic.height = 50;
            textPic.y = 150;
            this.addChild(textPic);
            //素材图片和素材选择按钮
            var pic = [];
            this.buttonPic = [];
            for (var i = 0; i < editor.picNum / 3; i++) {
                pic[i] = [];
                for (var j = 0; j < 3; j++) {
                    pic[i][j] = new render.Bitmap();
                    pic[i][j].source = "pic" + (i * 3 + j + 1) + ".png";
                    console.debug(pic[i][j].source);
                    pic[i][j].width = 50;
                    pic[i][j].height = 50;
                    pic[i][j].x = 50 * j;
                    pic[i][j].y = 200 + i * 75;
                    this.addChild(pic[i][j]);
                    this.buttonPic[i * 3 + j] = new ui.Button();
                    this.buttonPic[i * 3 + j].text = "";
                    this.buttonPic[i * 3 + j].width = 50;
                    this.buttonPic[i * 3 + j].height = 25;
                    this.buttonPic[i * 3 + j].x = 50 * j;
                    this.buttonPic[i * 3 + j].y = 250 + i * 75;
                    this.addChild(this.buttonPic[i * 3 + j]);
                    this.buttonPic[i * 3 + j].onClick = function () {
                        //更换图片素材
                        _this.buttonPicListner();
                        /* for(var n=0;n<picNum;n++){
                              
                              if(this.buttonPic[n].isClick==true){
                                   picData[this.nowTile.ownedRow][this.nowTile.ownedCol]=n+1;
                                   this.nowTile.source="pic"+(n+1)+".png";
                                   break;
                              }
                         }*/
                    };
                }
            }
            //保存按钮
            var buttonSave = new ui.Button();
            buttonSave.text = "保存";
            buttonSave.isSingle = false;
            buttonSave.width = 50;
            buttonSave.height = 50;
            buttonSave.y = 375;
            this.addChild(buttonSave);
            buttonSave.onClick = function () {
                //alert("保存成功")
                //保存picData，刷新Tile
                _this.buttonSaveListner();
            };
            //撤销按钮
            var buttonBack = new ui.Button();
            buttonBack.text = "撤销";
            buttonBack.isSingle = false;
            buttonBack.width = 50;
            buttonBack.height = 50;
            buttonBack.x = 75;
            buttonBack.y = 375;
            this.addChild(buttonBack);
            buttonBack.onClick = function () {
                //alert("确定撤销？")
                //back
                _this.buttonBackListner();
            };
        }
        //是否可走按钮监听函数
        ControlPanel.prototype.setNowTileWalkable = function () {
            this.buttonWalkable.text = this.buttonWalkable.text == "是" ? "否" : "是";
            if (this.nowTile) {
                this.nowTile.walkAble = this.nowTile.walkAble == true ? false : true;
                mapData[this.nowTile.ownedRow][this.nowTile.ownedCol] = mapData[this.nowTile.ownedRow][this.nowTile.ownedCol] == 0 ? 1 : 0;
            }
        };
        //buttonPic监听函数
        ControlPanel.prototype.buttonPicListner = function () {
            for (var m = 0; m < editor.picNum; m++) {
                this.buttonPic[m].setColor("#FF0000");
                this.buttonPic[m].isClick = false;
            }
        };
        //保存（刷新Tile，没能在picButtonListner里实现)
        ControlPanel.prototype.buttonSaveListner = function () {
            for (var n = 0; n < editor.picNum; n++) {
                if (this.buttonPic[n].isClick == true) {
                    this.nowTile.source = "pic" + (n + 1) + ".png";
                    picData[this.nowTile.ownedRow][this.nowTile.ownedCol] = n + 1;
                    break;
                }
            }
            storage.saveFile();
        };
        // 撤销
        ControlPanel.prototype.buttonBackListner = function () {
            if (backList.length > 0) {
                var lastStep = backList.pop();
                var origonTile = origonBackList.pop();
                console.log(lastStep);
                console.log(origonTile);
                lastStep.walkAble = origonTile.walkAble;
                lastStep.source = origonTile.source;
                this.showTileInfo(lastStep);
                mapData[lastStep.ownedRow][lastStep.ownedCol] = lastStep.walkAble == true ? 0 : 1;
                picData[lastStep.ownedRow][lastStep.ownedCol] = lastStep.source.charCodeAt(3) - 48;
            }
            else {
                console.log("No More Step to Go Back");
            }
        };
        //初始化编辑菜单
        ControlPanel.prototype.setControlPanel = function (tile) {
            this.nowTile = tile;
            console.log(tile);
            var newTile = new editor.Tile();
            newTile.walkAble = tile.walkAble;
            newTile.source = tile.source;
            origonBackList.push(newTile);
            backList.push(tile);
            this.showTileInfo(tile);
            //console.log(this.nowTile)
            for (var m = 0; m < editor.picNum; m++) {
                this.buttonPic[m].isClick = false;
            }
        };
        //显示当前Tile信息
        ControlPanel.prototype.showTileInfo = function (tile) {
            this.textRow.text = "行：" + (tile.ownedRow + 1);
            this.textCol.text = "列：" + (tile.ownedCol + 1);
            this.buttonWalkable.text = tile.walkAble == true ? "是" : "否";
            this.buttonWalkable.setColor(tile.walkAble == true ? "#FF0000" : "#0000FF");
            for (var i = 0; i < editor.picNum; i++) {
                this.buttonPic[i].setColor("#FF0000");
            }
            if (tile.source.charCodeAt(3) - 48 != 0) {
                console.log(tile.source.charCodeAt(3) - 49);
                this.buttonPic[tile.source.charCodeAt(3) - 49].setColor("#0000FF");
            }
        };
        return ControlPanel;
    }(render.DisplayObjectContainer));
    editor.ControlPanel = ControlPanel;
})(editor || (editor = {}));
