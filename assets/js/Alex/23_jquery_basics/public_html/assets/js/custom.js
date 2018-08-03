
var currentIndex = 0;


//$( selector(htmlelement,cssclass,id) ).methode -> .css(),.attr(),.hide(),.show()
//$( selector(htmlelement,cssclass,id) ).event(fn(){...})   -> .click(),.ready(),.on() 
$(document).ready(function(){
    
    console.log("READY !!!");
    // Globale Variablen Startwere setzen
      
    
    //Events an feste HTML-ELemente anhängen
   $(".backBtn").click(function(){
     $(".moveBox").animate({marginLeft:'0px'});
   })
   
    $(".prevBtn").click(function(){  stepPrev(); })
    $(".nextBtn").click(function(){  stepNext(); })
   // Startfunktionen
    createScreen2();
    
});//ready End

function stepPrev(){
    currentIndex--;
    if( currentIndex <= 0 ){ currentIndex = 0 }
    fillData();
}

function stepNext(){
    currentIndex++;
    if( currentIndex >= allData.length ){ currentIndex = allData.length -1 }
    fillData();
}

function  createScreen(){
    //3.a In Abhäng. der Daten GFX-Elemente erzeugen
    console.log(allData);    
 /*Erzeugen soviele Divs wie Einträge in Array und schreibe
  den Namen des Landes in den div*/    
    for(var i=0;i < allData.length;i++){
        //Erzeuge div-element und speicher es in variable
        var div = document.createElement("div");
            div.setAttribute("data-nr",i); /// !!!!!!!!!!!!!!!!!!!!!
            div.className = "listBtn";
            //div.setAttribute("class","listBtn");
        //Erzeuge text-element und speicher es in variable
        var t = document.createTextNode(allData[i].country);  
        //Stecke text-element in div-element
            div.appendChild(t);
        //Gebe jedem div-element ein event mit    
            div.onclick = function(){ 
                alert( this.getAttribute("data-nr") );                
            }
        //füge div-element zum DOM (htmlstruktur) hinzu
        //mache sichtbar
         listB1.appendChild(div);        
    }
}

function  createScreen2(){
    /*gehe alle Elemente der Liste 'allData' durch ... speicher jeden
    einzelnen Eintrag in 'item' und zähle die stelle in der Liste
    im 'index' */
   $.each(allData,function(index,item){
   $('.listView').append("<div class='listBtn' data-nr='"+index+"'>"+item.country+"</div>");
   });
   
   $('.listBtn').click(function(){
       //Lese aus dem div die gespeicherte Stelle im Array aus
       currentIndex = $(this).attr("data-nr");
    //in index.html -> detail anzeige vorbereiten 3divs für text 1 Image ...
    ////Benutze die "data-nr" um richtige Werte anzuzeigen
    
       //1. Alte Daten aus HTML-Elementen löschne  $(".div").html("");
       $(".txt").html("");       $(".imgBox").attr("src","");
       //2. HTML-Elemnte auf opacity 0% setzen
       $(".txt").css({opacity:0});       $(".imgBox").css({opacity:0});
    
    $(".moveBox").animate({marginLeft:'-300px'},1000,function(){
        fillData();
    });    
   });
}

function fillData(){
      $(".countryTxt").html( allData[currentIndex].country );
//      $(".imgBox").css( {backgroundImage:'url(assets/images/'+allData[nr].flag+')'} );
      $(".imgBox").attr("src","assets/images/"+allData[currentIndex].flag);
      $(".peopleTxt").html( allData[currentIndex].people );
      $(".capitalTxt").html( allData[currentIndex].capital );      
      //3. HTML-Elemente einblenden
      //$(".txt").animate({opacity:1},1000);
      $(".countryTxt").animate({opacity:1},400);
      $(".peopleTxt").animate({opacity:1},700);
      $(".capitalTxt").animate({opacity:1},1000);
      $(".imgBox").animate({opacity:1},1000);
}