var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ui;
(function (ui) {
    var eventCore = events.EventCore.getInstance();
    var Button = (function (_super) {
        __extends(Button, _super);
        function Button() {
            var _this = this;
            _super.call(this);
            this.isSingle = true;
            this._text = "label";
            this.background = new render.Rect();
            // this.backImage=new render.Bitmap();
            //this.backImage.source="";
            this.background.width = this.width;
            this.background.height = this.height;
            this.label = new render.TextField();
            this.label.width = this.width;
            this.label.height = this.height;
            this.label.textAlign = "center";
            this.label.text = this.text;
            this.addChild(this.background);
            // this.addChild(this.backImage);
            this.addChild(this.label);
            eventCore.register(this, events.displayObjectRectHitTest, function () {
                if (_this.onClick) {
                    _this.onClick();
                    if (_this.isSingle)
                        _this.setColor(_this.background.color == "#FF0000" ? "#0000FF" : "#FF0000"); //单选
                }
            });
        }
        Object.defineProperty(Button.prototype, "text", {
            get: function () {
                return this._text;
            },
            set: function (value) {
                this._text = value;
                this.label.text = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Button.prototype, "width", {
            get: function () {
                return this._width;
            },
            set: function (value) {
                this._width = value;
                this.background.width = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Button.prototype, "height", {
            get: function () {
                return this._height;
            },
            set: function (value) {
                this._height = value;
                this.background.height = value;
            },
            enumerable: true,
            configurable: true
        });
        Button.prototype.setColor = function (value) {
            this.background.color = value;
        };
        Button.prototype.getSelf = function () {
            return this;
        };
        Button.prototype.setBackImage = function (imagePath) {
            // this.backImage=new render.Bitmap();
            //this.backImage.source=imagePath;
        };
        return Button;
    }(render.DisplayObjectContainer));
    ui.Button = Button;
})(ui || (ui = {}));
