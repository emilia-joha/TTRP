
$("header").on("click", function(){
    let foldable = $(this).siblings(".foldable")
    if (foldable.css("display") == "block") {
        foldable.css("display","none");
        } else {
            foldable.css("display", "block");
        }
})
