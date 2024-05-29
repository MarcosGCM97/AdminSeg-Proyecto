$(document).ready(function(){

    ajax_post()

});
function ajax_post(){
    $('#input_text').keyup(function(){
        let search = $("#input_text").val()
        
        $.post('/ajax_name', {info:search}, function(data){
            
            $('#resultado2').empty();

            if($('#resultado2').empty()){
                
                data.forEach(prod => {
                    let content = `<center>
                            <img src="${prod.image}" alt="${prod.name}" width="180">
                            <p>${prod.name} - tipo: ${prod.category.name}<img src="${prod.category.icon}" alt="${prod.name}" width="30"></p>
                        </center>`
                    
                    $("#resultado2").append(content)
                })
            } else {
                
                data.forEach(prod => {
                    
                    if($("#input_text").val() != ''){
                        let content = `<div>    
                                <img src="${prod.image}" width="180">
                                <p>${prod.name}</p>
                                <p>TIPO: ${prod.category.name}</p>
                                <img src="${prod.category.icon}"  width="30">
                            <div>`
                        
                        $("#resultado2").append(content)
                    }
                });
            }
        })
    })
}
