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
SELECT polnaya.naim_ps, naicorr, vid_pp_rza, dat_pp_rza, dat_sp_rza, vid_sp_rza 
FROM polnaya, ispps WHERE ispps.ispoln='ТРОФИМОВ П.М.' 
AND ispps.naim_ps=polnaya.naim_ps

UPDATE polnaya SET dat_sp_rza=dat_pp_rza + interval 
(SELECT CASE vid_pp_rza WHEN 'Н' THEN (1)
						WHEN '1' THEN ((period_rza/2)-1)
                        WHEN 'К' THEN (period_rza/2)
                        WHEN 'В' THEN (period_rza/2)
                        ELSE 0 END) year 
WHERE stroka = 1;

UPDATE polnaya SET dat_sp_rza=dat_pp_rza + interval 
(SELECT CASE vid_pp_rza WHEN 'Н' THEN (1)
						WHEN '1' THEN ((period_rza/2)-1)
                        WHEN 'К' THEN (period_rza/2)
                        WHEN 'В' THEN (period_rza/2)
                        ELSE 0 END) year ;
						
SELECT * FROM `polnaya` WHERE naim_ps='ЮЖНАЯ' AND naicorr='ТH-110 кВ ВЛ-110 ЮГ-1';
 WHERE naim_ps='ЧАРОМСКОЕ'