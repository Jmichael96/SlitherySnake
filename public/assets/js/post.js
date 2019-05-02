$(document).ready(function () {

    let playerForm = document.getElementById('playerForm');
    
    playerForm.on('submit', (event) => {
        event.preventDefault();

        let playerName = {
            name: name.val().trim(),
        };

        player(playerName);
    });
    function player(playerName) {
        $.ajax({
            method: 'POST',
            url: '/player',
            data: playerName
        })
        .then((data) => {
            window.location.replace(data);
        });
    };
});