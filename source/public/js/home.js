function goto() {
    var name = document.getElementById('room').value;
    location.href = 'at/' + encodeURIComponent(name);
}
