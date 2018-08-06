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
        <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
         <!-- JQUERY -->
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
         <!-- JS -->       
        <script src="assets/js/custom.js"></script>
    </head>
    <body>
        <div id="wrapper">
            <div class="moveBox">
                <div class="startView">
                    <div id="datepicker"></div>
                </div>
                <div class="listView"></div>
                <div class="detailView"></div>
                
                <div class="addView">
                    <form id="insertForm" action="">
                        Title:<br>
                        <input type="text" name="titel" value="" required="">
                        <br>
                        Datum:<br>
                        <input type="date" name="datum" value="">
                        <br><br>
                        Uhrzeit:<br>
                        <input type="time" name="zeit" value="">
                        <br><br>
                        Kategorie:<br>
                        <select name="kategorie">
                            <option value="1">privat</option>
                            <option value="2">büro</option>
                            <option value="3">sport</option>
                            <option value="4">wellness</option>
                            <option value="5">bar</option>
                        </select>
                        Bemerkung:<br>
                        <textarea name="bemerkung" rows="4" cols="50">                              
                        </textarea>
<!--                        <input id="insertBtn" type="submit" value="Termin speichern ">-->
                        
                        <div id="insertBtn">Termin speichern</div>
                   </form> 
                </div>
                
            </div>
            <div class="menuBox">
                <div class="mBtn" data-nr="0">
                    <i class="demo-icon icon-list-bullet">&#xf0ca;</i>
                </div>
                <div class="mBtn" data-nr="1"></div>
                <div class="mBtn" data-nr="2"></div>
                <div class="mBtn" data-nr="3"></div>
                
            </div>
        </div>
        
        
        
        <?php
        // put your code here
        
        //header('Location:db.php?flag=2') ;
        //header('Location:http://www.google.de') ;
        ?>
    </body>
</html>
