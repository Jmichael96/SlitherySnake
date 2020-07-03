$(function () {
    $('#statsBtn').on('click', () => {
        let renderPlayers = document.getElementById('allPlayers');

        $.ajax('/api/all_players').then((data) => {
            if (data) {
                renderPlayers.innerHTML = data.allPlayers.map((player, i) => {
                    return (`
                    <div class="allWrap">
                        <p class="allPlace">${i + 1}: </p>
                        <p class="allName">${player.name} with a score of ${player.score}</p>
                       
                    </div>`)
                }).join('');
            }
        })
            .catch((err) => {
                const error = err.response.data.serverMsg;
                renderPlayers.innerHTML = `<p>${error}</p>`;
            });
    });
})