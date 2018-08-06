<?php
require_once './config.php';
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
if($_GET['flag'] == '3' && isset($_POST['titel'])){
$sql = "INSERT INTO termine_db(titel, datum, zeit, bemerkung, kategorie) VALUES(:t, :d, :z, :b, :k)";
$statement = $db->prepare($sql);
//            $statement ->bindValue(':t', $_POST['titel'], PDO::PARAM_STR);
//            $statement ->bindValue(':d', $_POST['datum'], PDO::PARAM_STR);
//            $statement ->bindValue(':z', $_POST['zeit'], PDO::PARAM_STR);
//            $statement ->bindValue(':b', $_POST['bemerkung'], PDO::PARAM_STR);
//            $statement ->bindValue(':k', $_POST['kategorie'], PDO::PARAM_STR);
$statement->bindValue(':t', $_POST['titel']);
$statement->bindValue(':d', $_POST['datum']);
$statement->bindValue(':z', $_POST['zeit']);
$statement->bindValue(':b', $_POST['bemerkung']);
$statement->bindValue(':k', $_POST['kategorie']);
$statement->execute();
$msg = $_POST['titel']."\n\r".$_POST['titel']."\n\r".$_POST['datum']."\n\r".$_POST['zeit']."\n\r".$_POST['kategorie']."\n\r".$_POST['bemerkung']."\n\r";
$file = fopen("test.txt", "w+");
fputs($file, "Hello World");
fclose($file, $msg);
echo json_encode($msg);
}




