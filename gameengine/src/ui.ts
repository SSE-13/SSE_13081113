module ui {

    var eventCore: events.EventCore = events.EventCore.getInstance();

    export class Button extends render.DisplayObjectContainer {

        public onClick: Function;
        public isSingle:boolean=true;
        public isClick:boolean=false;
        
        public get text(): string {
            return this._text;
        }

        public set text(value: string) {
            this._text = value;
            this.label.text = value;
        }

        public get width(): number {
            return this._width;
        }

        public set width(value: number) {
            this._width = value;
            this.background.width = value;
        }

        public get height(): number {
            return this._height;
        }

        public set height(value: number) {
            this._height = value;
            this.background.height = value;
        }
        
        public setColor(value :string){
            this.background.color=value;
        }
        
        public getSelf(){
            return this;
        }
        
        public setBackImage(imagePath:string){
           // this.backImage=new render.Bitmap();
            //this.backImage.source=imagePath;
        }


        private background: render.Rect;
        private backImage:render.Bitmap;
        private label: render.TextField;
        private _text: string = "label";



        constructor() {

            super();
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

            eventCore.register(this, events.displayObjectRectHitTest, () => {
                if (this.onClick) {
                
                    this.onClick();
                    
                    if(this.isSingle){
                        this.setColor(this.background.color=="#FF0000"?"#0000FF":"#FF0000");//单选
                        this.isClick=true;
                    }
                        
                }
            });


        }








    }



}