function presetUp(){
    let address = $("#address").val();
    let port = $("#port").val();
    let user = $("#user").val();
    let password = $("#password").val();
    let rootUser = $("#root-user").val();
    let rootpassword = $("#root-password").val();
    if(address && port && user && password && rootUser && rootpassword){
        let data = {
             address : address,
             port :port,
              user :user,
              password :password,
             rootUser :rootUser,
             rootpassword :rootpassword,  

        }
        startSetUP(data)
    }
    else{
        $("#alert-danger").removeClass("alert-danger");
        $("#alert-danger").removeClass("alert-success");
        $("#alert-danger").addClass("alert-danger");
        $("#alert-danger").empty();
        $("#alert-danger").css("display", "block");
        $("#alert-danger").append("Fiil in the fields");

    }
}
function startSetUP(data){
    console.log(data)
    $.ajax({
        type: "POST", 
        url:"/install",
        headers : {"Content-Type": "application/json"},
        data : JSON.stringify(data),
        sucess: function(res){
            $("#alert-danger").removeClass("alert-danger");
            $("#alert-danger").removeClass("alert-success");
            $("#alert-danger").addClass("alert-success");

        },
        error : function(err){
            $("#alert-danger").removeClass("alert-danger");
            $("#alert-danger").removeClass("alert-success");
            $("#alert-danger").addClass("alert-danger");
            $("#alert-danger").empty();
            $("#alert-danger").css("display", "block");
            $("#alert-danger").append(err);

        }

    });

}