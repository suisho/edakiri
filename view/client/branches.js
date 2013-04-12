(function($){
  //$("#branches")
  refresh = function(){
    $.ajax({
      url : "/git/branches",
      dataType : "json",
      success : function(r){
        console.log(r);
      }
    })
  }
  refresh()
})(jQuery)