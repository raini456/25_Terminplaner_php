<?php


define('HOST', 'localhost');
define('DB', 'termine_db');
define('USER', 'root');
define('PASS', '');
define('CHAR', 'utf8');

$dbHost = sprintf('mysql:host=%s;dbname=%s;charset=%s', HOST, DB, CHAR);
$db = new PDO($dbHost, USER, PASS);

$sql = "SELECT * FROM termine";
$statement = $db->query($sql);
$rows = $statement->fetchAll(PDO::FETCH_ASSOC);

var_dump($rows);
//echo json_encode($rows);


?>
