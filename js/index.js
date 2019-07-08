var isPS = isunit = isUnit = isDevice = false;
var listFiles = "";
var search = "",
	PS = "",
	unit = "";

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
                goToCard();
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

function clearFields(){
    
    console.log("ClearFields")
    document.getElementById("PS").value = "";
    document.getElementById("unit").value = "";
    document.getElementById("unitList").innerHTML = " ";
    
}
function goToCard(){
	
	localStorage.setItem('PS', PS);
	localStorage.setItem('unit', unit);
	window.open('rza/card.html');
}

/* function sendSearchRequest() {

    var searchTextForPS = document.getElementById("PS"),//$("#PS"),
    searchTextForunit = document.getElementById("unit"),
    searchDate = document.getElementById("searchDate");//$("#searchDate");
    listFiles="";

    if (searchTextForPS.value.length > 0) {
        $.post("GetSearchResponse", {'searchTextForPS': searchTextForPS.value, 'searchTextForunit':searchTextForunit.value, 'searchDate': searchDate.value}, function (data) {
            data = JSON.parse(data);
            console.log(data);
            if (data.length != undefined && data.length > 0) {
                var divTable = document.getElementById("searchResult"),
                        table = document.createElement("table");
                divTable.innerHTML = "";
                table.setAttribute("border", "1");
                table.id = "tableForSearchResponse";
                var row, cell;
                for (var i = 0; i < data.length; i++) {
                    row = table.insertRow(i);
                    for (var j = 0; j < data[i].length - 1; j++) {
                        cell = row.insertCell(j);
                        cell.innerHTML = data[i][j];
                    }
                    cell = row.insertCell(data[i].length - 1);
                    var link = document.createElement("a");
                    var linkString = data[i][data[i].length - 1].toString();
                    linkString = linkString.substring(3);
                    //linkFiles
                    link.href = linkString;
                    link.innerHTML = "Скачать";
                    cell.appendChild(link);
                }
                var link = document.createElement("a");
                link.href="\Temp\\osc.zip";
                link.innerHTML="Скачать все"
                divTable.appendChild(table);
                divTable.appendChild(link);
            } else {
                document.getElementById("searchResult").innerHTML = "<p> Данные не найдены!</p>";
            }
        });
    } else {
        document.getElementById("searchResult").innerHTML = "";
        alert("Введите данные для поиска!");
    }

} */


