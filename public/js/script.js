'use strict';

//Public Globals
const days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado'];
const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

let c_date = new Date();
let day = c_date.getDay();
let month = c_date.getMonth();
let year = c_date.getFullYear();

(function App() {

    const calendar = `<div class="container">
            <div class="row">
                <div class="col-sm-6 col-12 d-flex p-0">
                    <div class="card border-0 mt-5 flex-fill">
                        <div class="card-header py-3 d-flex justify-content-between">
                            <span class="prevMonth">&#10096;</span>
                            <span><strong id="s_m"></strong></span>
                            <span class="nextMonth">&#10097;</span>
                        </div>
                        <div class="card-body px-1 py-3">
                            <div class="table-responsive">
                                <table class="table table-sm table-borderless">
                                    <thead class="days text-center">
                                        <tr>
                                            ${Object.keys(days).map(key => (
                                                `<th><span>${days[key].substring(0,3)}</span></th>`
                                            )).join('')}
                                        </tr>
                                    </thead>
                                    <tbody id="dates" class="dates text-center"></tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-sm-6 col-12 d-flex">
                    <div class="card border-0 mt-5 flex-fill d-none" id="event">
                        <div class="card-header py-3 text-center">
                            Uber
                            <button type="button" class="close hide">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="card-body px-1 py-3">
                            <div class="text-center">
                                <span class="event-date">06 June 2020</span><br>
                                <input id="data" type="date" class="d-none">
                                <span class="event-day">Monday</span>
                            </div>

                            <div class="row m-p-0">
                                <div class="col-6 text-center">
                                    <label for="#valeriaValor" class="col-12 text-center font-weight-bold">Valeria</label>
                                    <input id="valeriaValor" type="text" class="form-control money intups" placeholder="R$ 0,00">
                                </div>

                                <div class="col-6 text-center">
                                    <label for="#marcosValor" class="col-12 text-center font-weight-bold">Marcos</label>
                                    <input id="marcosValor" type="text" class="form-control money intups" placeholder="R$ 0,00">
                                </div>

                                <div class="col-12 mt-3 text-center">
                                    <button class="btn btn-link text-danger" type="button" id="apagarValores">Apagar</button>
                                    <button class="btn btn-danger" type="button" id="salvarValores">Salvar</button>
                                </div>
                            </div>


                            <div class="events-today my-3 px-3">

                            </div>
                            <div class="input-group events-input mb-3 col-10 mx-auto mt-2">
                                <input type="text" class="form-control intups w-50" placeholder="Add Exceções" id="eventTxt">
                                <input type="text" class="form-control money intups" placeholder="Valor" id="eventValue">
                                <div class="input-group-append">
                                    <button class="btn btn-danger" type="button" id="createEvent">+</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
        <div aria-live="polite" aria-atomic="true" style="position: relative; min-height: 200px;">
            <div class="toast" style="position: absolute; top: 0; right: 15px;" data-delay="3000">
                <div class="toast-header">
                    <strong class="mr-auto">Calendar</strong>
                    <small>Just now</small>
                    <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            </div>
        </div>`;
    document.getElementById('app').innerHTML = calendar;
})()
$('.money').mask('00.000,00', {reverse: true});

