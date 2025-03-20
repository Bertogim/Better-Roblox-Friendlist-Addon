function waitForElement(selector, timeout = 5000) {
    return new Promise((resolve, reject) => {
        const startTime = Date.now();

        // Check if the element is already present
        const element = document.querySelector(selector);
        if (element) {
            resolve(element);
            return;
        }

        // Set up a MutationObserver to watch for changes in the DOM
        const observer = new MutationObserver(() => {
            const element = document.querySelector(selector);
            if (element) {
                observer.disconnect();
                resolve(element);
            } else if (Date.now() - startTime > timeout) {
                observer.disconnect();
                reject(new Error(`Element not found: ${selector}`));
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });

        // Timeout in case the element never appears
        setTimeout(() => {
            observer.disconnect();
            reject(new Error(`Timeout waiting for element: ${selector}`));
        }, timeout);
    });
}




function getConfigState(key) {
    return new Promise((resolve) => {
        let storageKey = key + "BetterFriends";

        // Check localStorage first (fast response)
        let storedValue = localStorage.getItem(storageKey);
        if (storedValue !== null) {
            resolve(JSON.parse(storedValue)); // Resolve immediately
        }

        // Fetch the latest value from the background script asynchronously
        chrome.runtime.sendMessage({ action: "getConfigState", key: key }, (response) => {
            if (response && response.value !== undefined) {
                localStorage.setItem(storageKey, JSON.stringify(response.value)); // Update localStorage
                resolve(response.value); // If no local value was found, resolve here
            } else if (storedValue === null) {
                resolve(false); // Default if neither localStorage nor Chrome storage has it
            }
        });
    });
}



// Listen for updates from the background script and store them locally
chrome.runtime.onMessage.addListener((message) => {
    if (message.action === "setConfigState") {
        localStorage.setItem(message.key, JSON.stringify(message.value) + "BetterFriends"); // Update local storage
        console.log(`Updated ${message.key} to`, message.value);
    }
});


let transitionsEnabled = false;


// Esperar a que ambas promesas se resuelvan antes de continuar
Promise.all([
    getConfigState("transitions"),
    waitForElement("#root")
]).then(([transitionsEnabledLocal, elementttt]) => {
    transitionsEnabled = transitionsEnabledLocal;
    console.log("Transiciones habilitadas:", transitionsEnabled);
    console.log("Element appeared");

    const rootElement = document.querySelector("#root");
    const body = document.body;

    let roblokis = body.classList.contains("Roblokis-installed");


    if (transitionsEnabled === true) {
        body.style.opacity = 0;
        rootElement.style.opacity = 0;

        setTimeout(() => {
            body.style.opacity = 1;
            rootElement.style.opacity = 1;
            body.classList.add("fade-in");
            rootElement.classList.add("fade-in");
        }, 500);
    } else {
        body.style.opacity = 1;
        rootElement.style.opacity = 1;
    }



    let friendsPanelWidth = 290
    let friendsPanelWidth2 = 250
    let offsetWidth = 0

    if (roblokis === false) {
        offsetWidth = 50
    }


    const element = document.querySelector("#root > div > div > div > div > div > div");
    document.querySelector(".friendsContainer").style.background = "transparent"
    document.querySelector(".friendsContainer").style.width = "0px"
    document.querySelector("#root > div > div > div > div > div > div > div").style.background = "#232527"

    const rbxBody = document.querySelector("#rbx-body");



    // Verificar si los elementos existen
    if (rbxBody && rootElement) {
        // Hacer que #rbx-body se haga más pequeño y se ajuste al espacio restante
        rbxBody.style.marginRight = friendsPanelWidth+"px";  // Añadir espacio a la derecha
        rbxBody.style.width = "calc(100% - " + (friendsPanelWidth2+offsetWidth) + "px" + ")";  // Reducir el ancho para dejar espacio a la derecha
        document.querySelector("#container-main > div.content").style.paddingLeft = "10px"
    }

    const rbxFooter = document.querySelector("#footer-container");

    if (rbxFooter) {
        rbxFooter.style.marginRight = friendsPanelWidth+"px";  // Añadir espacio a la derecha
        rbxFooter.style.width = "calc(100% - " + friendsPanelWidth+"px" + ")";  // Reducir el ancho para dejar espacio a la derecha
    }

    // Estilos iniciales para fijar el elemento a la derecha
    element.style.position = "fixed";
    element.style.right = "0";
    element.style.top = "0";
    element.style.height = "";
    element.style.width = friendsPanelWidth+"px"; // Ancho del panel
    element.style.zIndex = "999"; // Asegura que esté por encima de otros elementos
    element.style.background = body.style.backgroundColor;

    // Crear un nuevo div para el fondo
    const backgroundDiv = document.createElement("div");
    backgroundDiv.style.position = "absolute";
    backgroundDiv.style.top = "";
    backgroundDiv.style.left = "0";
    backgroundDiv.style.right = "0";
    backgroundDiv.style.bottom = "99%"; // Se extiende hasta justo encima del elemento
    backgroundDiv.style.height = "100%"; // Se extiende hasta justo encima del elemento
    backgroundDiv.style.width = "100%"; // Se extiende hasta justo encima del elemento
    backgroundDiv.style.background = body.style.backgroundColor; // Color de fondo
    backgroundDiv.style.zIndex = "-1"; // Colocarlo detrás del elemento

    // Agregar el nuevo div al contenedor del elemento
    element.appendChild(backgroundDiv);

    const chat = document.querySelector("#chat-container")
    chat.style.display = "";





    // Espera un poco antes de añadir los eventos de los enlaces
    setTimeout(() => {
        // Detectar cuando el usuario hace clic en un enlace
        document.querySelectorAll("a").forEach((link) => {
            const url = link.href;
            if (url !== window.location.href + "#" && url) {
                link.addEventListener("click", (e) => {



                    //e.preventDefault(); // Evita la navegación automática
                    if (transitionsEnabled === true) {
                        // Agregar clase "fade-out" antes de cambiar la página
                        body.style.opacity = 0;
                        rootElement.style.opacity = 0;
                        body.classList.add("fade-out");
                        rootElement.classList.add("fade-out");


                        // Espera aqui?
                        window.location.href = url;
                        setTimeout(() => {
                            body.style.opacity = 1;
                            rootElement.style.opacity = 1;
                            body.classList.add("fade-in");
                            rootElement.classList.add("fade-in");
                        }, 1000);
                    }

                    console.log(link)
                    console.log(url)

                });

            }
        });
    }, 1500);
    function waitForElm(selector) {
        return new Promise(resolve => {
            if (document.querySelector(selector)) {
                return resolve(document.querySelector(selector));
            }

            const observer = new MutationObserver(mutations => {
                if (document.querySelector(selector)) {
                    observer.disconnect();
                    resolve(document.querySelector(selector));
                }
            });

            // If you get "parameter 1 is not of type 'Node'" error, see https://stackoverflow.com/a/77855838/492336
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        });
    }

    async function getUsernameFromId(userId) {
        const url = `https://users.roblox.com/v1/users/${userId}`;

        try {
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                return {
                    username: data.name,       // Roblox username
                    displayName: data.displayName // Roblox display name
                };
            }
            return null; // Return null if the request wasn't successful
        } catch (error) {
            console.error(`Error fetching username for userId ${userId}:`, error);
            return null; // Return null in case of an error
        }
    }

    /*
    
    // Example usage
    getUsernameFromId(12345678).then((userInfo) => {
        if (userInfo) {
            console.log(`Username: ${userInfo.username}`);
            console.log(`Display Name: ${userInfo.displayName}`);
        } else {
            console.log('User not found or error occurred.');
        }
    });
    
    */

    async function newFriend(friend, canRequestApi) {
        if (true) {
            const friendImage = friend.querySelector("div.avatarHolder > a"); // Selecciona el enlace
            const href = friendImage?.getAttribute("href"); // Obtiene el atributo 'href'

            if (href) {
                const match = href.match(/\/users\/(\d+)\/profile/); // Usa una expresión regular para extraer el ID
                if (match) {
                    const userID = match[1]; // Extrae el primer grupo capturado (el ID)

                    // Revisa si el nombre de usuario ya está en localStorage
                    const cachedUser = localStorage.getItem(`user_${userID}`);
                    if (cachedUser) {
                        const userInfo = JSON.parse(cachedUser); // Parsea la información almacenada
                        renderFriendInfo(friend, userInfo); // Usa la función para actualizar el DOM
                    } else {
                        if (canRequestApi == true) {
                            // Si no está en el localStorage, haz la llamada a la API
                            getUsernameFromId(userID).then((userInfo) => {
                                console.log(`${userID} -> ${userInfo.username}`);
                                // Almacena el nombre de usuario en localStorage
                                localStorage.setItem(`user_${userID}`, JSON.stringify(userInfo));
                                renderFriendInfo(friend, userInfo); // Usa la función para actualizar el DOM
                            });
                        } else {
                            console.warn("Username request on " + userID + " but requests disabled on this iteration.")
                        }
                    }
                } else {
                    console.log("No UserID found in the href.");
                }
            } else {
                console.log("No href attribute found.");
            }
        }
    }

    // Función para actualizar el DOM con la información del usuario
    function renderFriendInfo(friend, userInfo) {
        if (userInfo.username === userInfo.displayName) {
            friend.querySelector("div.labelHolder > div:nth-child(1) > div:nth-child(1)").innerHTML = `
            <span title="${userInfo.displayName} (@${userInfo.username})">${userInfo.username}</span>
        `;
        } else {
            friend.querySelector("div.labelHolder > div:nth-child(1) > div:nth-child(1)").innerHTML = `
            <span title="${userInfo.displayName} (@${userInfo.username})">${userInfo.displayName} <span class="RealName">(@${userInfo.username})</span></span>
        `;
        }
    }

    function UpdateOrder() {
        if (true) {
            const Thiselements2 = document.querySelectorAll('.parentOrder'); // Selecciona elementos con la clase "parentOrder"

            Thiselements2.forEach(elementt => {
                // Obtén los estilos en línea como una cadena de texto
                //const styles = element.getAttribute('style');
                const styles = elementt.style.order;
                if (styles) {
                    // Aplica los estilos al elemento padre
                    elementt.parentElement.style.order = styles;
                    //console.log(styles)
                }
            });
        }
    }

    waitForElm('#root > div > div > div > div > div > div > div.listContentContainer > div > div').then((elm) => {
        console.log('Element friends is ready');

        UpdateOrder()


        const elements = document.querySelectorAll(".friend");

        elements.forEach((friend, index) => {
            newFriend(friend, true);
        });


        // Control de tiempo para asegurar que no se actualice demasiado rápido
        let canUpdate = true;

        // Crear un MutationObserver para detectar cambios en el innerHTML de cada friend
        const observerElm = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'characterData' || mutation.type === 'childList') {
                    // Si el innerHTML cambia, se actualiza el amigo

                    if (canUpdate) {
                        canUpdate = false; // Deshabilitar las actualizaciones inmediatas

                        UpdateOrder()

                        const elementsNew = document.querySelectorAll(".friend");

                        console.log("Friends changed")
                        elementsNew.forEach((friend, index) => {
                            newFriend(friend, false);
                        });
                        // Last online known title
                        //const elements1 = document.querySelectorAll('.friend .offline > div:nth-child(2)');

                        //elements1.forEach(element => {
                        //element.setAttribute('title', 'Last online known on this PC');
                        //});



                        // Después de 1 segundo, se permite una nueva actualización
                        setTimeout(() => {
                            canUpdate = true;
                        }, 10);
                    }
                }
            });
        });

        // Configuración del observer para observar cambios en el contenido del elemento
        const configElm = { childList: true, subtree: true, characterData: true };

        // Comenzar a observar el elemento elm
        observerElm.observe(element, configElm);










        setTimeout(() => {


            const MyCustomInnerHTML = `
                <div class="groupHeaderContainer Panel Focusable" style="order: 99; margin-top: 25px;">
                    <button class="BFLButtons" id="BetterFriendListExport">Export Last Online Data</button>
                    <button class="BFLButtons" id="BetterFriendListAdd">Add Last Online Data</button>
                </div>
            `;


            waitForElm('#root > div > div > div > div > div > div > div.listContentContainer').then((elm) => {


                // Añade el HTML personalizado al elemento encontrado
                elm.insertAdjacentHTML('beforeend', MyCustomInnerHTML);
                elm.style.backgroundColor = body.style.backgroundColor
                // Función para exportar datos
                function exportData(format) {
                    const data = localStorage.getItem("LastOnlineBetterFriendList");

                    if (!data) {
                        alert("No hay datos para exportar.");
                        return;
                    }

                    if (format === "json") {
                        const blob = new Blob([data], { type: "application/json" });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement("a");
                        a.href = url;
                        a.download = "LastOnlineBetterFriendList.json";
                        a.click();
                        URL.revokeObjectURL(url);
                    } else if (format === "text") {
                        // Codificar los datos en Base64
                        const encodedData = btoa(unescape(encodeURIComponent(data)));
                        // Copiar al portapapeles
                        navigator.clipboard.writeText(encodedData)
                            .then(() => {
                                alert("Datos codificados copiados al portapapeles.");
                            })
                            .catch((error) => {
                                alert("Error al copiar al portapapeles: " + error.message);
                            });
                    }
                }

                // Función para combinar datos existentes con nuevos datos
                function mergeData(existingData, newData) {
                    const existing = JSON.parse(existingData || "{}");
                    const newEntries = JSON.parse(newData);

                    for (const [friend, timestamp] of Object.entries(newEntries)) {
                        if (!existing[friend] || existing[friend] < timestamp) {
                            existing[friend] = timestamp; // Actualiza solo si el amigo no existe o el timestamp es más reciente
                        }
                    }

                    return JSON.stringify(existing, null, 2); // Devuelve el JSON formateado
                }

                // Función para exportar datos
                function exportData(format) {
                    const data = localStorage.getItem("LastOnlineBetterFriendList");

                    if (!data) {
                        alert("No hay datos para exportar.");
                        return;
                    }

                    if (format === "json") {
                        const blob = new Blob([data], { type: "application/json" });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement("a");
                        a.href = url;
                        a.download = "LastOnlineBetterFriendList.json";
                        a.click();
                        URL.revokeObjectURL(url);
                    } else if (format === "text") {
                        // Codificar los datos en Base64
                        const encodedData = btoa(unescape(encodeURIComponent(data)));
                        // Copiar al portapapeles
                        navigator.clipboard.writeText(encodedData)
                            .then(() => {
                                alert("Datos codificados copiados al portapapeles.");
                            })
                            .catch((error) => {
                                alert("Error al copiar al portapapeles: " + error.message);
                            });
                    }
                }

                // Función para combinar datos existentes con nuevos datos
                function mergeData(existingData, newData) {
                    const existing = JSON.parse(existingData || "{}");
                    const newEntries = JSON.parse(newData);

                    for (const [friend, timestamp] of Object.entries(newEntries)) {
                        if (!existing[friend] || existing[friend] < timestamp) {
                            existing[friend] = timestamp; // Actualiza solo si el amigo no existe o el timestamp es más reciente
                        }
                    }

                    return JSON.stringify(existing, null, 2); // Devuelve el JSON formateado
                }

                // Función para importar datos desde un archivo
                function importDataFromFile(file) {
                    const reader = new FileReader();
                    reader.onload = function (e) {
                        try {
                            const newData = e.target.result;
                            const existingData = localStorage.getItem("LastOnlineBetterFriendList");
                            const mergedData = mergeData(existingData, newData);

                            localStorage.setItem("LastOnlineBetterFriendList", mergedData);
                            alert("Datos importados y combinados correctamente.");
                        } catch (error) {
                            alert("Error al importar los datos. Asegúrate de que el archivo es válido.");
                        }
                    };
                    reader.readAsText(file);
                }

                // Función para importar datos desde texto pegado
                function importDataFromText(text) {
                    try {
                        // Decodificar los datos desde Base64
                        const decodedData = decodeURIComponent(escape(atob(text)));
                        const existingData = localStorage.getItem("LastOnlineBetterFriendList");
                        const mergedData = mergeData(existingData, decodedData);

                        localStorage.setItem("LastOnlineBetterFriendList", mergedData);
                        alert("Datos importados y combinados correctamente.");
                    } catch (error) {
                        alert("Error al importar los datos. Asegúrate de que el texto es válido.");
                    }
                }

                // Menú de opciones para exportar
                document.getElementById("BetterFriendListExport").addEventListener("click", () => {
                    const option = prompt("Selecciona el formato de exportación:\n\n1. JSON (Archivo)\n2. Texto\n\nEscribe 1 o 2:");

                    if (option === "1") {
                        exportData("json"); // Exportar como JSON
                    } else if (option === "2") {
                        exportData("text"); // Exportar como texto (Base64)
                    } else {
                        alert("Opción no válida. Debes escribir 1 o 2.");
                    }
                });

                // Menú de opciones para importar
                document.getElementById("BetterFriendListAdd").addEventListener("click", () => {
                    const option = prompt("Selecciona el método de importación:\n\n1. Desde archivo\n2. Pegar texto\n\nEscribe 1 o 2:");

                    if (option === "1") {
                        const input = document.createElement("input");
                        input.type = "file";
                        input.accept = ".json,.txt";
                        input.onchange = (e) => {
                            const file = e.target.files[0];
                            if (file) {
                                importDataFromFile(file);
                            }
                        };
                        input.click();
                    } else if (option === "2") {
                        const text = prompt("Pega aquí los datos codificados:");
                        if (text) {
                            importDataFromText(text);
                        }
                    } else {
                        alert("Opción no válida. Debes escribir 1 o 2.");
                    }
                });
            }, 1000);
        });
    });




    /*
    const axios = require('axios');
    async function getUsernameFromId(userId) {
        const url = `https://users.roblox.com/v1/users/${userId}`;
        const response = await axios.get(url);
        return response.status === 200 ? response.data.name : null;
    }
        */
})
    .catch((error) => {
        console.error(error);
    });

