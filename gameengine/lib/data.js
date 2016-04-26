var fs = require("fs");
var data;
(function (data) {
    var Storage = (function () {
        function Storage() {
        }
        Storage.getInstance = function () {
            if (Storage._instance == null) {
                Storage._instance = new Storage();
            }
            return Storage._instance;
        };
        Storage.prototype.readFile = function () {
            var map_path = __dirname + "/map.json";
            var content = fs.readFileSync(map_path, "utf-8");
            var obj = JSON.parse(content);
            this.mapData = obj.map;
            this.picData = obj.pic;
        };
        Storage.prototype.saveFile = function () {
            var map_path = __dirname + "/map.json";
            var content = fs.readFileSync(map_path, "utf-8");
            var obj = JSON.parse(content);
            obj.map = mapData;
            obj.pic = picData;
            fs.writeFileSync(map_path, JSON.stringify(obj), "utf-8");
        };
        return Storage;
    }());
    data.Storage = Storage;
})(data || (data = {}));
