let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");


let mood = 'create';
let tmp;

//console.log(title, price, taxes, ads, discount, total, count, category, submit);

//get total
function getTotal() 
{
    if(price.value != ''){
        let result =(+price.value + +taxes.value + +ads.value) 
        - +discount.value;
        total.innerHTML = result;
        total.style.background = "rgb(0, 255, 55)";

    }else{
        total.innerHTML = '';
        total.style.background = "#ff1100";
    }
}

//create product
if(localStorage.product != null){
    dataPro = JSON.parse(localStorage.product);
}else{
    dataPro = [];
}



submit.onclick = function()
{
       let newPro = {
           title:title.value.toLowerCase(),
           price:price.value,
           taxes:taxes.value,
           ads:ads.value,
           discount:discount.value,
           total:total.innerHTML,
           count:count.value,
           category:category.value.toLowerCase(),
       };

       if (title.value != '' 
       && price.value != '' 
       && category.value != '' 
       && newPro.count < 151){

       if(mood === 'create'){
       if(newPro.count > 1){
           for(let i = 0; i < count.value; i++){
               dataPro.push(newPro);
           }   
       }else{
           dataPro.push(newPro);
       }

    }else{

        dataPro[tmp] = newPro;
        mood = 'create';
        submit.innerHTML = 'Create';
        count.style.display = 'block';
    }
    clearData();
}









    //save local storage
    localStorage.setItem('product', JSON.stringify(dataPro));
   
    clearData();
    readData();
}

//clear inputs
function clearData(){   
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}


//read
function readData()
{
    getTotal();
    let table = '';
    for(let i = 0; i < dataPro.length; i++){
        table += `
        <tr>
            <td>${i+1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">Update</button>
            </td>
            <td>
            <button onclick="deleteData(${i})" id="delete">Delete</button>
            </td>
                        
        </tr>
        `
    } 
        document.getElementById("tbody").innerHTML = table;
        let btnDeleat = document.getElementById("deleteaAll");
        if(dataPro.length > 0){

            btnDeleat.innerHTML = `
            <button onclick="deleteAll()">deleteAll(${dataPro.length}) </button>
            `
        }else{
            btnDeleat.innerHTML = '';
        }
    
}
readData();


//delete
function deleteData(i)
{
    dataPro.splice(i, 1);
    localStorage.product = JSON.stringify(dataPro);
    readData();
}



function deleteAll()
{
    localStorage.clear();
    dataPro.splice(0);
    readData();
}


//update
function updateData(i)
{
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    category.value = dataPro[i].category;
    getTotal();
    count.style.display = 'none';
    submit.innerHTML = 'Update';
    mood = 'update';
    tmp = i;

    scroll({
        top:0,
        behavior:'smooth',
})
}

//search
let searchMood = 'title';
function getSearchMood(id)
{
    let search = document.getElementById("search");
   if(id === 'searchTitle'){
       searchMood = 'title';
   }else{
       searchMood = 'category';
   }
    search.placeholder = 'Search By ' + searchMood;
    search.focus(); 
    search.value = '';
    readData();

}


function searchData(value)
{
        let table = '';
        for(let i = 0; i < dataPro.length; i++){
    if(searchMood == 'title')
    {
        
            if(dataPro[i].title.includes(value.toLowerCase())){
                table += `
                <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>    
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updateData(${i})" id="update">Update</button>
                    </td>
                    <td>
                    <button onclick="deleteData(${i})" id="delete">Delete</button>
                    </td>
                </tr>
                `
            }

        


     


    

    
    
    else{        
            if(dataPro[i].category.includes(value.toLowerCase())){
                table += `
                <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>    
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updateData(${i})" id="update">Update</button>
                    </td>
                    <td>
                    <button onclick="deleteData(${i})" id="delete">Delete</button>
                    </td>
                </tr>
                `
            }

        }

    }


    document.getElementById("tbody").innerHTML = table;
}









}

















//1.get total.0
//2.create product.0
//3.save local storage.0
//4.clear inputs.0
//5.read.0
//6.count.0
//7.delete.0
//8.update.0
//9.search
//10.clean data
