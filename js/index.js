include("/js/cookie.js");

var isPS = isunit = isUnit = isDevice = false;
var listFiles = "";
var search, PS,unit;

window.onload = function () {
///////запрос на список подстанций
     $.get("../SelectPS.php", function (data) {
		console.log("Запрос ПС");
        var code = '';
        for (i = 0; i < data.length; i++) {
            code += "<option>" + data[i] + "</option>";
        }
        $("#PSList").html(code);
    });
	
/////////////функция ловит изменения полей input-ов с привязанными list
    var inputs = document.querySelectorAll('input[list]');
    for (var i = 0; i < inputs.length; i++) {
        // Когда значение input изменяется…
        inputs[i].addEventListener('change', function () {
            var optionFound = false,
            datalist = this.list;
            console.log("Поменялось значение: " + this.id);
/////////////////если поменяли значение подстанции
            if (this.id == "PS") {
                console.log("Разбор ПС");
				console.log(this.value);
				PS = this.value;
                document.getElementById("unit").value = "";
				$.ajax({//отправляем запрос на обновление таблицы
					url: '../SelectUnit.php',
					type: 'POST',
					data: {"PS":this.value},
					dataType: 'json',
				})
				.done( function( data ) {
					console.log('done');
					console.log(data);
					console.log("Получены данные о производителе: " +data);
					var code = '';
					for (i = 0; i < data.length; i++) {
                        code += "<option>" + data[i] + "</option>";
                    }
                    $("#unitList").html(code);
				})
				.fail( function( data ) {
					console.log('fail');
					console.log(data);
				});

            }
            
            else if (this.id=="unit"){
				unit = this.value;
            }

            // Определение, существует ли option с текущим значением input.
            for (var j = 0; j < datalist.options.length; j++) {
                if (this.value == datalist.options[j].value) {
                    optionFound = true;
                    break;
                }
            }
            // используйте функцию setCustomValidity API проверки ограничений валидации
            // чтобы обеспечить ответ пользователю, если нужное значение в datalist отсутствует
            if (optionFound) {
                this.setCustomValidity('');

            } else {
                this.setCustomValidity('Please select a valid value.');
                alert("Выберите одно из значений поля: " + this.name);
            }
        });
    }
}

function printPSList (){
	if(PS!=undefined){
		//localStorage.setItem('PS', PS);
		setCookie('PS', PS);
		window.open('rza/printPSList.php');
	}else{ alert("Выберите подстанцию!");}
}

function clearFields(){
    console.log("ClearFields")
	//localStorage.removeItem('PS', PS);
	//localStorage.removeItem('unit', unit);
	deleteCookie('PS'); deleteCookie('unit');
    document.getElementById("PS").value = "";
    document.getElementById("unit").value = "";
    document.getElementById("unitList").innerHTML = " ";
    
}

function goToCard(){
	if(PS!=undefined&&unit!=undefined){
		//localStorage.setItem('PS', PS);
		//localStorage.setItem('unit', unit);
		setCookie('PS', PS);
		setCookie('unit', unit);
		window.open('rza/card.html');
	}else{ alert("Выберите подстанцию и присоединение!");}
}

function include(url) {
	var script = document.createElement('script');
	script.src = url;
	document.getElementsByTagName('head')[0].appendChild(script);
}
