$(document).ready(function(){
    $('#form_categories').on('submit', function(e){
        e.preventDefault();

        let search = $("#form_categories select").val()
        $.ajax({
            url: '/ajax_category',
            type: 'GET',
            data: {info:search},
            beforeSend: function(){
                $("resultado2").text('en proceso')
            },
            success: function(response) {
                $('#form_categories').val('')
                $("#resultado2").empty();

                response.forEach(prod => {
                    let content = `
                            <center>
                                <img src="${prod.image}" alt="${prod.name}" width="180">
                                <p>${prod.name} - tipo: ${prod.category}<img src="${prod.icon}" alt="${prod.name}" width="30"></p>
                            </center>
                        `;
                        $('#resultado2').append(content)
                });
            },
            error: function(){

            },
            complete: function(){

            }

            
        });
    })
})
