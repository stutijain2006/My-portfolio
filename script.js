document.querySelector('.links').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId= this.getAttribute('href').substring(1);
        const targetSection= document.getElementById(targetId);
    })

    if (targetSection){
        targetSection.scrollIntoView({ behavior: 'smooth' });
    }
})

document.getElementById("downloadresume").addEventListener("click", function(){
    const link= document.createElement("a");
    link.href= "Resume_Stuti_Jain.pdf";
    link.download= "Resume_Stuti_Jain.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

document.addEventListener('DOMContentLoaded',() =>{
    const form= document.getElementById('contactForm')
    const message= document.getElementById('formMessage')
    form.addEventListener('submit', async(e)=> {
        e.preventDefault();

        message.style.display= 'block';
        setTimeout(() =>{
            message.style.display ='None';
        },3000);

        const formData= new FormData(form);
        const data= Object.fromEntries(formData.entries());

       try{
        await fetch("@@FORM_ENDPOINT@@", {
            method: "POST",
            headers: {
                Accept: 'application/json'
            },
            body: formData
        });

        if (Response.ok){
            form.appendChild(successMsg);
            setTimeout(() => {
                successMsg.remove();
            }, 3000)
            form.reset();
        }else{
            alert("Faield to send message, please try again")
        }
    }
       catch(err){
        console.error(err);
        alert("Error occured")
       }
        
        
    })
})