function renderCalendar(m, y) {
    //Month's first weekday
    let firstDay = new Date(y, m, 1).getDay();
    //Days in Month
    let d_m = new Date(y, m+1, 0).getDate();
    //Days in Previous Month
    let d_pm = new Date(y, m, 0).getDate();


    let table = document.getElementById('dates');
    table.innerHTML = '';
    let s_m = document.getElementById('s_m');
    s_m.innerHTML = months[m] + ' ' + y;
    let date = 1;
    //remaing dates of last month
    let r_pm = (d_pm-firstDay) +1;
    for (let i = 0; i < 6; i++) {
        let row = document.createElement('tr');
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                let cell = document.createElement('td');
                let span = document.createElement('span');
                let cellText = document.createTextNode(r_pm);
                span.classList.add('ntMonth');
                span.classList.add('prevMonth');
                cell.appendChild(span).appendChild(cellText);
                row.appendChild(cell);
                r_pm++;
            }
            else if (date > d_m && j <7) {
                if (j!==0) {
                    let i = 0;
                    for (let k = j; k < 7; k++) {
                         i++
                        let cell = document.createElement('td');
                        let span = document.createElement('span');
                        let cellText = document.createTextNode(i);
                        span.classList.add('ntMonth');
                        span.classList.add('nextMonth');
                        cell.appendChild(span).appendChild(cellText);
                        row.appendChild(cell);
                    };
                }
               break;
            }
            else {
                let cell = document.createElement('td');
                let span = document.createElement('span');
                let cellText = document.createTextNode(date);
                span.classList.add('showEvent');
                if (date === c_date.getDate() && y === c_date.getFullYear() && m === c_date.getMonth()) {
                    span.classList.add('bg-danger');
                }
                cell.appendChild(span).appendChild(cellText);
                row.appendChild(cell);
                date++;
            }
        }
        table.appendChild(row);
    }
}
renderCalendar(month, year)

    $(function(){

        function showEvent(eventDate){
            let storedEvents = JSON.parse(localStorage.getItem('events'));
            if (storedEvents == null){
                $('.events-today').html('');
            }else{
                let eventsToday = storedEvents.filter(eventsToday => eventsToday.eventDate === eventDate);
                let eventsList = Object.keys(eventsToday).map(k => eventsToday[k]);
                if(eventsList.length>0){
                    let eventsLi ='';
                    eventsList.forEach(event =>  $('.events-today').html(eventsLi +=`<div class="alert excecoes alert-dismissible fade show" role="alert">
                    ${event.eventText} - R$ ${event.eventValue}
                    <button type="button" class="close remove-event" data-event-id="${event.id}" data-dismiss="alert" aria-label="Close">
                      <span class="btn-fechar" aria-hidden="true">&times;</span>
                    </button>
                  </div>`));
                }else{
                    $('.events-today').html('');
                }
            }
        }

        function removeEvent(id){
            let storedEvents = JSON.parse(localStorage.getItem('events'));
            if(storedEvents != null) {
                storedEvents = storedEvents.filter( ev => ev.id != id );
                localStorage.setItem('events', JSON.stringify(storedEvents));
                toastr.error('Exceção removida!');
            }
        }

        $(document).on('click', '.remove-event', function(){
            let eventId = $(this).data('event-id');
            removeEvent(eventId);
        });

        $(document).on('click', '.prevMonth', function(){
            year = (month === 0) ? year - 1 : year;
            month = (month === 0) ? 11 : month - 1;
            renderCalendar(month, year);
            resultadosMes(month, year)
        });
        $(document).on('click', '.nextMonth', function(){
            year = (month === 11) ? year + 1 : year;
            month = (month + 1) % 12;
            renderCalendar(month, year);
            resultadosMes(month, year)
        });

        $(document).on('click', '.showEvent', function(){
            $('.showEvent').removeClass('active');
            $('#event').removeClass('d-none');
            $(this).addClass('active');
            let todaysDate = $(this).text() +' '+ (months[month]) +' '+ year;
            let eventDay = days[new Date(year, month, $(this).text()).getDay()];
            let eventDate = $(this).text() + month + year;
            let data = moment(year +'-'+ (month+1) +'-'+ $(this).text(), "YYYY-MM-DD").format('YYYY-MM-DD');
            $('.event-date').html(todaysDate).data('eventdate', eventDate);
            $('#data').val(data);
            $('.event-day').html(eventDay);

            $.ajax({
                type: "GET",
                url: `https://dividindo-uber.herokuapp.com/public/api/uber/buscar/${data}`,
                success: function(dados){
                    if (dados) {
                        var valeria = (dados.valeria_valor) ? dados.valeria_valor.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) : '';
                        var marcos = (dados.marcos_valor) ? dados.marcos_valor.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) : '';
                        $('#valeriaValor').val(valeria);
                        $('#marcosValor').val(marcos);
                    } else {
                        $('#valeriaValor').val('');
                        $('#marcosValor').val('');
                    }
                }
            });

            showEvent(eventDate);
        });

        $(document).on('click', '.hide', function(){
            $('#event').addClass('d-none');
        });

        $(document).on('click', '#createEvent', function(){
            let events = localStorage.getItem('events');
            let obj = [];
            if (events) {
                obj = JSON.parse(events);
            }
            let eventDate = $('.event-date').data('eventdate');
            let eventText = $('#eventTxt').val();
            let eventValue = $('#eventValue').val();
            let valid = false;
            $('#eventTxt').removeClass('data-invalid');
            $('.error').remove();
            if (eventText == '') {
                $('.events-input').append(`<span class="error">Please enter event</span>`);
                $('#eventTxt').addClass('data-invalid');
                $('#eventTxt').trigger('focus');
            } else if (eventText.length < 3) {
                $('#eventTxt').addClass('data-invalid');
                $('#eventTxt').trigger('focus');
                $('.events-input').append(`<span class="error">please enter at least three characters</span>`);
            } else {
                valid = true;
            }
            if (valid) {
                let id =1;
                if (obj.length > 0) {
                    id = Math.max.apply('', obj.map(function (entry) { return parseFloat(entry.id); })) + 1;
                } else {
                    id = 1;
                }
                obj.push({
                    'id' : id,
                    'eventDate': eventDate,
                    'eventText': eventText,
                    'eventValue': eventValue,
                });
                localStorage.setItem('events', JSON.stringify(obj));
                $('#eventTxt').val('');
                toastr.success('Exceção registrada com sucesso!')
                showEvent(eventDate);
            }
        });

        $(document).on('click', '#salvarValores', function(){
            $('.event-date').val();
            $('.event-day').val();

            function num(valor) {
                if (valor) {
                    valor = valor.replace('R$ ', '');
                    valor = valor.replace('.', '');
                    return valor.replace(',', '.');
                } else {
                    return 0;
                }
            }

            var valeriaValor = num($('#valeriaValor').val());
            var marcosValor = num($('#marcosValor').val());

            if ((valeriaValor == 0)&&(marcosValor == 0)) {
                toastr.error('TESTE!');
                return null;
            }

            var controle = {
                data: $('#data').val(),
                valeria_valor: valeriaValor,
                marcos_valor: marcosValor,
            };

            $.ajax({
                type: "POST",
                url: "https://dividindo-uber.herokuapp.com/public/api/uber/salvar",
                data: controle,
                success: function(data){
                    toastr.success('Registrado com sucesso!')
                },
                error: function(error) {
                    // var error = JSON.parse(error.responseText).error
                    // toastr.error(error)
                }
            });
        });

        $(document).on('click', '#apagarValores', function(){
            $.ajax({
                type: "DELETE",
                url: "https://dividindo-uber.herokuapp.com/public/api/uber/apagar",
                data: {data: $('#data').val()},
                success: function(data){
                    toastr.success('Apagado com sucesso!');
                    $('#valeriaValor').val('');
                    $('#marcosValor').val('');
                },
                error: function(error) {
                    toastr.error('Falha ao Apagar.');
                }
            });
        });
    });


function resultadosMes(mes, ano) {
    mes = String(mes+1);
    if(mes.length < 2) mes = `0${mes}`

    $.ajax({
        type: "GET",
        url: `https://dividindo-uber.herokuapp.com/public/api/uber/mes/${ano}-${mes}`,
        success: function(data){
            $('#dias').html(data.dias);
            $('#total').html('R$ '+data.total);
            $('#mediaTotal').html('R$ '+data.mediaTotal);
            $('#porcentagemValeria').html(data.porcentagemValeria+'%');
            $('#porcentagemMarcos').html(data.porcentagemMarcos+'%');
            $('#somaValeria').html('R$ '+data.somaValeria);
            $('#somaMarcos').html('R$ '+data.somaMarcos);
            $('#mediaValeria').html('R$ '+data.mediaValeria);
            $('#mediaMarcos').html('R$ '+data.mediaMarcos);
        },
        error: function(error) {
            toastr.error('Falha ao exibir a tabela.');
        }
    });
}
resultadosMes(month, year)


