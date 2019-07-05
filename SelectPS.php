<?php
	header('Content-Type: application/json');
	$mysqli = new mysqli("localhost", "rza", "654321", "csv_db");
	if ($mysqli->connect_errno) {
		echo "Не удалось подключиться к MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
	}

	$mysqli->set_charset('utf8');
	$res = $mysqli->query("SELECT DISTINCT naim_ps FROM polnaya ORDER BY naim_ps ASC");

	while ($row = $res->fetch_assoc()) {
		$json[]=$row['naim_ps'];
	}

	echo json_encode($json);
?>