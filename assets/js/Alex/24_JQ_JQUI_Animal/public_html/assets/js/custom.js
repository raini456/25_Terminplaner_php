
//$( selector(htmlelement,cssclass,id) ).methode -> .css(),.attr(),.hide(),.show()
//$( selector(htmlelement,cssclass,id) ).event(fn(){...})   -> .click(),.ready(),.on() 
$(document).ready(function(){
    
    console.log("READY !!!");
    // Globale Variablen Startwere setzen
    
    createScreen();
    
    $(document).keyup(function(event){
        if(event.keyCode == 32){
         showSolution();
        }
    })
    
});//ready End

function  createScreen(){

   $.each(allData,function(index,item){
            createAniamlBox(index,item);
            creatTxtBox(index,item);
            
   });
  
}

function createAniamlBox(index,item){
    var xversatz = item.xpos-50;
    var yversatz = item.ypos-50;
      $('.wrapper').append("<div id='aBox"+index+"' class='animalBox' data-nr='"+index+"' \n\
  style='top:"+yversatz+"px;left:"+xversatz+"px;background-image:url(assets/images/"+item.img+")'></div>");
}

function creatTxtBox(index,item){
    var xversatz = 100+(105*index);
      $('.wrapper').append("<div class='txtBox' data-nr='"+index+"' \n\
  style='top:50px;left:"+xversatz+"px;' data-sxpos='"+xversatz+"px'\n\
data-sypos='50px'>"+item.ftxt+"</div>");
    
    $(".txtBox").draggable(
            {           
                start: function() {  
                    $(this).css({opacity:0.6});
                },
                drag: function() {
                },
                stop: function() {
                    //$(this) -> das element was ich gerade loslasse
                    $(this).css({opacity:1});
                    /**********NUR BEI FALSCHER ANTWORT**************/
                        //lese die startposition des divs aus
                       
                    /***************************************/
//leere variable um element zu speichern auf dem ich losgelassen habe
                   var trefferObj; 
                 
                   //über welchem element habe ich losgelassen
                   for(var i=0;i<$(".animalBox").length;i++){
                      var obj = $(".animalBox")[i]
                      if(isHit($(this)[0],obj)){
                          //merke objekt über dem ....
                          trefferObj = obj
                      }  
                    }//ende prüfung hit test
                    
                    //wenn ich über einem element losgelassen habe
                    //dann überprüfe ob es übereinstimmt
                    if(trefferObj != undefined ){
                        //überprüfe beide data-nr auf gleicheit
                       if($(this).attr("data-nr") == 
                           $(trefferObj).attr("data-nr")    ){
                           alert("huhu"); 
                           $(trefferObj).css({backgroundColor:'green'});
                           var xp = parseInt($(trefferObj).css("left"));
                           var yp = parseInt($(trefferObj).css("top"))-25;
                           $(this).css({top:yp+"px",left:xp+"px"});
                           $(this).draggable( 'disable' )
                        }else{
                             var xs = $(this).attr('data-sxpos');
                             var ys = $(this).attr('data-sypos');
                             //und fahre zur Startpsoition
                             $(this).animate({top:ys,left:xs});
                        }
                        
                    }else{
                             var xs = $(this).attr('data-sxpos');
                             var ys = $(this).attr('data-sypos');
                             //und fahre zur Startpsoition
                             $(this).animate({top:ys,left:xs});
                    }
                    
                    
                }           
            },
            { containment: ".wrapper", scroll: false }
            
            
            );
    
}


function showSolution(){
    //suche alle element mit der class .txtBox und 
    //gehe jedes einzelne durch
    for(var i=0;i<$(".txtBox").length;i++){
        //hole dir jedes einzele Element aus der liste
       var obj =  $(".txtBox")[i];
       //lese aus jedem einzelnen Element den index(.attr("data-nr"))
       //aus und lese an dieser stelle im arrayallData[$(obj).attr("data-nr")]
       //die passende position aus
       var xpos = allData[$(obj).attr("data-nr")].xpos;
       var ypos = allData[$(obj).attr("data-nr")].ypos;      
      //bewege das Element zu dieser Position
       $(obj).animate({left:xpos+'px',top:ypos+'px'}); 
    }
   
}

function isHit(div1,div2){
    //lese das  genutzte rechteck des Htmlelementes aus
   var rect1 = div1.getBoundingClientRect()
   var rect2 = div2.getBoundingClientRect()
   
return !(rect1.right < rect2.left || 
                rect1.left > rect2.right || 
                rect1.bottom < rect2.top || 
                rect1.top > rect2.bottom);
}
    
 
