
//$( selector(htmlelement,cssclass,id) ).methode -> .css(),.attr(),.hide(),.show()
//$( selector(htmlelement,cssclass,id) ).event(fn(){...})   -> .click(),.ready(),.on() 
$(document).ready(function(){
    
    console.log("READY !!!");
    // Globale Variablen Startwere setzen
    
    getDataFromDB(); 
  
    
});//ready End




function  getDataFromDB(){   
   var xhttp = new XMLHttpRequest();
   xhttp.onreadystatechange = function() {
         if (this.readyState == 4 && this.status == 200) {
         viewData(this.responseText);
         }
    };
    
   xhttp.open("GET", "db.php?flag=0", true);
   xhttp.send(); 
  
}


    var viewData = function (data) {
        var wrapper = document.querySelector('#wrapper');
        var ul = document.createElement('ul');
        var ulWrapper = wrapper.appendChild(ul);
        var li = document.createElement('li');
        console.log(data);
        ulWrapper.appendChild(li);
        $.each(data, function(key, val){
            console.log(key, val);
        });
//        (var i = 0, max = data.length; i < max; i++) {
//           var title = data[i].titel;
//           var zeit = data[i].zeit;
//           var dat = data[i].datum;
           
//           var li1 = ulWrapper.append(li); 
//           
//           var text = document.createTextNode(title);
//           li1.appendChild(text);
//           ulWrapper.appendChild(li1);
        //}
        
        
        
//        var str = 'Titel: ' + data.titel + ' am ' + data.datum + ' um ' + data.zeit;
//        document.querySelector('#wrapper').innerText = str;
    };
  
