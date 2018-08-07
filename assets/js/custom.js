var allData;
var currentDate;
var dataNr;
//$( selector(htmlelement,cssclass,id) ).methode -> .css(),.attr(),.hide(),.show()
//$( selector(htmlelement,cssclass,id) ).event(fn(){...})   -> .click(),.ready(),.on() 
$(document).ready(function(){
    
    console.log("READY !!!");
    // Globale Variablen Startwere setzen
    $( "#datepicker" ).datepicker({ 
                 onSelect: function(date) {
                     currentDate = date;                     
                     selectData();                                          
                 },
                 dateFormat: 'yy-mm-dd' 
           }           
     );
     $('#onOffCheck').click(function(){
         if($(this)[0].checked){
            $('#datepicker').css({
                opacity:0.3,
                cursor:'none'
            }).datepicker('disable');
            getDataFromDB();
         }  
         else{
             $('#datepicker').css({
                opacity:1, 
                cursor:'pointer'
            }).datepicker('enable');            
         }
     });
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
    
    $("#insertBtn").click(function(){
           readFormAndSendData();
      });   
    getDataFromDB(); 
    getAllCategories();
        
});//ready End
function showDetails(){      
    
}
function getAllCategories(){
    $.post("db.php?flag=4", 
        function (data, status) {
            var allKat = JSON.parse(data);
            $.each(allKat, function(index,item){
                $('#selectKat').append("<option value='"+item.id+"'>"+item.kategorie+"</option>");
            });                    
        });
}


function selectData() {    
    $.post("db.php?flag=1", {
        datum: currentDate
    },
        function (data, status) {
            allData = JSON.parse(data);            
            if(status=='success'){
                $('.listView').html("");
                $(".moveBox").animate({left:'-300px'});                            
                createTerminList();    
            }
        });
}

function readFormAndSendData(){
   //console.log( $('#insertForm').serialize() );
   console.log( $('#insertForm').serializeArray());
   var formData = $('#insertForm').serializeArray();
   console.log( formData[1].value );
   
   var dateForm = new Date( formData[1].value );    
   var today = new Date();
   
   if(formData[0].value.length <= 3){
      alert("Sie müssen einen Titel mit min 3 Buchstaben wählen.");
     }
     else{  
            if(dateForm < today){
                alert("Dieser Termin liegt in der Vergangenheit und Du bist kein Prinz!");
            }
            else{
                alert("sende Daten");

                 $.post("db.php?flag=3",
                    {
                       titel: formData[0].value ,
                       datum: formData[1].value ,
                       zeit:   formData[2].value  ,
                       kategorie: formData[3].value ,
                       bemerkung: formData[4].value 
                    },
                 function(data, status){
                    console.log("Data: " + data + "\nStatus: " + status);
                 });
            }
   }   
   //var str = today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate()
   //console.log(today2)
}

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
             //lade aktuelle daten aus DB und aktualisiere die liste
             $(".listView").html("");
           getDataFromDB();
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
   $('.listView').append("<div class='listBtn'  syp='"+yp+"px' style='top:"+yp+"px;'data-nr='"+item.id+"'>\n\
<div class='listDatum'>"+item.datum+"</div>\n\
<div class='listTitle'>"+item.titel+"</div>\
</div>");
   });
   $('.listBtn').click(function(){ 
       dataNr = $(this).attr('data-nr'); 
             
       $.post("db.php?flag=5", {
        id:dataNr
        },
        function (data, status) {
            allData = JSON.parse(data);
            if (status === 'success') {
                 $.each(allData, function (index, item) {
                  $('.detailView').html('');   
                  $('.detailView').append('\
                 <div class="detail">' + item.titel + '</div>\n\
                <div class="detail">' + item.datum + '</div>\n\
                <div class="detail">' + item.zeit + '</div>\n\
                <div class="detail">' + item.bemerkung + '</div>\n\
                <div class="detail">' + item.kategorie + '</div>\n\
                ');
                        });

                        $(".moveBox").animate({left: '-600px'});


                    }
                });
              
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
                          
                          /*$(this).remove(); */
                         
                          
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
function showDetails(){      
    $.post("db.php?flag=5", {
        id:dataNr
    },
        function (data, status) {
            allData = JSON.parse(data);            
            if(status=='success'){
                $.each(allData, function(item){
                    $('.detailView').append('<div>'+item+'</div>');
                });                
                $(".moveBox").animate({left:'-600px'});
                
                    
            }
        });
}