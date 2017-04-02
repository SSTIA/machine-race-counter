/**
 * Created by liu on 17-3-31.
 */
const MAIN_TIME = 300;
const PAUSE_TIME = 120;
const DEBUG_TIME = 60;
const LAYOUT_TIME = 120;

var clock_main = $('#clock-main').FlipClock(0, {
    countdown: true,
    autoStart: false,
    clockFace: 'MinuteCounter'
});
var clock_main_stop = true;

var clock_debug = $('#clock-debug').FlipClock(0, {
    countdown: true,
    autoStart: false,
    clockFace: 'MinuteCounter'
});
var clock_debug_stop = true;

var clock_left_pause = $('#clock-left-pause').FlipClock(0, {
    countdown: true,
    autoStart: false,
    clockFace: 'MinuteCounter'
});
var clock_left_pause_stop = true;

var clock_right_pause = $('#clock-right-pause').FlipClock(0, {
    countdown: true,
    autoStart: false,
    clockFace: 'MinuteCounter'
});
var clock_right_pause_stop = true;

function stopAllClock() {
    clock_debug.stop();
    clock_main.stop();
    clock_left_pause.stop();
    clock_right_pause.stop();
    $('#btn-start').find('i').removeClass('fa-stop');
    $('#btn-debug').find('i').removeClass('fa-stop');
    $('#btn-left-pause').find('i').removeClass('fa-stop');
    $('#btn-right-pause').find('i').removeClass('fa-stop');
    clock_main_stop = true;
    clock_debug_stop = true;
    clock_left_pause_stop = true;
    clock_right_pause_stop = true;
}

function initLayout() {
    $('#text-main').html('自由摆放剩余时间');
    $('.pause-wrapper').hide();
    $('.debug-wrapper').addClass('offset-4');
    clock_main.reset();
    clock_main.setTime(LAYOUT_TIME);
    clock_debug.reset();
    clock_debug.setTime(DEBUG_TIME);
    stopAllClock();
}

function initRace() {
    $('#text-main').html('比赛剩余时间');
    $('.pause-wrapper').show();
    $('.debug-wrapper').removeClass('offset-4');
    clock_main.reset();
    clock_main.setTime(MAIN_TIME);
    clock_left_pause.reset();
    clock_left_pause.setTime(PAUSE_TIME);
    clock_right_pause.reset();
    clock_right_pause.setTime(PAUSE_TIME);
    clock_debug.reset();
    clock_debug.setTime(DEBUG_TIME);
    stopAllClock();
}

initLayout();

$('#btn-start').on('click', function () {
    if (clock_main_stop) {
        stopAllClock();
        clock_main_stop = false;
        clock_main.start();
        $('#btn-start').find('i').addClass('fa-stop');
    }
    else {
        stopAllClock();
    }
});

$('#btn-debug').on('click', function () {
    if (clock_debug_stop) {
        stopAllClock();
        clock_debug_stop = false;
        clock_debug.start();
        $('#btn-debug').find('i').addClass('fa-stop');
    }
    else {
        stopAllClock();
    }
});

$('#btn-left-pause').on('click', function () {
    if (clock_left_pause_stop) {
        stopAllClock();
        clock_left_pause_stop = false;
        clock_left_pause.start();
        $('#btn-left-pause').find('i').addClass('fa-stop');
    }
    else {
        stopAllClock();
    }
});

$('#btn-right-pause').on('click', function () {
    if (clock_right_pause_stop) {
        stopAllClock();
        clock_right_pause_stop = false;
        clock_right_pause.start();
        $('#btn-right-pause').find('i').addClass('fa-stop');
    }
    else {
        stopAllClock();
    }
});

$('#btn-layout').on('click', initLayout);
$('#btn-race').on('click', initRace);

function selectTemplate(item) {
    return item.id + '# ' + item.text;
}

var teams_arr = {};

for (var i = 0; i < window.teams.length; i++) {
    window.teams[i].text = window.teams[i].id + '# ' + window.teams[i].value;
    teams_arr[window.teams[i].id] = i;
}


var $select_left = $('#select-left');
$select_left.select2({
    data: window.teams,
    placeholder: "---",
    allowClear: true,
    //templateResult: selectTemplate
});

var $select_right = $('#select-right');
$select_right.select2({
    data: window.teams,
    placeholder: "---",
    allowClear: true,
    //templateResult: selectTemplate
});

$select_left.on('select2:select', function (e) {
    var item = window.teams[teams_arr[e.params.data.id]];
    changeTeamName(item.id + '#<br>' + item.value, $('#left-team-name'));
});
$select_left.on('select2:unselect', function (e) {
    changeTeamName('', $('#left-team-name'));
});
$select_right.on('select2:select', function (e) {
    var item = window.teams[teams_arr[e.params.data.id]];
    changeTeamName(item.id + '#<br>' + item.value, $('#right-team-name'));
});
$select_right.on('select2:unselect', function (e) {
    changeTeamName('', $('#right-team-name'));
});
function changeTeamName(name, container) {
    container.html(name);
}
