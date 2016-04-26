
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


    export class Tile extends render.Bitmap {


        public ownedRow: number;
        public ownedCol: number;


        constructor() {
            super();
            
        }

        public setWalkable(value) {
           // this.color = value ? "#0000FF" : "#FF0000";
        }
    }
    
    
    export class ControlPanel extends render.DisplayObjectContainer {
     
         //public _textCol: string = "行:";
        // public _textRow: string = "列:";
         //public _textWalkable: string = "是";
         public textCol:render.TextField;
         public textRow:render.TextField;
         public buttonWalkable:ui.Button;
         public buttonPic;
         
         public nowTile;
         
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
            
             this.textRow=new render.TextField();
            this.textRow.text="行：";
            this.textRow.width=75;
            this.textRow.height=50;
            this.textRow.y=50;
            this.addChild(this.textRow);
            
            this.textCol=new render.TextField();
            this.textCol.text="列：";
            this.textCol.width=75;
            this.textCol.height=50;
            this.textCol.x=75;
            this.textCol.y=50;
            this.addChild( this.textCol);
            
           
            
            var textWalkable=new render.TextField();
            textWalkable.text="是否可走：";
            textWalkable.width=100;
            textWalkable.height=50;
            textWalkable.y=100;
            this.addChild(textWalkable);
      
            this.buttonWalkable = new ui.Button();
            this.buttonWalkable.text="是";
            this.buttonWalkable.width= 50;
            this.buttonWalkable.height = 50;
            this.buttonWalkable.x=100;
            this.buttonWalkable.y=75; 
            this.addChild(this.buttonWalkable);
            this.buttonWalkable.onClick = ()=> {
               // buttonWalkable.setColor(this._textWalkable == "是" ? "#0000FF":"#FF0000");
                this.buttonWalkable.text=this.buttonWalkable.text == "是" ? "否":"是"; 
                if(this.nowTile){
                   mapData[this.nowTile.ownedRow][this.nowTile.ownedCol]=mapData[this.nowTile.ownedRow][this.nowTile.ownedCol]==0?1:0;
                }
                
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
           this.buttonPic=[];
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
                  
                  this.buttonPic[i*3+j]=new ui.Button();
                  this.buttonPic[i*3+j].text="";
                  this.buttonPic[i*3+j].width=50;
                  this.buttonPic[i*3+j].height=25;
                  this.buttonPic[i*3+j].x=50*j;
                  this.buttonPic[i*3+j].y=250+i*75;
                  this.addChild( this.buttonPic[i*3+j]);
                  this.buttonPic[i*3+j].onClick = ()=> {
                      //更换图片素材
                      for(var m=0;m<picNum;m++){
                           this.buttonPic[m].setColor("#FF0000");
                           this.buttonPic[m].isClick=false;
                      }
                      for(var n=0;n<picNum;n++){
                           
                           if(this.buttonPic[n].isClick==true){
                                picData[this.nowTile.ownedRow][this.nowTile.ownedCol]=n+1;
                                break;
                           }
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
                storage.saveFile();
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
        
        //显示Tile信息
        public setControlPanel(tile:editor.Tile){
            
            this.nowTile=tile;
            console.log(this.nowTile)
            
            this.textRow.text="行："+(tile.ownedRow+1);
            this.textCol.text="列："+(tile.ownedCol+1);
            this.buttonWalkable.text=mapData[tile.ownedRow][tile.ownedCol]==0?"是":"否";
            this.buttonWalkable.setColor(mapData[tile.ownedRow][tile.ownedCol]==0?"#FF0000":"#0000FF");
            for(var i=0;i<picNum;i++){
                this.buttonPic[i].setColor("#FF0000");
            }
           if(picData[tile.ownedRow][tile.ownedCol]!=0){
                this.buttonPic[picData[tile.ownedRow][tile.ownedCol]-1].setColor("#0000FF");
            }
            
        }
        
        
        
        
    }
}
