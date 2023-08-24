console.log("API Fetch");


const button = document.getElementById("button-get-users");
button.addEventListener("click", () => {
    const userDataLocalStorage = localStorage.getItem('userData');
    const timePosted = localStorage.getItem('timestamp');
    const currentTime = new Date().getTime();

    if (userDataLocalStorage && timePosted && currentTime - parseInt(timePosted) < 60000) {
        // Si hay datos en el LS usarlos
        const userDataLocalStorageJson = JSON.parse(userDataLocalStorage);
        printToDOM(userDataLocalStorageJson);
      } else {
        // Solicita datos al server de primera vez
        getData(url);
      }
    

});


const url = "https://reqres.in/api/users?delay=3";

const getData =  ( url )=>{

    fetch( url )
        .then( ( resolve )=> {
            console.log(resolve);
            return resolve.json(); 
        })
        .then( ( resolveJson )=> {
            console.log(resolveJson)
            printToDOM(resolveJson)
            const jsonData = JSON.stringify(resolveJson);
            localStorage.setItem('userData',jsonData);
            const localStorageTime = new Date().getTime();
            localStorage.setItem('timestamp', localStorageTime);

        })
        .catch( (error)=> console.warn( error ) );
};

//getData(url);




function printToDOM(resolveJson) {
    let tableData = 
    `<table class="table">
    <thead>
      <tr>
        <th scope="col">id</th>
        <th scope="col">First name</th>
        <th scope="col">Last name</th>
        <th scope="col">e-mail</th>
        <th scope="col">image</th>
      </tr>
    </thead>
    <tbody>`;
    
    for (const item of resolveJson.data) { // Itera sobre la propiedad 'data' del objeto JSON
        tableData += 
        `<tr>
            <td>${item.id}</td>
            <td>${item.first_name}</td>
            <td>${item.last_name} </td>
            <td>${item.email}</td>
            <td><img src="${item.avatar}" class="rounded-circle"></td>
        </tr>`;
        

        
    }

    tableData+=
    ` </tbody>
    </table>`;

    const dataPrint = document.getElementById("test");
    dataPrint.innerHTML = tableData;
}

// const button = document.getElementById("button-get-users");
// button.addEventListener("click",()=>getData(url));



