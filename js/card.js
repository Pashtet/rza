  var json_data, PS, MF;
//  window.onload = function () {
	PS = localStorage.getItem('PS');
	MF = localStorage.getItem('MF');
	console.log(PS+" "+MF);
//  }
  
  $.ajax({
    url: '../card.php',
    type: 'POST',
    data: {'PS':PS,'MF':MF},
    dataType: 'json'
}).done(function(data){
    console.log(data);
	json_data = data;
	$(function(){
		$('td').each(function(){
			if(this.hasAttribute("id")){//если есть атрибут в таблице
				var temp = $(this).attr("id");//берем данный элемент
				$('#' + temp).html(data[temp]);//изменяем его данные
			};
		});
	});
	
}).fail(function(dataError){
	console.log('fail');
    console.log(dataError);
});

$(function()	{
	$('td').dblclick(function(e)	{//ловим элемент, по которому кликнули два раза
		var t = e.target || e.srcElement;
		if(!t.hasAttribute("id")) {return false;}//если у элемента таблицы нет поля id - значит это просто надпись

		var attrib = $(this).attr("id");//получаем название тега
		var val = $(this).html();//текст, который был в поле
		var code = '<input type="text" id="edit" value="'+val+'" />';//создаем новое поле для редактирования
		$(this).empty().html(code);//очищаем и заменяем поле таблицы на новое
		$('#edit').focus();//получается, что $(this) это уже полностью новый элемент
		$('#edit').blur(function()	{//после того, как снимается фокус, заменяем поле таблицы и отправляем измененные данные
			var val = $(this).val();
			$(this).parent().empty().html(val);
			json_data[attrib]=val;// меняем поле в данных пересылаемых
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