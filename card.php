<?php
	header('Content-Type: application/json');
	
	$ps = ($_POST['PS']);
	$unit = ($_POST['unit']);
	
 	$mysqli = new mysqli("localhost", "rza", "654321", "csv_db");
	if ($mysqli->connect_errno) {
    echo "Не удалось подключиться к MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
	}

	$mysqli->set_charset('utf8');
	$res = $mysqli->query("SELECT *	FROM polnaya
	WHERE naim_ps='".$ps."' AND naicorr='".$unit."';");

	$result=$res->fetch_assoc();
	echo json_encode($result); 

?>