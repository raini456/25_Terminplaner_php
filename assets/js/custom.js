var allData;
//$( selector(htmlelement,cssclass,id) ).methode -> .css(),.attr(),.hide(),.show()
//$( selector(htmlelement,cssclass,id) ).event(fn(){...})   -> .click(),.ready(),.on() 
$(document).ready(function(){
    
    console.log("READY !!!");
    // Globale Variablen Startwere setzen    
    getDataFromDB(); 
    readFormAndSendData();
    $(".mBtn").click(function(){
        var nr = parseInt($(this).attr('data-nr'));
        var xp = 300 * nr * -1;
        $(".moveBox").animate({
            left:xp+'px'
        });
    });    
});//ready End



function  getDataFromDB(){   
   var xhttp = new XMLHttpRequest();
   xhttp.onreadystatechange = function() {
         if (this.readyState == 4 && this.status == 200) {
             //console.log(this.readyState, this.status);
         viewData(JSON.parse(this.responseText));
         }
    };    
   xhttp.open("GET", "db.php?flag=0", true);
   xhttp.send();   
}
function viewData(data){
    //console.log(data);
    $.each(data, function(index, item){
        var yp = index*(30 + 3);
        $('#sortable').append("<div syp='"+yp+"px' style='top:"+yp+"px' class='listBtn' data-nr='"+item.id+"'><div class='listDatum'>"+item.datum+"</div><div class='listDatum'>"+item.titel+"</div></div>");       
    });
    $('.listBtn').draggable(
        {axis:"y"},
        {
            start:function(){
                $(this).css({
                    zIndex:10
                });
            },
            drag:function(){
                if(parseInt($(this).css("top"))>350){
                    $(this).css({
                        backgroundColor:'red'
                    });
                }
                else{
                    $(this).css({
                        backgroundColor:'whitesmoke'
                    });
                }
            },
            stop:function(){
                    if (parseInt($(this).css("top")) > 350) {
                        if (confirm('Löschen?')) {
                            //console.log($(this).attr('data-nr'));
                            deleteInDB($(this).attr('data-nr'));
                            //$(this).remove();                            
                        } else {
                            $(this).css({backgroundColor: 'whiteSmoke'});
                            var yp = $this.attr('syp');
                            $(this).animate({
                                top: yp
                            });
                        }
                    }else{
                        var yp= $(this).attr("syp");
                        $(this).animate({top:yp});
                    }
                   
                
                
            }
        }
    );
    $('#sortable').sortable();
}
function deleteInDB(id){
   var xhttp = new XMLHttpRequest();
   xhttp.onreadystatechange = function() {
         if (this.readyState == 4 && this.status == 200) {
          $(".listView").html("");
          getDataFromDB();
            
          //  console.log(JSON.parse(this.responseText));
         }
    };    
   xhttp.open("GET", "db.php?flag=2&id="+id, true);
   xhttp.send();     
}
function readFormAndSendData(){
    $('#btnInsert').click(function(){ 
        console.log($('#insertForm').serialize());
        var formData=$('#insertForm').serializeArray();
        var dateFormData=new Date(formData[1].value);
        var titelFormData=formData[0].value;
        var datumFormData=formData[1].value;
        var zeitFormData=formData[2].value;
        var kategorieFormData=formData[3].value;
        var bemerkungFormData=formData[4].value;
        
        var today = new Date();
        //var str = today.getFullYear()+"-"+today.getMonth()+"-"+today.getDate();
        //today = new Date(str);
        if(dateFormData<today){
            alert("Kleiner als heute!");
        }
        if(titelFormData.length<=3){
            alert("Der Text muss länger als 3 Buchstaben sein!");
        }
        else{
            alert("Heute oder größer");
            $.post("db.php?flag=3",
             {              
                titel:titelFormData,
                datum:datumFormData,
                zeit:zeitFormData,
                kategorie:kategorieFormData,
                bemerkung:bemerkungFormData               
             },function(data, status){
        alert("Data: " + data + "\nStatus: " + status);
    });
    }
  });
}

  
