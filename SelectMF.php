<?php
	header('Content-Type: application/json');
	$response = ($_POST['PS']);
	//echo 1;
	$mysqli = new mysqli("localhost", "rza", "654321", "csv_db");
	if ($mysqli->connect_errno) {
		echo "Не удалось подключиться к MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
	}

	$mysqli->set_charset('utf8');
	$res = $mysqli->query("SELECT DISTINCT naicorr FROM polnaya WHERE naim_ps='".$response."' ORDER BY naicorr ASC");

	while ($row = $res->fetch_assoc()){
		$json[]=$row['naicorr'];
	}

	echo json_encode($json);
?>