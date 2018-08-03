
//$( selector(htmlelement,cssclass,id) ).methode -> .css(),.attr(),.hide(),.show()
//$( selector(htmlelement,cssclass,id) ).event(fn(){...})   -> .click(),.ready(),.on() 
$(document).ready(function(){
    
    console.log("READY !!!");
    // Globale Variablen Startwere setzen    
    getDataFromDB(); 
    getFormData();
    $(".mBtn").click(function(){
        var nr = parseInt($(this).attr('data-nr'));
        var xp = 300 * nr * -1;
        $(".moveBox").animate({
            left:xp+'px'
        });
    });
//    $('#overview').click(function(){
//        $('.moveBox').animate({
//            marginLeft:'-300px'
//        },500);
//    });
//    $('#details').click(function(){
//        $('.moveBox').animate({
//            marginLeft:'-600px'
//        },500);
//    });
//    $('#addData').click(function(){
//        $('.moveBox').animate({
//            marginLeft:'-900px'
//        },500);
//    });  
//    $('.listView, .detailView, .addView').click(function(){
//        $('.moveBox').animate({
//            left:'0px'
//        });
//    });
    
});//ready End



function  getDataFromDB(){   
   var xhttp = new XMLHttpRequest();
   xhttp.onreadystatechange = function() {
         if (this.readyState == 4 && this.status == 200) {
             console.log(this.readyState, this.status);
         viewData(JSON.parse(this.responseText));
         }
    };    
   xhttp.open("GET", "db.php?flag=0", true);
   xhttp.send();   
}
function viewData(data){
    console.log(data);
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
                            console.log($(this).attr('data-nr'));
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
          //getDataFromDB();
            //getDataFromDB();
            console.log(JSON.parse(this.responseText));
         }
    };    
   xhttp.open("GET", "db.php?flag=2&id="+id, true);
   xhttp.send();     
}
function getFormData(){
    $('#btnForm').click(function(){
        var title=$('#inputTitle').text;
        console.log(title);
    });
}
//    var viewData = function (data) {
//        var wrapper = document.querySelector('#wrapper');
//        var listView = document.querySelector('.listView');
//        var ul = document.createElement('ul');
//        var ulWrapper = listView.appendChild(ul);
//        
//        console.log(data);
//        $.each(data, function(key, val){
//            var li1 = document.createElement('li');
//            ulWrapper.appendChild(li1);                
//            var title = val;
//            var text = document.createTextNode(title);
//            ulWrapper.appendChild(text);
//        });
////        (var i = 0, max = data.length; i < max; i++) {
////           var title = data[i].titel;
////           var zeit = data[i].zeit;
////           var dat = data[i].datum;
//           
////           var li1 = ulWrapper.append(li); 
////           
////           li1.appendChild(text);
////           ulWrapper.appendChild(li1);
//        //}
//        
//        
//        
////        var str = 'Titel: ' + data.titel + ' am ' + data.datum + ' um ' + data.zeit;
////        document.querySelector('#wrapper').innerText = str;
//    };

  
