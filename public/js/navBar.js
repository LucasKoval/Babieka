window.addEventListener("load",function(){
    let button = document.querySelector("ul.nav-bar-disblock");
    let icon = document.querySelector("a.space")

    let buttonBlock =(element)=>{
        return element.style.display="block"
    }

    let buttonNone = (element )=>{
        return  element.style.display="none"
    }

    icon.addEventListener("click",function(){
        buttonBlock(button)
    });

    icon.addEventListener("click",function(){
       buttonNone(button)
    });

})