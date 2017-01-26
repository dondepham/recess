// PIC40A FINAL PROJECT
// file: final.css
// author: Don Pham
// date: December 10, 2016


function do_ajax_stuff(query_string) 
{
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () 
    {

        if (xhr.readyState == 4 && xhr.status == 200) 
        {
            var result = xhr.responseText;
            display_result(result);

        }
    }	

    alert("query string is: " + query_string);
    xhr.open("GET", "http://pic.ucla.edu/~dtpham/vote.php?" + query_string,true);
    xhr.send(null);
}
















var modal = document.getElementById('infoModal');
var cModal = document.getElementById('cForm-modal');

// location of timer display
var counter = document.getElementById("breakTime");


// array of possible choices
var minChoice = [5, 10, 15, 0];
// empty string to store user inputted URL
var urlChoice = "";

// final times used in output function;
var utime;

function updateArray(){
    var customMin = parseInt(document.getElementById("cValue").value);
    minChoice[3] =  customMin;
    utime = minChoice[3];
}

// info Modal, onclick
var btn = document.getElementById("infoBtn");
btn.onclick = function() {
    modal.style.display = "block";
};

// custom Modal, onclick
var cbtn = document.getElementById("cTime");
cbtn.onclick = function() {
    cModal.style.display = "block";
};

// clicking cancel button closes customModal
var cCancel = document.getElementById('cCancel');
cCancel.onclick = function() {
    cModal.style.display = "none";
};

// custom modal button updates uTime and closes modal
var cEnter = document.getElementById('cEnter');
cEnter.onclick = function() {
    updateArray();
    show_form();
    cModal.style.display = "none";
};

// workaround for poor button/form design
// allows URL bar to be entered via "enter" key
document.getElementById("enterURL")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode == 13) {
        document.getElementById("goBtn").click();
    }
});

var span = document.getElementsByClassName("close")[0];
// clicking X closes modal
span.onclick = function() {
    modal.style.display = "none";
};
// clicking outside modal closes modal
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

// close custom time modal
var spanC = document.getElementsByClassName("closeC")[0];
spanC.onclick = function() {
    cModal.style.display = "none";
};

// reveal URL bar
function show_form(){
    document.getElementById("reveal").style.display="block";
    document.getElementById("breakTime").innerHTML = "BREAK TIME: " + utime + ":00";

};

function hide_form(){
    document.getElementById("reveal").style.display="hide";
}


// Assign times to predefined times
function perform_task(c){
    if (c==1){utime = minChoice[0]; show_form();}
    if (c==2){utime = minChoice[1]; show_form();}
    if (c==3){utime = minChoice[2]; show_form();}
};


// TIMER FUNCTION
function countdown(minutes) {
    var seconds = 60;
    var mins = minutes;
    function tick() {
        var current_mins = mins-1;
        seconds--;
        
        counter.innerHTML =
        "TIME LEFT: " + current_mins.toString() + ":" + (seconds < 10 ? "0" : "") + String(seconds);
        
        if(seconds > 0) {
            setTimeout(tick, 1000);
        } else {
            if(mins > 1){
               setTimeout(function () {countdown(mins - 1);}, 1000);
            }
        }
    }
    tick();
}

// workaround for poor button/form design
// allows cValue form to be entered via "enter" key
document.getElementById("cValue")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode == 13) {
        document.getElementById("cEnter").click();
    }
});

        
// load new tab, exit after x seconds
var go = document.getElementById("goBtn");
    go.onclick = function() {
        var urlstr = ("http://") + (document.getElementById("enterURL").value);
        var wnd = window.open(urlstr);
        parseInt(utime);
        wnd.onload = setTimeout(function() {wnd.close();}, (utime * 60000));
        wnd.onload = countdown(utime);
        return false;
};


// hide/show preferences form if checked
var prefCheck = document.getElementById("savePref");
var showPref = document.getElementById("reveal-if-checked");
prefCheck.onclick = function () {
    if (prefCheck.checked) {
        showPref.style.display = "block";
    } else {
        showPref.style.display = "none";
    }
}