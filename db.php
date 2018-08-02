<?php
require_once './config.php';
if(isset($_GET['flag'])){
    
        

        $dbHost = sprintf('mysql:host=%s;dbname=%s;charset=%s', HOST, DB, CHAR);
        $db = new PDO($dbHost, USER, PASS);

        if($_GET['flag'] == '0'){
            $sql = "SELECT * FROM termine ORDER BY datum";
            $statement = $db->query($sql);
            $rows = $statement->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($rows);
        }
        
        if($_GET['flag'] == '1'){
            $sql = "SELECT * FROM termine WHERE datum ='2018-08-28'";
            $statement = $db->query($sql);
            $rows = $statement->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($rows);
        }
        
        if($_GET['flag'] == '2'){
            $sql = "DELETE FROM termine WHERE id ='1'";
            $statement = $db->query($sql);
            $rows = $statement->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($rows);
        }

}


