
var curDiv=document.getElementById('welcomeDiv');

function show(param_div_id) {
    curDiv.style.display = "none";
    curDiv=document.getElementById(param_div_id);
    document.getElementById(param_div_id).style.display = "block";
    //document.getElementById('welcomeDiv').innerHTML = document.getElementById(param_div_id).innerHTML;
}

$( "#register" ).click(function() {
    show('registerDiv')
});

$( "#login" ).click(function() {
    //show('loginDiv')
    show('gameDiv');
    beginGame();
});

$( "#about" ).click(function() {
    modal.style.display = "block";
    document.onkeydown = function(evt) {
        evt = evt || window.event;
        if (evt.keyCode == 27) {
            modal.style.display = "none";
        }
    };
});



$( "#game" ).click(function() {
    show('aboutDiv');
    beginGame();

});

var modal = document.getElementById("myModal");
// Get the <span> element that closes the modal
var closeSpan = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
closeSpan.onclick = function() {
    modal.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}