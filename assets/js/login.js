$(function () {
  $("#link_reg").on("click", function () {
    $(".login-box").hide();
    $(".reg-box").show();
  });
  $("#link_login").on("click", function () {
    $(".login-box").show();
    $(".reg-box").hide();
  });
  // 请求成功之后提示用户
  //获取到layer内置模块

  //发起ajax请求
  var layer = layui.layer;
  $("#from_reg").submit(function (e) {
   
    e.preventDefault();
  
  let data = {username : $('#from_reg [name=username]').val(),password : $('#from_reg [name=password]').val()} 
  
    $.ajax({
      method: "POST",
      url: "/api/reguser",
     
      //快速获取表单中的数据
      data: data,

      success: function (res) {
        console.log(res);
        if (res.status !== 0) {
          return layer.msg(res.message);
        }

        layer.msg("注册成功 ，请登录");
        $("#link_login").click();
      },
    });
  });
});
$("#from_login").submit(function (e) {
 
  e.preventDefault();

  $.ajax({
    url: "/api/login",
    method: "POST",
    data: $(this).serialize(),
    success: function (res) {
      console.log(res);
      if (res.status !== 0) {
        return layer.msg("登录失败");
      }
      layer.msg("登录成功");
      localStorage.setItem("token", res.token);
      location.href = "/index.html";
    },
  });

  //自定义校验规则
  var form = layui.form;
  form.verify({
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    repwd: function (value) {
      var pwd = $("#usepwd").val();
      if (pwd !== value) {
        return "两次密码不一致";
      }
    },
  });
});
