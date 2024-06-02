$(document).ready(function(){

    ajax_post()

});
function ajax_post(){
    $('#input_text').keyup(function(){
        let search = $("#input_text").val()
        
        $.post('/ajax_name', {info:search}, function(data){
            
            $('#resultado2').empty();

            if($('#resultado2').empty()){
                
                data.forEach(product => {
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
                                tipo: ${product.category.name}<img src="${product.category.icon}" alt="${product.name}" width="30">
                            </div>
                        </div>
                    </div>    
                    </div>`
                    
                    $("#resultado2").append(content)
                })
            } else {
                
                data.forEach(product => {
                    
                    if($("#input_text").val() != ''){
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
                                    tipo: ${product.category.name}<img src="${product.category.icon}" alt="${product.name}" width="30">
                                </div>
                            </div>
                        </div>    
                        </div>`
                        
                        $("#resultado2").append(content)
                    }
                });
            }
        })
    })
}
