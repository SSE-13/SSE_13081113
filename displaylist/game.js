var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var humanContainer = new render.DisplayObjectContainer();
var head = new render.Bitmap();
head.source = 'head.png';
humanContainer.addChild(head);
head.x = 0;
head.y = -95;
var trunk = new render.Bitmap();
trunk.source = 'trunk.png';
humanContainer.addChild(trunk);
trunk.x = 13;
trunk.y = -30;
var left_arm = new render.Bitmap();
left_arm.source = 'left_arm.png';
humanContainer.addChild(left_arm);
left_arm.x = -50;
left_arm.y = 0;
var right_arm = new render.Bitmap();
right_arm.source = 'right_arm.png';
humanContainer.addChild(right_arm);
right_arm.x = 45;
right_arm.y = 0;
var left_leg = new render.Bitmap();
left_leg.source = 'left_leg.png';
humanContainer.addChild(left_leg);
left_leg.x = -50;
left_leg.y = 100;
var right_leg = new render.Bitmap();
right_leg.source = 'right_leg.png';
humanContainer.addChild(right_leg);
right_leg.x = 40;
right_leg.y = 100;
humanContainer.scaleX = 0.5;
humanContainer.scaleY = 0.5;
humanContainer.globalMatrix;
humanContainer.x = 200;
humanContainer.y = 300;
//humanContainer.globalMatrix.tx=50;
console.log(humanContainer.globalMatrix);
var renderCore = new render.RenderCore();
//renderCore.start(humanContainer, ["wander-icon.jpg"]);
renderCore.start(humanContainer, ['head.png', 'trunk.png', 'left_arm.png', 'right_arm.png', 'left_leg.png', 'right_leg.png']);
var HumanBody = (function (_super) {
    __extends(HumanBody, _super);
    function HumanBody() {
        _super.apply(this, arguments);
        this.vx = 5;
        this.vr = 5;
    }
    HumanBody.prototype.onTicker = function (duringTime) {
        this.x += duringTime * this.vx;
        this.rotation += duringTime * this.vr;
    };
    return HumanBody;
}(Body));
var ticker = new Ticker();
var body = new HumanBody(humanContainer);
ticker.start([body]);
//# sourceMappingURL=game.js.map