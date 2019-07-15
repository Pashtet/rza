<?php
	header('Content-Type: application/json');
	$mysqli = new mysqli("localhost", "rza", "654321", "csv_db");
	if ($mysqli->connect_errno) {
		echo "Не удалось подключиться к MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
	}

	$mysqli->set_charset('utf8');
	$res = $mysqli->query("SELECT DISTINCT ispoln FROM isp ORDER BY ispoln ASC");

	while ($row = $res->fetch_assoc()) {
		$json[]=$row['ispoln'];
	}

	echo json_encode($json);
?>