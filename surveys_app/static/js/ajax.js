const get_data = () => {
    $.get({
        url: "ajax_get",
        success: function(data){
            console.log(data);
        }
    })
};