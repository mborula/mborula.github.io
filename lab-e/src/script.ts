const msg: string = "Hello!";
alert(msg);

const link = document.createElement("link");
link.rel = "stylesheet";
link.href = "style-1.css";
document.head.appendChild(link);



const styles = ["style-1.css","style-2.css","style-3.css"]

function loadStyle(value){
    link.href = value
}
function createStyleSwitcher(){
    const switcher = document.createElement("div");
    switcher.className = "style-switcher";
    document.body.appendChild(switcher);
    let i = 1
    styles.forEach((value) =>{
        const button = document.createElement("button");
        button.textContent = "Styl " + i;
        button.className = "style-button"
        button.addEventListener("click", () => {
            loadStyle(value);
        });
        switcher.appendChild(button);
        i += 1;
    })
}


createStyleSwitcher()




