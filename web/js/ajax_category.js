$(document).ready(function(){
    $('#form_categories').on('submit', function(e){
        e.preventDefault();

        let search = $("#form_categories select").val()
        let prodAjax = search.info
        
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

                response.forEach(product => {
                    let content = `
                    <div class="col mb-5">
                    <div class="card h-100">
                        <!-- Product image-->
                        <img class="card-img-top" src="${product.image}" alt="${product.name}" width='180' />
                        <!-- Product details-->
                        <div class="card-body p-4">
                            <div class="text-center">
                                <!-- Product name-->
                                <h5 class="fw-bolder">${product.name}</h5>
                                <!-- Product price-->
                                tipo: ${product.category}<img src="${product.icon}" alt="${product.name}" width="30">
                            </div>
                        </div>
                    </div>    
                    </div>
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
