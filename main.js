/**
 * Created by liu on 17-3-31.
 */
const MAIN_TIME = 300;
const PAUSE_TIME = 120;
const DEBUG_TIME = 60;
const LAYOUT_TIME = 120;
const TRANSITION_TIME = 180;
const LATE_TIME = 600;
const AUDIO_TIME = 10;

var transition_late_flag = false;

var $audio_timer = $('#audio-timer');

function startTimerAudio() {
    $audio_timer[0].play();
}

function stopTimeAudioTimeout(timeout) {
    var count = $audio_timer.data('count');
    $audio_timer.data('count', ++count);
    setTimeout(function () {
        if (count === $audio_timer.data('count')) $audio_timer[0].pause();
    }, timeout);
}

function stopTimerAudio() {
    stopTimeAudioTimeout(0);
}

//startTimerAudio();

function onInterval() {
    var time = this.factory.getTime().time;
    if (this.factory.audioFlag)return;
    if (time > 0 && time <= AUDIO_TIME) {
        this.factory.audioFlag = true;
        startTimerAudio();
        stopTimeAudioTimeout(time * 1000);
    }
}

var clock_main = $('#clock-main').FlipClock(0, {
    countdown: true,
    autoStart: false,
    clockFace: 'MinuteCounter',
    callbacks: {
        interval: onInterval
    }
});

var clock_debug = $('#clock-debug').FlipClock(0, {
    countdown: true,
    autoStart: false,
    clockFace: 'MinuteCounter'
});

var clock_left_pause = $('#clock-left-pause').FlipClock(0, {
    countdown: true,
    autoStart: false,
    clockFace: 'MinuteCounter'
});

var clock_right_pause = $('#clock-right-pause').FlipClock(0, {
    countdown: true,
    autoStart: false,
    clockFace: 'MinuteCounter'
});

function stopAllClock() {
    clock_debug.stop();
    clock_main.stop();
    clock_left_pause.stop();
    clock_right_pause.stop();
    $('#btn-start').find('i').removeClass('fa-stop');
    $('#btn-debug').find('i').removeClass('fa-stop');
    $('#btn-left-pause').find('i').removeClass('fa-stop');
    $('#btn-right-pause').find('i').removeClass('fa-stop');
    clock_main.stopFlag = true;
    clock_debug.stopFlag = true;
    clock_left_pause.stopFlag = true;
    clock_right_pause.stopFlag = true;
    clock_main.audioFlag = false;
    clock_debug.audioFlag = false;
    clock_left_pause.audioFlag = false;
    clock_right_pause.audioFlag = false;
    stopTimerAudio();
}

function initLayout() {
    $('#text-main').html('自由摆放剩余时间');
    $('.pause-wrapper').hide();
    $('.debug-wrapper').show().addClass('offset-4');
    $('#btn-switch').hide();
    $('#btn-start').removeClass('mr-1');
    clock_main.reset();
    clock_main.setTime(LAYOUT_TIME);
    clock_debug.reset();
    clock_debug.setTime(DEBUG_TIME);
    stopAllClock();
}

function initRace() {
    $('#text-main').html('比赛剩余时间');
    $('.pause-wrapper').show();
    $('.debug-wrapper').show().removeClass('offset-4');
    $('#btn-switch').hide();
    $('#btn-start').removeClass('mr-1');
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

function initTransition() {
    $('#text-main').html('过渡时间');
    $('.pause-wrapper').hide();
    $('.debug-wrapper').hide();
    $('#btn-switch').show();
    $('#btn-start').addClass('mr-1');
    clock_main.reset();
    clock_main.setTime(TRANSITION_TIME);
    stopAllClock();
}

function initLate() {
    $('#text-main').html('迟到倒计时');
    $('.pause-wrapper').hide();
    $('.debug-wrapper').hide();
    $('#btn-switch').show();
    $('#btn-start').addClass('mr-1');
    clock_main.reset();
    clock_main.setTime(LATE_TIME);
    stopAllClock();
}

initLayout();

$('#btn-start').on('click', function () {
    if (clock_main.stopFlag) {
        stopAllClock();
        clock_main.stopFlag = false;
        clock_main.start();
        $('#btn-start').find('i').addClass('fa-stop');
    }
    else {
        stopAllClock();
    }
});

$('#btn-debug').on('click', function () {
    if (clock_debug.stopFlag) {
        stopAllClock();
        clock_debug.stopFlag = false;
        clock_debug.start();
        $('#btn-debug').find('i').addClass('fa-stop');
    }
    else {
        stopAllClock();
    }
});

$('#btn-left-pause').on('click', function () {
    if (clock_left.stopFlag) {
        stopAllClock();
        clock_left_pause.stopFlag = false;
        clock_left_pause.start();
        $('#btn-left-pause').find('i').addClass('fa-stop');
    }
    else {
        stopAllClock();
    }
});

$('#btn-right-pause').on('click', function () {
    if (clock_right.stopFlag) {
        stopAllClock();
        clock_right_pause.stopFlag = false;
        clock_right_pause.start();
        $('#btn-right-pause').find('i').addClass('fa-stop');
    }
    else {
        stopAllClock();
    }
});

$('#btn-layout').on('click', initLayout);
$('#btn-race').on('click', initRace);
$('#btn-transition').on('click', initTransition);
$('#btn-switch').on('click', function () {
    if (transition_late_flag = !transition_late_flag) initLate();
    else initTransition();
});

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
