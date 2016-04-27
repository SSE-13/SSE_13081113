var xmlhttp:XMLHttpRequest;

module data {

    export class Storage {

        private static _instance: Storage;

        public static getInstance(): Storage {
            if (Storage._instance == null) {
                Storage._instance = new Storage();
            }
            return Storage._instance;
        }


        public readFile(callback) {
           var state_Change = ()=>{
            if(xmlhttp.readyState == 4){
                if(xmlhttp.status == 200){               
                var obj = JSON.parse(xmlhttp.responseText);
                this.mapData = obj.map;
                this.picData=obj.pic;
                callback();     
               }
            }
           }
           
            if(XMLHttpRequest){
               xmlhttp =  new XMLHttpRequest();
           }
           if(xmlhttp!=null){
               xmlhttp.onreadystatechange = state_Change;
               xmlhttp.open("GET","lib/map.json",true);
               xmlhttp.send(null);
           }
           else {
               alert("not support");
           }
        }
        
        public saveFile(){
            
        }
        
        public mapData;
        public picData;

    }



}