
module editor {


    export const GRID_PIXEL_WIDTH = 50;

    export const GRID_PIXEL_HEIGHT = 50;
    
    const times=5;

    export class WorldMap extends render.DisplayObjectContainer {


        private cache: HTMLCanvasElement;
        public grid: astar.Grid;
        public isDirty = true;
        constructor() {

            super();
            var grid = new astar.Grid(mapData.length,mapData[0].length);
            this.grid = grid;
            for(var i=0;i<mapData.length;i++){
                for(var j=0;j<mapData[0].length;j++){
                    var isWalkable:boolean;
                    isWalkable=mapData[i][j]==0?true:false;
                    grid.setWalkable(i,j,isWalkable);
                }
            }
            this.cache = document.createElement("canvas");
            this.cache.width = 400;
            this.cache.height = 400;

        }


        render(context: CanvasRenderingContext2D) {
            super.render(context);
        }
    }


    export class Tile extends render.Bitmap {


        public ownedRow: number;
        public ownedCol: number;


        constructor() {
            super();
            
        }

        public setWalkable(value) {
            //this.color = value ? "#0000FF" : "#FF0000";
        }
    }
    
    export class BoyShape extends render.DisplayObjectContainer {
         constructor() {
            super();
            var picBody =new render.Bitmap();
            picBody.source="pic8.png"
            this.addChild(picBody);
            
        }
    }
    
     
    export class BoyBody extends Body {
         path:Array<astar.Node>;
         time=0;
         vx;
         vy;
         
        
         public run(grid) {
            grid.setStartNode(0, 0);
            grid.setEndNode(10, 8);
            var findpath = new astar.AStar();
            findpath.setHeurisitic(findpath.diagonal);
            var result = findpath.findPath(grid);
            this.path = findpath._path;
            console.log(this.path);
            console.log(grid.toString());
        }

         public onTicker(duringTime) {
            
             console.log(duringTime);
              console.log(this.time);
            
              if(this.time<times){
                 
                   this.time+=1;
                  
              }else{
                 this.time=1;
                this.path.shift();
              }
 
                   
              
              
                if( this.path.length>2){
                   var node1=this.path.shift();
                
                   var node2=this.path.shift();
                   this.path.unshift(node2);
                   this.path.unshift(node1);
                   this.vx=(node2.x-node1.x)*GRID_PIXEL_WIDTH/times;
                   this.vy=(node2.y-node1.y)*GRID_PIXEL_HEIGHT/times;
                 
                   this.x+=this.vx;
                   this.y+=this.vy;
                 } else{
                    this.time=0;
                    this.vx=0;
                    this.vy=0;
                }   
             }
        
    }
    
}
