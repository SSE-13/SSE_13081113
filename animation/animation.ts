/**
 * 重力加速度
 */
var GRAVITY = 9.8;



var maxVx=0;


const BOUNDS_BOTTOM = 400;

const BOUNDS_LEFT = 0;

const BOUNDS_RIGHT = 400;

const BOUNCE = 0.95;

/**
 * 计时器系统
 */
class Ticker {

    bodyQueue = [];

    lastTime;

    /**
     * 启动计时器
     * @param bodyList 物理队列
     */
    start(bodyQueue) {
        this.bodyQueue = bodyQueue;
        this.lastTime = Date.now();
        var self = this;
        setInterval(this.onTicker.bind(this), 1000 / 60);
    }

    onTicker() {
        var currentTime = Date.now();
        var duringTime = currentTime - this.lastTime;
        this.lastTime = currentTime;
        this.bodyQueue.map(function(body) {
            body.onTicker(duringTime / 100)
        });
    }
}


class Body {

    vx =0;
    vy = 0;
    x = 0;
    y = 0;
    width = 0;
    height = 0;
    
     
    

    displayObject;

    constructor(displayObject: DisplayObject) {
        this.displayObject = displayObject;
    }

    public onTicker(duringTime) {
        
        
        if(maxVx <this.vx){
            maxVx=this.vx;
        }

        this.vy += duringTime * GRAVITY;
       /* if( this.y  = BOUNDS_BOTTOM-this.height){
                 this.vx += duringTime * a;
        }*/
        this.x += duringTime * this.vx;
        this.y += duringTime * this.vy;
        
        if(Math.abs(this.vx)<maxVx*0.1){
         
            this.vx=0;
            GRAVITY=0;
            this.vy=0;
            
        }
         //if(Math.abs(this.y)<0.5){
          // GRAVITY=0;
          // this.vy=0;
      //  }

        //反弹
        if (this.y + this.height > BOUNDS_BOTTOM) {
           this.y  = BOUNDS_BOTTOM-this.height;
           this.vy = -BOUNCE * this.vy;
           
           this.vx = this.vx * BOUNCE  ;
        }
        
        if (this.y  < 0 ) {
           this.y  = 0 ;
           this.vy = -BOUNCE * this.vy;
           
        }

        //TODO： 左右越界反弹
    
        if (this.x + this.width > BOUNDS_RIGHT ) {
            this.x  = BOUNDS_RIGHT-this.width;
            this.vx = -BOUNCE * this.vx;
            
        }
        if (this.x  < 0) {
            this.x  = 0;
            this.vx = -BOUNCE * this.vx;
            
            
        }
                


        //根据物体位置更新显示对象属性
        var displayObject = this.displayObject;
        displayObject.x = this.x;
        displayObject.y = this.y;

    }
}


var rect = new Rect();
rect.width = 150;
rect.height = 100;
rect.color = '#FF0000';

/**
 * 创建一个物体，其显示内容为一个长方形，受重力做平抛运动
 */
var body = new Body(rect);
body.width = rect.width;
body.height = rect.height;
body.vx = 3;//需要保证 vx 在 0-50的范围内行为正常
body.vy = 5;//需要保证 vy 在 0-50的范围内行为正常


var renderCore = new RenderCore();
var ticker = new Ticker();

renderCore.start([rect]);
ticker.start([body]);


