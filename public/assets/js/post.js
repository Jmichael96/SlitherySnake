$(document).ready(function () {
    // let playerForm = document.getElementById('playerForm');
    // let name = document.getElementById('name');
    $(function () {

        $('#playerForm').on('submit', (event) => {
            event.preventDefault();
            console.log('form submitted');
            let name = $('#name').val();

            if (!name) {
                console.log('please fill out this form')
                document.getElementById('error').innerText = 'Please fill out your name'
            }
            else if (name) {
                $.ajax('/player', {
                    name: name
                })
                console.log('name submitted');
                resetForm();
            };
        });
        function resetForm() {
            $('#name').val('');
        };
    });
});