<?php
	header('Content-Type: text/html; charset=utf-8');
	$PS = $_COOKIE["PS"];
	$mysqli = new mysqli("localhost", "rza", "654321", "csv_db");
	if ($mysqli->connect_errno) {
		echo "Не удалось подключиться к MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
	}
	echo "<h2 align='center'> График проверок УРЗА ПС " .  $PS . "<p></p>";
	$mysqli->set_charset('utf8');
	$res = $mysqli->query("SELECT naicorr, vid_pp_rza, dat_pp_rza, dat_sp_rza, vid_sp_rza FROM polnaya WHERE naim_ps = '".$PS."'");
	echo "<table align='center' width='80%' border='1'>
	<tr>
		<td>Присоединение</td>
		<td>Вид ПП</td>
		<td>Месяц, год ПП</td>
		<td>Месяц, год СП</td>
		<td>Вид ТО</td>
	</tr>";
	while ($row = $res->fetch_assoc()) {
		echo "<tr>";
		$i=0;
		foreach ($row as $row1){
			echo "<td>";
			if($i==2||$i==3){
				echo substr($row1,5,2).".".substr($row1,0,4);
			}else {echo $row1;}
			echo "</td>";
			$i++;
		}
		echo "</tr>";
	}
	echo "</table>";
	
?>