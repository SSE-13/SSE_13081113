var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var humanContainer = new render.DisplayObjectContainer();
//var head = new render.Bitmap();
//head.source = "wander-icon.jpg";
//humanContainer.addChild(head)
var head1 = new render.Bitmap();
head1.source = 'head.png';
humanContainer.addChild(head1);
head1.x = 90;
head1.y = 140;
var trunk = new render.Bitmap();
trunk.source = 'trunk.png';
humanContainer.addChild(trunk);
trunk.x = 63;
trunk.y = 66;
var head = new render.Bitmap();
head.source = 'head.png';
humanContainer.addChild(head);
head.x = 50;
head.y = 0;
var left_arm = new render.Bitmap();
left_arm.source = 'left_arm.png';
humanContainer.addChild(left_arm);
left_arm.x = 0;
left_arm.y = 92;
var right_arm = new render.Bitmap();
right_arm.source = 'right_arm.png';
humanContainer.addChild(right_arm);
right_arm.x = 99;
right_arm.y = 94;
var left_leg = new render.Bitmap();
left_leg.source = 'left_leg.png';
humanContainer.addChild(left_leg);
left_leg.x = 0;
left_leg.y = 190;
var right_leg = new render.Bitmap();
right_leg.source = 'right_leg.png';
humanContainer.addChild(right_leg);
right_leg.x = 91;
right_leg.y = 188;
humanContainer.scaleX = 0.5;
humanContainer.scaleY = 0.5;
humanContainer.x = 100;
humanContainer.y = 300;
var renderCore = new render.RenderCore();
//renderCore.start(humanContainer, ["wander-icon.jpg"]);
renderCore.start(humanContainer, ['head.png', 'trunk.png', 'left_arm.png', 'right_arm.png', 'left_leg.png', 'right_leg.png']);
var HumanBody = (function (_super) {
    __extends(HumanBody, _super);
    function HumanBody() {
        _super.apply(this, arguments);
        this.vx = 1;
        this.vy = 5;
        this.vr = 5;
    }
    HumanBody.prototype.onTicker = function (duringTime) {
        this.x = this.x + duringTime * this.vx;
        //this.y = this.y+duringTime*this.vy;
        this.rotation = this.rotation + duringTime * this.vr;
        var displayObject = this.displayObject;
        displayObject.x = this.x;
        displayObject.y = this.y;
        displayObject.rotation = this.rotation;
    };
    return HumanBody;
}(Body));
var ticker = new Ticker();
var body = new HumanBody(humanContainer);
ticker.start([body]);
//# sourceMappingURL=game.js.map