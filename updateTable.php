<?php
	$response = ($_POST['my_data']);
	//echo $response;
	$obj = json_decode($response);
	$mysqli = new mysqli("localhost", "rza", "654321", "csv_db");
	if ($mysqli->connect_errno) {
    echo "Не удалось подключиться к MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
	}
	
	$mysqli->set_charset('utf8');
	
	$sql = "UPDATE polnaya SET 
	naim_ps = '".$obj->naim_ps."', 
	naim = '".$obj->naim."', 
	iacheika = '".$obj->iacheika."', 
	tip_iach = '".$obj->tip_iach."', 
	tip_vik = '".$obj->tip_vik."', 
	tip_priv = '".$obj->tip_priv."', 
	tip_vik = '".$obj->tip_vik."', 
	tip_tr_ra = '".$obj->tip_tr_ra."', 
	s_tr_ra = '".$obj->s_tr_ra."', 
	tip_tt = '".$obj->tip_tt."', 
	k_tt = '".$obj->k_tt."', 
	klass_tt = '".$obj->klass_tt."', 
	zn_tt = '".$obj->zn_tt."', 
	tip_tn = '".$obj->tip_tn."', 
	k_tn = '".$obj->k_tn."', 
	klass_tn = '".$obj->klass_tn."', 
	zn_tn = '".$obj->zn_tn."', 
	period_rza = '".$obj->period_rza."', 
	period_pri = '".$obj->period_pri."', 
	tip_prib1 = '".$obj->tip_prib1."', 
	tip_prib2 = '".$obj->tip_prib2."', 
	tip_prib3 = '".$obj->tip_prib3."', 
	dat_pp_pri = '".$obj->dat_pp_pri."', 
	vid_pp_rza = '".$obj->vid_pp_rza."', 
	dat_pp_rza = '".$obj->dat_pp_rza."', 
	dat_po_rza = '".$obj->dat_po_rza."', 
	ispoln = '".$obj->ispoln."' 
	WHERE stroka = '".$obj->stroka."';";
	
	if(!$mysqli->query($sql)){
		die('updating error!'.$mysqli->error);
	}
	else {echo 1;}

?>

