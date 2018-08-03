var allData;
//$( selector(htmlelement,cssclass,id) ).methode -> .css(),.attr(),.hide(),.show()
//$( selector(htmlelement,cssclass,id) ).event(fn(){...})   -> .click(),.ready(),.on() 
$(document).ready(function(){
    
    console.log("READY !!!");
    // Globale Variablen Startwere setzen
    
    $(".mBtn").click(function(){
        /*lese die nr des gedrückten Elementes aus und mache 
        eine Zahl draus*/
        var nr = parseInt( $(this).attr("data-nr") );
        /*die breite der seite mal dieser zahl ergibt den xversatz
        um den die moveBox veschoben werden soll..
        .und zwar nach links '*-1' */
        var xp = 300*nr*-1;
        $(".moveBox").animate({left:xp+'px'});
    });
    
    
    getDataFromDB(); 
  
    
});//ready End


function  getDataFromDB(){
   allData = [];
   var xhttp = new XMLHttpRequest();
   xhttp.onreadystatechange = function() {
         if (this.readyState == 4 && this.status == 200) {
         console.log( this.responseText );
         console.log( JSON.parse(this.responseText) );
         allData = JSON.parse(this.responseText);
         createTerminList();
         
         }
    };
    
   xhttp.open("GET", "db.php?flag=0", true);
   xhttp.send(); 
  
}


function  deletInDB(id){
   allData = [];
   var xhttp = new XMLHttpRequest();
   xhttp.onreadystatechange = function() {
         if (this.readyState == 4 && this.status == 200) {
                 
         }
    };
    
   xhttp.open("GET", "db.php?flag=2&id="+id, true);
   xhttp.send(); 
  
}


function createTerminList(){
    console.log(allData);
    //1. Erstellen in Abhng. von 'data' GFX-Elemente in einer Listform.
    //2. Bei Klick 'index' auslesen und 'bemerkung' anzeigen.
    $.each(allData,function(index,item){
        var yp = index*(30+3);
   $('.listView').append("<div syp='"+yp+"px' style='top:"+yp+"px;' class='listBtn' data-nr='"+item.id+"'>\n\
<div class='listDatum'>"+item.datum+"</div>\n\
<div class='listTitle'>"+item.titel+"</div>\
</div>");
   });
   $('.listBtn').draggable(
           { axis: "y" },
           {
                start: function(){ $(this).css({zIndex:100});  },
                drag: function(){  
                 if(parseInt($(this).css("top")) > 350){
                  $(this).css({backgroundColor:"red"});    
                 }else{
                  $(this).css({backgroundColor:"whitesmoke"});
                 }
                },
                stop: function(){  
                  if( parseInt($(this).css("top")) > 350  ){
                      if(confirm('WIRKLICH LÖSCHEN SICHER ????')){
                     //übergebe die DB id von dem losgelassenen Element                       
                          deletInDB( $(this).attr("data-nr") );
                          
                          $(this).remove(); 
                          
                      }else{
                          $(this).css({backgroundColor:"whitesmoke"});
                          var yp = $(this).attr("syp");
                          $(this).animate({top:yp});
                      }                      
                  }else{
                      var yp = $(this).attr("syp");
                     $(this).animate({top:yp});
                  }                  
                }
            }
        );
    
    
}