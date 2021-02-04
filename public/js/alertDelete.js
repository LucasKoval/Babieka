window.addEventListener("load",function(){
    let button = document.querySelector("button.salir");
    let alert = document.querySelector(".modal-content");
    let modal = document.querySelector(".modal");
    let buttonFlex = document.querySelector("button.displayFlex");

    let modalBlur =(element)=>{
        return element.style.backdropFilter="blur(10px)"
    }

    let modalBlock =(element)=>{
        return element.style.display="block"
    }

    let displayFlex =(element)=>{
        return element.style.display="flex"
    }

    let displayNone = (element )=>{
        return  element.style.display="none"
    }

    let modalNone = (element )=>{
        element.style.display="none"
        return  element.style.backdropFilter="none"
    }

    buttonFlex.addEventListener("click",function(){
        modalBlur(modal)
        modalBlock(alert)
        displayFlex(modal)
    })

    button.addEventListener("click",function(){
        displayNone(alert)
        modalNone(modal)
    })

    window.addEventListener("keydown",function(e){
        if(e.charCode == 0){
            displayNone(alert)
            modalNone(modal)
        }
    })
})