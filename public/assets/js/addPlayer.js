// player score and name submission
$(function () {
    $('#playerForm').on('submit', (event) => {
        event.preventDefault();
        // getting the value of the name input and assigning it to the 'name' variable
        let name = $('#name').val();

        // if there is not a name render an error message and stop the form process
        if (!name) {
            document.getElementById('message').innerHTML = '<span class="formErr" style="color: red;">Please enter a name</span>';
            return;
        }
        // else if the name is less than 2 chars or greater than 11 chars render an error message and stop the process
        else if (name.length < 2 || name.length > 11) {
            console.log('must have more than 1 charcter and less than 11');
            document.getElementById('message').innerHTML = '<span class="formErr" style="color: red;">Your name must be between 2 and 11 characters</span>';
            return;
        }
        // getting the values and assigning them to the gameData object
        let gameData = {
            name: name,
            score: topScore
        }
        // sending a post request to the server and saving the game data
        $.ajax('/add_player', {
            method: 'POST',
            url: '/add_player',
            data: gameData
        })
            .then((data) => {
                document.getElementById('message').innerHTML = '<span class="formSuccess" style="color: green;">Submitted successfully</span>';
                resetForm();
            })
            .catch((err) => {
                document.getElementById('message').innerHTML = '<span class="formErr" style="color: red;">There was an error processing this request. Please try again later.</span>';
                throw err;
            });
    });

    // resetting the form values upon success
    function resetForm() {
        $('#name').val('');
    };
});

