
var humanContainer = new render.DisplayObjectContainer();

var head = new render.Bitmap();
head.source = 'head.png';
humanContainer.addChild(head)
head.x=0;
head.y=-95;

var trunk = new render.Bitmap();
trunk.source = 'trunk.png';
humanContainer.addChild(trunk)
trunk.x=13;
trunk.y=-30;

var left_arm = new render.Bitmap();
left_arm.source = 'left_arm.png';
humanContainer.addChild(left_arm)
left_arm.x=-50;
left_arm.y=0;

var right_arm = new render.Bitmap();
right_arm.source = 'right_arm.png';
humanContainer.addChild(right_arm)
right_arm.x=45;
right_arm.y=0;

var left_leg = new render.Bitmap();
left_leg.source = 'left_leg.png';
humanContainer.addChild(left_leg)
left_leg.x=-50;
left_leg.y=100;

var right_leg = new render.Bitmap();
right_leg.source = 'right_leg.png';
humanContainer.addChild(right_leg)
right_leg.x=40;
right_leg.y=100;



humanContainer.scaleX=0.5;
humanContainer.scaleY=0.5;
humanContainer.globalMatrix
humanContainer.x=100;
humanContainer.y=300;


var renderCore = new render.RenderCore();
renderCore.start(humanContainer, ['head.png','trunk.png','left_arm.png','right_arm.png','left_leg.png','right_leg.png']);

var VX;
var VR;
class HumanBody extends Body {
    
    
    vx:number = 5;
    vr:number = 5;

    onTicker(duringTime: number) {
        this.x+=duringTime*this.vx;
        this.rotation +=duringTime*this.vr;
    }
}

var ticker = new Ticker();
var body = new HumanBody(humanContainer);
ticker.start([body]);


var eventCore = new events.EventCore();
eventCore.init();

var headHitTest = (localPoint:math.Point,displayObject:render.DisplayObject) =>{
    //alert (`点击位置为${localPoint.x},${localPoint.y}`);
   // console.log(localPoint.x);
   //  console.log(localPoint.y);
   var headClicked=false;
    if(localPoint.x>0 &&localPoint.x<90 && localPoint.y>0 && localPoint.y<90){
         headClicked=true;
    }
    return headClicked; 
}

var headOnClick = () => {
   // alert("clicked!!");
    //修改 HumanBody 的速度，使其反向移动
    if(headHitTest){
        if(body.vx==0){
            body.vx=VX;
            body.vr=VR;
        }else{
            body.vx*=-1;
            body.vr*=-1; 
        }
       
        
    }
}



var left_legHitTest = (localPoint:math.Point,displayObject:render.DisplayObject) =>{
     console.log(localPoint.x);
     console.log(localPoint.y);
     var left_legClicked=false;
     if(localPoint.x>0 && localPoint.x<80 && localPoint.y>0 && localPoint.y<89){
        left_legClicked=true;
    }
    return left_legClicked;
}

var left_legOnClick = () => {
   if(left_legHitTest){
        VX=body.vx;
        VR=body.vr;
        body.vx=0;
        body.vr=0;
        body.rotation=0;
    }
}




var right_legHitTest = (localPoint:math.Point,displayObject:render.DisplayObject) =>{
    var right_legClicked=false;
     if(localPoint.x>0 && localPoint.x<88 && localPoint.y>0 && localPoint.y<88){
        right_legClicked=true;
    }
    return right_legClicked;
}

var right_legOnClick = () => {
    if(right_legHitTest){
        VX=body.vx;
        VR=body.vr;
        body.vx=0;
        body.vr=0;
        body.rotation=0;
    }
}

eventCore.register(head,headHitTest,headOnClick);
eventCore.register(left_leg,left_legHitTest,left_legOnClick);
eventCore.register(right_leg,right_legHitTest,right_legOnClick);








