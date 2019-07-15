include("/js/cookie.js");

var json_data, PS, unit, isChangeDatePP;

window.onload = function () {
	
	setCookie('test','test');
	PS = getCookie('PS');
	unit = getCookie('unit');
	console.log(PS+" "+unit);
	
	$.get("../selectIspoln.php", function (data) {
		console.log("Запрос исполнителей");
        var code = '';
        for (i = 0; i < data.length; i++) {
            code += "<option>" + data[i] + "</option>";
        }
        $("#ispolnList").html(code);
    });
	
	$.ajax({
		url: '../card.php',
		type: 'POST',
		data: {'PS':PS,'unit':unit},
		dataType: 'json'
	}).done(function(data){
		console.log(data);
		json_data = data;
		$(function(){
			$('td').each(function(){
				if(this.hasAttribute("id")){//если есть атрибут в таблице
					var temp = $(this).attr("id");//берем данный элемент
					if(temp == 'dat_pp_rza' || temp == 'dat_po_rza'){//если дата меняем формат с YYYY-MM-DD на DD.MM.YYYY
						var tempDate = data[temp];
						tempDate = tempDate.substr(8,2) + '.' + tempDate.substr(5,2) + '.' + tempDate.substr(0,4);
						$('#' + temp).html(tempDate);
					}else{
						$('#' + temp).html(data[temp]);//изменяем его данные
					}
				};
			});
		});
		
	}).fail(function(dataError){
		console.log('fail');
		console.log(dataError);
	});

	$(function(){
		$('td').dblclick(function(e)	{//ловим элемент, по которому кликнули два раза
		
			var t = e.target || e.srcElement;
			if(!t.hasAttribute("id")) {return false;}//если у элемента таблицы нет поля id - значит это просто надпись

			var attrib = $(this).attr("id");//получаем название тега
			var val = $(this).html();//текст, который был в поле
			if (attrib == 'ispoln'){
				var code = '<input id="edit" list="ispolnList"/> <datalist id="ispolnList"></datalist>';
				$(this).empty().html(code);
				console.log(this);
				$.get("../selectIspoln.php", function (data) {
					//console.log("Запрос исполнителей");
					//console.log(data);
					var code1;
					for (i = 0; i < data.length; i++) {
						code1 += "<option>" + data[i] + "</option>";
					}
					$("#ispolnList").html(code1);
				});
			}else{
			var code = '<input type="text" id="edit" value="'+val+'" />';//создаем новое поле для редактирования
			$(this).empty().html(code);//очищаем и заменяем поле таблицы на новое
			}
			$('#edit').focus();//получается, что $(this) это уже полностью новый элемент
			$('#edit').blur(function()	{//после того, как снимается фокус, заменяем поле таблицы и отправляем измененные данные
				var val = $(this).val();
				console.log('blur');
				console.log(val);
				console.log(attrib);
				//если это поле даты - надо изменить дату последнего опробования, дату следующей проверки
				if (attrib=='dat_pp_rza'){
					//console.log("Дата! " + val);
					var vpRza = $('#vid_pp_rza').html();
					var year = +val.substr(6,4);
					var interval = +$('#period_rza').html();
					var new_dat_sp_rza;
					console.log(vpRza);
					switch (vpRza){
						case 'Н':
						year = year + 1;
						json_data['vid_sp_rza']='1';
						break;
						case '1':
						year = (year + interval/2) - 1;
						json_data['vid_sp_rza']='К';
						break;
						case 'В':
						year = year + interval/2;
						json_data['vid_sp_rza']='К';
						break;
						case 'К':
						year = year + interval/2;
						json_data['vid_sp_rza']='В';
						break;
						default:
						year = year + interval/2;
						alert('Не указан вид проверки!');
					}
					new_dat_sp_rza = year + '-' + val.substr(3,2) + '-' + val.substr(0,2);//учитываем изменение формата меняем формат с DD.MM.YYYY на YYYY-MM-DD
					json_data['dat_sp_rza']=new_dat_sp_rza;
					$("#dat_po_rza").empty().html(val);
					json_data['dat_po_rza']=val.substr(6,4) + '-' + val.substr(3,2) + '-' +val.substr(0,2);
					json_data[attrib]=val.substr(6,4) + '-' + val.substr(3,2) + '-' +val.substr(0,2);// с учетом формата
				}else if (attrib == 'dat_po_rza'){
					json_data[attrib]=val.substr(6,4) + '-' + val.substr(3,2) + '-' +val.substr(0,2);// с учетом формата
				}else{
					console.log(attrib);
					console.log(val);
					json_data[attrib]=val;// без учета формата
				}
				console.log(this);
				$(this).parent().empty().html(val);
				
				var json_data_update = JSON.stringify(json_data);
				//console.log(JSON.stringify(json_data));
				
				$.ajax({//отправляем запрос на обновление таблицы
					url: '../updateTable.php',
					type: 'POST',
					data: {"my_data":json_data_update},
					dataType: 'json',
				})
				.done( function( data ) {
					console.log('done');
					console.log(data);
				})
				.fail( function( data ) {
					console.log('fail');
					console.log(data);
				});
				
			});
		});
	});

	$(window).keydown(function(event){
		//ловим событие нажатия клавиши
		if(event.keyCode == 13) {	//если это Enter
			$('#edit').blur();	//снимаем фокус с поля ввода
		}
	});
}

function include(url) {
    var script = document.createElement('script');
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
}
