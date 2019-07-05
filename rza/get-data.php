<!DOCTYPE HTML>
<html>
 <head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  </head>
  <body>
  
  <?php
$mysqli = new mysqli("localhost", "root", "1904194831", "csv_db");
if ($mysqli->connect_errno) {
    echo "Не удалось подключиться к MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}

/*if (!$mysqli->query("DROP TABLE IF EXISTS test") ||
    !$mysqli->query("CREATE TABLE test(id INT)") ||
    !$mysqli->query("INSERT INTO test(id) VALUES (1), (2), (3)")) {
    echo "Не удалось создать таблицу: (" . $mysqli->errno . ") " . $mysqli->error;
}
*/
$mysqli->set_charset('utf8');
$res = $mysqli->query("SELECT naim_ps, naim FROM polnaya;");

$result=$res->fetch_assoc();
echo $result['naim_ps'] . ", " . $result['naim'];
echo json_encode($result);
//$datajson = json_encode($data);
/* echo "Обратный порядок...\n";
for ($row_no = $res->num_rows - 1; $row_no >= 0; $row_no--) {
    $res->data_seek($row_no);
    $row = $res->fetch_assoc();
    echo " id = " . $row['id'] . "\n";
}

echo "Исходный порядок строк...\n";
$res->data_seek(0);
while ($row = $res->fetch_assoc()) {
    echo " id = " . $row['id'] . "\n";
} */
?>

  </body>
  </html>
