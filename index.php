<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
        <link rel="stylesheet" href="assets/css/styles.css">
        <!-- JQUERY -->
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
        
        <!-- JS -->       
        <script src="assets/js/custom.js"></script>
    </head>
    <body>
        <?php
        // put your code here
        
        //header('Location:db.php?flag=2') ;
        //header('Location:http://www.google.de') ;
        ?>
        <div class="wrapper" id="wrapper">
            <div class="moveBox">
                <div class="startView">Start                    
                    
                </div>
                <div class="listView">List
                    <ul id="sortable"></ul>
                    <div id="question">Wollen Sie wirklich löschen?
                        <input type="radio" name="question" value="ja">ja
                        <input type="radio" name="question" value="nein">nein
                    </div>
                </div>
                <div class="detailView">Detail
                    
                </div>            
                <div class="addView">AddView<br><br>
                    <form><br><br>
                        <for id="inputTitle">Titel<br>
                            <input type="text" id="inputTitle">
                        </for><br>
                        <for id="inputDate">Datum<br>
                            <input type="date" id="inputDate">
                        </for><br>
                        <for id="inputCategory">Kategorie<br>
                            <input type="text" id="inputCategory">
                        </for><br>
                        <for id="inputTime">Uhrzeit<br>
                            <input type="text" id="inputTime">
                        </for><br>
                        <for id="inputComment">Bemerkung<br>
                            <textarea col="5" span="20" id="inputComment"></textarea>
                        </for><br>
                        <input type="button" id="btnForm" value="Termin eintragen"></button>
                    </form>
                </div>
                    
            </div>
                <div class="menuBox">
                    
                        <button class="mBtn" id="home" data-nr="0">Start</button>
                        <button class="mBtn" id="overview" data-nr="1">Übersicht</button>
                        <button class="mBtn" id="details" data-nr="2">Details</button>
                        <button class="mBtn" id="addData" data-nr="3">Einträge</button>                 
                   
                </div>
            
        </div>  
    </div>
    </body>
</html>
