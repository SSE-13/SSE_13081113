
module editor {


    export const GRID_PIXEL_WIDTH = 50;

    export const GRID_PIXEL_HEIGHT = 50;
    
    export const picNum=6;

    export class WorldMap extends render.DisplayObjectContainer {


        private cache: HTMLCanvasElement;

        public isDirty = true;
        constructor() {

            super();
            this.cache = document.createElement("canvas");
            this.cache.width = 400;
            this.cache.height = 400;

        }


        render(context: CanvasRenderingContext2D) {
            super.render(context);
        }
    }


    export class Tile extends render.Rect {


        public ownedRow: number;
        public ownedCol: number;


        constructor() {
            super();
        }

        public setWalkable(value) {
            this.color = value ? "#0000FF" : "#FF0000";
        }
    }
    
    
    export class ControlPanel extends render.DisplayObjectContainer {
     
         public _textCol: string = "行:";
         public _textRow: string = "列:";
         public _textWalkable: string = "是";
         
        constructor(){
            super();
            var button = new ui.Button();
            button.text = "Hello";
            button.width = 150;
            button.height = 50;
            this.addChild(button);
            button.onClick = ()=> {
                alert(111);
            }
            
            var textCol=new render.TextField();
            textCol.text=this._textCol;
            textCol.width=75;
            textCol.height=50;
            textCol.y=50;
            this.addChild(textCol);
            
            var textRow=new render.TextField();
            textRow.text=this._textRow;
            textRow.width=75;
            textRow.height=50;
            textRow.x=75;
            textRow.y=50;
            this.addChild(textRow);
            
            var textWalkable=new render.TextField();
            textWalkable.text="是否可走：";
            textWalkable.width=100;
            textWalkable.height=50;
            textWalkable.y=100;
            this.addChild(textWalkable);
      
            var buttonWalkable = new ui.Button();
            buttonWalkable.text=this._textWalkable;
            buttonWalkable.width= 50;
            buttonWalkable.height = 50;
            buttonWalkable.x=100;
            buttonWalkable.y=75; 
            this.addChild(buttonWalkable);
            buttonWalkable.onClick = ()=> {
               // buttonWalkable.setColor(this._textWalkable == "是" ? "#0000FF":"#FF0000");
                this._textWalkable=this._textWalkable == "是" ? "否":"是"; 
                buttonWalkable.text=this._textWalkable; 
                //alert("设为可走");
                //修改mapDate
                
            }
            
            var textPic=new render.TextField();
            textPic.text="图片素材：";
            textPic.width=100;
            textPic.height=50;
            textPic.y=150;
            this.addChild(textPic);
            
           var pic=[];
           var buttonPic=[];
            for(var i=0;i<picNum/3;i++){
                pic[i]=[];
               for(var j=0;j<3;j++){
                  pic[i][j]=new render.Bitmap();
                  pic[i][j].source="pic"+(i*3+j+1)+".png";
                  console.debug(  pic[i][j].source);
                  pic[i][j].width=50;
                  pic[i][j].height=50;
                  pic[i][j].x=50*j;
                  pic[i][j].y=200+i*75;
                  this.addChild(pic[i][j]);
                  
                  buttonPic[i*3+j]=new ui.Button();
                  buttonPic[i*3+j].text="";
                  buttonPic[i*3+j].width=50;
                  buttonPic[i*3+j].height=25;
                  buttonPic[i*3+j].x=50*j;
                  buttonPic[i*3+j].y=250+i*75;
                  this.addChild(buttonPic[i*3+j]);
                  buttonPic[i*3+j].onClick = ()=> {
                      for(var m=0;m<picNum;m++){
                          buttonPic[m].setColor("#FF0000");
                      }
                  }
                }
            }
            
            var buttonSave = new ui.Button();
           buttonSave.text = "保存";
           buttonSave.isSingle=false;
           buttonSave.width = 50;
            buttonSave.height = 50;
            buttonSave.y=375;
            this.addChild(buttonSave);
           buttonSave.onClick = ()=> {
               alert("保存成功")
                //save
            }
            
             var buttonBack = new ui.Button();
           buttonBack.text = "撤销";
           buttonBack.isSingle=false;
           buttonBack.width = 50;
           buttonBack.height = 50;
           buttonBack.x=75
            buttonBack.y=375;
            this.addChild(buttonBack);
          buttonBack.onClick = ()=> {
               // alert("确定撤销？")
                //back
            }
           
 
            
        }
        
        
        
    }
}
