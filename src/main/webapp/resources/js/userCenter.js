//侧栏导航切换
$(".sidebar-menu>li").click(function(){
    const target =  $(this);
    const dataName =target.attr("name");
    const section = $(`.content-wrapper>section[data-name='${dataName}']`);
    var password = document.getElementById("password");
    var email = document.getElementById("email");
    var joinPartyContact = document.getElementById("joinPartyContact");
    if(password.value!=""&&email.value!=""&&joinPartyContact.value!="")
    {
        $("#password").attr("disabled", "true");
        $("#email").attr("disabled", "true");
        $("#joinPartyContact").attr("disabled", "true");
        var save = document.getElementById("savePersonData");
        var back = document.getElementById("Return");
        save.style.display="none";
        back.style.display="block";
    }
    section.show().siblings("section").hide();
    target.addClass("active").siblings("li").removeClass("active");
});

//上传文件
$("#inputFile").click(function(){
  $(this).siblings("input[name='file']").click();
});

//删除节点
$(".remove").click(function(){
  $(this).parent().parent().remove();
  
})

$(".return").click(function(){
    const dataName ="userManage";
    const section = $(`.content-wrapper>section[data-name='${dataName}']`);
    section.show().siblings("section").hide();
    target.addClass("active").siblings("li").removeClass("active");
})