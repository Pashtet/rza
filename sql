SELECT DISTINCT naim_ps FROM polnaya ORDER BY naim_ps ASC;
SELECT * FROM polnaya WHERE naim_ps =  'НИКОЛЬСКОЕ';
UPDATE polnaya SET naim_ps='НИКОЛЬСКОЕ' WHERE naim_ps='HИКОЛЬСКОЕ'
SELECT DISTINCT naicorr FROM polnaya WHERE naim_ps="АНИСИМОВО"ORDER BY naicorr ASC
SELECT stroka, naim_ps, naim, 
	iacheika, tip_iach, 
	tip_vik, tip_priv, 
	tip_tr_ra, s_tr_ra, 
	tip_tt, k_tt, klass_tt, zn_tt, 
	tip_tn, k_tn, klass_tn, zn_tn, 
	period_rza, period_pri, 
	tip_prib1, tip_prib2, tip_prib3, dat_pp_pri, 
	vid_pp_rza, dat_pp_rza, 
	dat_po_rza, ispoln 
	FROM polnaya
	WHERE naim_ps='АБАКАНОВО' AND naicorr='АВР-10';
	
SELECT * FROM polnaya WHERE naim_ps='АБАКАНОВО' AND naicorr='АВР-10';