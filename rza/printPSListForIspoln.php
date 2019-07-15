<?php
	header('Content-Type: text/html; charset=utf-8');
	$ispoln = $_COOKIE["ispoln"];
	$this_year = date('Y');
	$year_sp;
	$psList;
	$mysqli = new mysqli("localhost", "rza", "654321", "csv_db");
	if ($mysqli->connect_errno) {
		echo "Не удалось подключиться к MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
	}
	echo "<h2 align='center'> График проверок УРЗА для " .  $ispoln . " на " . $this_year . " год<p></p>";
	
	$mysqli->set_charset('utf8');
	$res = $mysqli->query("SELECT naim_ps FROM ispps WHERE ispoln = '".$ispoln."' ORDER BY naim_ps ASC");
	while ($row = $res->fetch_assoc()) {
		$psList[]=$row['naim_ps'];
	}
	foreach ($psList as $PS){
	
	echo "<h3 align='center'> График проверок УРЗА ПС " .  $PS . " на " . $this_year . " год</h3><p></p>";
	$mysqli->set_charset('utf8');
	$res = $mysqli->query("SELECT naicorr, vid_pp_rza, dat_pp_rza, dat_sp_rza, vid_sp_rza FROM polnaya WHERE naim_ps = '".$PS."'");
	echo "<table align='center' width='90%' border='1'>
	<tr>
		<td>Присоединение</td>
		<td>Вид ПП</td>
		<td>Год ПП</td>
		<td>Месяц ПП</td>
		<td>Год СП</td>
		<td>Вид ТО</td>
	</tr>";
	while ($row = $res->fetch_assoc()) {
		echo "<tr>";
		$i=0;
		foreach ($row as $row1){
			echo "<td>";
			if($i==2){
				echo substr($row1,0,4) . "</td><td>";
				if (substr($row1,5,1)=='0'){
					echo substr($row1,6,1);
				}else{
					echo substr($row1,5,2);
				}
			}else if ($i==3){
					$year_sp = substr($row1,0,4);
					echo $year_sp;
			}else if ($i==4){
					if ($year_sp != $this_year){
						echo 'О';
					} else {echo $row1;}
			}else{echo $row1;}
			echo "</td>";
			$i++;
		}
		echo "</tr>";
	}
	echo "</table>"; 
	echo '<P style="page-break-after:always">';
	}
?>