let Estado = document.querySelector("select[name=uf]")
Estado.addEventListener('change',getCities)



function preecherUfs(){
    const ufSelect = document.querySelector('select[name=uf]')
    
    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
        .then(res => res.json())
        .then(states =>{
            for(let i in states){
                ufSelect.innerHTML += `<option value="${states[i].id}">${states[i].nome}</option> `
            }
        })
      
}

function getCities(e){
    
    const citiesSelecr = document.querySelector('select[name=city]')
    const stateInput = document.querySelector('input[name=state]')
    const ufValue = e.target.value
    console.log(ufValue);
    
    
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    

    let i = e.target.selectedIndex
    stateInput.value = e.target.options[i].text

    citiesSelecr.innerHTML =`"<option value="" >Selecione a cidade</option> `
    citiesSelecr.disabled = true
    fetch(url)
        .then(res => res.json())
        .then(cities =>{
            
            for(let l of cities){
            citiesSelecr.innerHTML += `<option value="${l.nome}">${l.nome}</option> `
        }
        citiesSelecr.disabled= false
    })
  
    
}

preecherUfs()










//items de coleta

let options = document.querySelectorAll('.itens-grid li')
let selectedItens = []

for(let item of options){
    item.addEventListener('click', selectItem)  
}


let itemsSelected = []

let ColectedItems = document.querySelector('input[name=items]')

function selectItem(e){
    item = e.target
    itemId = item.dataset.id

    
        
    
    item.classList.toggle('selected')
    if(itemsSelected.indexOf(itemId)!==-1){
        // console.log('já tem');

        itemsSelected = itemsSelected.filter(p => p != itemId )
             
       
    }else{
        console.log('nao tem');
        itemsSelected.push(itemId)
        
        
    }
    
    
    console.log(itemsSelected);
    
    
    
    ColectedItems.value = itemsSelected
   
   

}


