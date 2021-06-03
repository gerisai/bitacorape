$ = require('jquery');
require('bootstrap');
require('popper.js');
const { ipcRenderer , clipboard, ipcMain } = require('electron');
const templates = require('electron').remote.require('./templates');
const userController = require('electron').remote.require('./controllers/userController');
const logController = require('electron').remote.require('./controllers/logController');

let splitterCount = 1;
let splitterAlarm = {'1': {ui: 3, nonEmpty: []} };
let data = {};
let statusSummary = {};
let user = {};
let id;

// Utils **************************************************
function copyToClip(field) {
    clipboard.writeText(document.querySelector(`#${field}`).value);
}

// User ********************************
async function editUser() {
    let update = {
        name: document.querySelector("#name").value.toUpperCase()
    };
    await userController.editUser(update);
}

async function createUser() {
    let newUser = {
        name: document.querySelector("#name").value.toUpperCase()
    };
    await userController.createUser(newUser);
}

async function getUser() {
    let userBtn = document.querySelector("#userBtn");
    let userName = document.querySelector("#name");
    try {
        user = await userController.getUser();
        if (!user) throw new Error("No user");
        userBtn.innerHTML = `<span style="font-weight: bold;">Guardar</span>`;
        userBtn.setAttribute("onclick","editUser()");
    } catch (e) {
        user = {name: ""};
        userBtn.innerHTML = `<span style="font-weight: bold;">Crear</span>`;
        userBtn.setAttribute("onclick","createUser()");
        $('#idsModal').modal('show');
    }
    userName.value = user.name;
}

getUser();


//Logs ****************************************
function renderOptions() {
    document.querySelector("#provider").innerHTML += templates.genProviders();
    document.querySelector("#district").innerHTML += templates.genDistricts();
    document.querySelector("#cluster").innerHTML += templates.genClusters();
}

renderOptions();

function selectPorts(spId) {
    let ports = parseInt(document.querySelector(`#ports${spId}`).value);
    document.querySelector(`#portsDiv${spId}`).innerHTML = templates.genPorts(spId,ports);
}

function selectService() {
    let service = document.querySelector("#logType").value;
    let releaseType = document.querySelector("#releaseType");
    if (service === "SOPORTE") {
        releaseType.value = "";
        releaseType.setAttribute("disabled","");
    }
    else releaseType.removeAttribute("disabled");
}

function addAlarm(spId) {
    splitterAlarm[spId.toString()].ui += 1;
    let wrapper = document.createElement("div");
    wrapper.id = `alarm${spId}_${splitterAlarm[spId].ui}Div`;
    wrapper.className = "addedAlarm";
    wrapper.innerHTML = templates.genAlarm(spId,splitterAlarm[spId].ui);
    document.querySelector(`#alarmForm${spId}`).appendChild(wrapper);
}

function deleteAlarm(spId,alarmId) {
    splitterAlarm[spId].ui -= 1;
    let deleted = document.querySelector(`#alarm${spId}_${alarmId}Div`);
    let alarmForm = document.querySelector(`#alarmForm${spId}`);
    alarmForm.removeChild(deleted);
    let addedAlarms = document.querySelectorAll(".addedAlarm");
    for (i = 0; i < splitterAlarm[spId].ui - 3; i++) {
        addedAlarms[(5*i)].id = `alarm${spId}_${i + 4}Div`; //div
        addedAlarms[(5*i) + 1].setAttribute("for",`alarm${spId}_${i + 4}`); //small
        addedAlarms[(5*i) + 1].innerHTML = `Alarma ${i + 4}`; //small
        addedAlarms[(5*i) + 2].id = `alarm${spId}_${i + 4}`; //input
        addedAlarms[(5*i) + 3].id = `alarm${spId}_${i + 4}_st`; //select
        addedAlarms[(5*i) + 4].setAttribute("onclick", `deleteAlarm('${spId}','${i + 4}')`); //button
    } 
}

function addSplitter() {
    splitterCount += 1;
    splitterAlarm[splitterCount.toString()] = {ui: 3, nonEmpty: 0};
    document.querySelector("#splitters").innerHTML = templates.genSplitter(splitterCount);
}

function removeSplitter() {
    splitterCount -= 1;
    document.querySelector("#splitters").innerHTML = `
    <div class="card my-1" id="addSplitter">
        <div style="color: white;" class="card-header bg-success" onclick="addSplitter()">
            <h5 class="mb-0 text-center">+</h5>
        </div>
    </div>
    `;
}

function fetchData() { 
    statusSummary = {
        "Libre" : 0,
        "Ocupado": 0,
        "Depurado": 0,
        "Asegurado": 0,
        "Fusionado": 0,
        "Empalmado": 0,
        "Sin Pigtail": 0,
        "Dañado": 0,
        "Atenuado": 0,
        "": 0,
        "Total": 0
    };
    data["logType"] = document.querySelector("#logType").value; 
    data["logId"] = document.querySelector("#logId").value;
    data["releaseType"] = document.querySelector("#releaseType").value;
    data["date"] = new Date().toLocaleDateString('en-GB');
    data["hour"] = new Date().toLocaleTimeString('en-GB');
    data["numEmpl"] = document.querySelector("#numEmpl").value;
    data["nameEmpl"] = document.querySelector("#nameEmpl").value;
    data["provider"] = document.querySelector("#provider").value;
    data["district"] = document.querySelector("#district").value;
    data["address"] = document.querySelector("#address").value;
    data["coordinates"] = document.querySelector("#coordinates").value;
    data["cluster"] = document.querySelector("#cluster").value;
    data["olt"] = document.querySelector("#olt").value;
    for (let i = 1; i < splitterCount + 1; i++) {
        splitterAlarm[i.toString()].nonEmpty = [];
        data[`f${i}`] = document.querySelector(`#f${i}`).value !== "" ? parseInt(document.querySelector(`#f${i}`).value) : "";
        data[`s${i}`] = document.querySelector(`#s${i}`).value !== "" ? parseInt(document.querySelector(`#s${i}`).value) : "";
        data[`p${i}`] = document.querySelector(`#p${i}`).value !== "" ? parseInt(document.querySelector(`#p${i}`).value) : "";
        data[`bw${i}`] = document.querySelector(`#bw${i}`).value !== "" ? parseInt(document.querySelector(`#bw${i}`).value) : "";
        data[`ports${i}`] = document.querySelector(`#ports${i}`).value !== "" ? parseInt(document.querySelector(`#ports${i}`).value) : ""; 
        data[`clients${i}`] = document.querySelector(`#clients${i}`).value !== "" ? parseInt(document.querySelector(`#clients${i}`).value) : "";
        for (let j = 1; j < splitterAlarm[i.toString()].ui + 1; j++) {
            if (document.querySelector(`#alarm${i}_${j}`).value === "" || document.querySelector(`#alarm${i}_${j}_st`).value === "") continue;
            splitterAlarm[i.toString()].nonEmpty.push(j);
            data[`alarm${i}_${j}`] = document.querySelector(`#alarm${i}_${j}`).value;
            data[`alarm${i}_${j}_st`] = document.querySelector(`#alarm${i}_${j}_st`).value;
        }
        if (data[`ports${i}`] !== "") {
            for (let k = 1; k < data[`ports${i}`] + 1; k++) {
                data[`account${i}_${k}`] = document.querySelector(`#account${i}_${k}`).value;
                data[`account${i}_${k}_st`] = document.querySelector(`#account${i}_${k}_st`).value;
                statusSummary[data[`account${i}_${k}_st`]] += 1;
                data[`account${i}_${k}_st`] === "" ? statusSummary["Total"] += 0 : statusSummary["Total"] += 1;
            }
        }
    }
    data["comments"] = document.querySelector("#comments").value;
}

async function saveLog(id) {
    fetchData();
    if (!data["logType"] || !data["logId"]) {
        $('#errorMessage').html("<span>Completa los campos de Servicio y/o ID</span>");
        $('#errorModal').modal('show');
        return;
    }
    if (id) await logController.updateLog(id,data);
    else {
        const log = await logController.createLog(data); 
        $("#saveBtn").attr("onclick", `saveLog('${log.id}')`);
    }
    $('#successMessage').html("<span>¡Se guardo con éxito!</span>");
    $('#successModal').modal('show');
    setTimeout(() => location.reload(), 500);
}

async function renderLogs() {
    const logs = await logController.getLogs();
    $('#totalTickets').html(`Total: ${logs.length}`);
    tickets = document.querySelector("#tickets");
    tickets.innerHTML = ``;
    if (logs) {
        for (let log of logs) {
            tickets.innerHTML += `
                <tr>
                    <th scope="row">${log.logType}</th>
                    <td>${log.logId}</td>
                    <td>${log.date}</td>
                    <td>${log.hour}</td>
                    <td>${log.releaseType}</td>
                    <td><button class="btn btn-warning btn-small" onclick="ipcRenderer.send('renderTicket','${log.id}')"><span style="font-weight: bold;">Abrir</span></button></td>
                    <td><button class="btn btn-danger btn-small" onclick="deleteLog('${log.id}')"><span style="font-weight: bold;">&times</span></button></td>
                </tr>
            `;
        }
    }
    $('#ticketsModal').modal('show');
}

async function renderLog(id) {
    const log = await logController.getLog(id);
    $('#logType').val(log.logType);
    if (log.logType === "SOPORTE") releaseType.setAttribute("disabled",""); 
    $('#logId').val(log.logId);
    $('#releaseType').val(log.releaseType);
    $('#numEmpl').val(log.numEmpl);
    $('#nameEmpl').val(log.nameEmpl);
    $('#provider').val(log.provider);
    $('#district').val(log.district);
    $('#address').val(log.address);
    $('#coordinates').val(log.coordinates);
    $('#cluster').val(log.cluster);
    $('#olt').val(log.olt);
    let count = !log.ports2 ? 1 : 2;
    for (let i = 1;i < count + 1;i++) {
        if (i > 1) addSplitter();
        $(`#f${i}`).val(log[`f${i}`]);
        $(`#s${i}`).val(log[`s${i}`]);
        $(`#p${i}`).val(log[`p${i}`]);
        $(`#bw${i}`).val(log[`bw${i}`]);
        $(`#clients${i}`).val(log[`clients${i}`]);
        if (log[`ports${i}`]) {
            $(`#ports${i}`).val(log[`ports${i}`]);
            selectPorts(i);
            for (let j = 1; j < log[`ports${i}`] + 1; j++) {
                if (log[`alarm${i}_${j}`]) {
                    if (j > 3) addAlarm(i);
                    $(`#alarm${i}_${j}`).val(log[`alarm${i}_${j}`]);
                    $(`#alarm${i}_${j}_st`).val(log[`alarm${i}_${j}_st`]);
                }
                $(`#account${i}_${j}`).val(log[`account${i}_${j}`]);
                $(`#account${i}_${j}_st`).val(log[`account${i}_${j}_st`]);
            }
        }
    }
    $("#comments").val(log.comments);
    $("#ticketsModal").modal('hide');
    $("#saveBtn").attr("onclick", `saveLog('${log.id}')`);
}

ipcRenderer.on('renderLog', async (event,arg) => {
    await renderLog(arg);
})

async function deleteLog(id) {
    await logController.deleteLog(id);
    await renderLogs();
}

function genScript() {
    fetchData();
    let script = "";
    let alarmString = "";
    let accountString = "";
    for (let i = 1; i < splitterCount + 1; i++) {
        if (data[`f${i}`] !== "" || data[`s${i}`] !== "" || data[`p${i}`] !== "") {
            alarmString += `*- SPLITTER ${i} -*\r`;
            alarmString += `Frame ${data[`f${i}`]}  Slot ${data[`s${i}`]}  Puerto ${data[`p${i}`]}  Ancho de banda  ${data[`bw${i}`]}  Numero de Clientes  ${data[`clients${i}`]}\r`;
        }
        for (let j of splitterAlarm[i.toString()].nonEmpty) {
            alarmString += `${j < 9 ? "0" : ""}${j}.- Onu id: ${data[`alarm${i}_${j}`]}  Status: ${data[`alarm${i}_${j}_st`]}\r`;  
        }
        if (data[`ports${i}`] !== "") {
            accountString += `*- SPLITTER ${i} -*\r`;
            accountString += `01 : ${data[`ports${i}`] > 9 ? "" : "0"}${data[`ports${i}`]}\r`;
        }
        for (let k = 1; k < data[`ports${i}`] + 1; k++) {
            accountString += `Puerto ${k > 9 ? "" : "0"}${k} :   Cuenta : ${data[`account${i}_${k}`]}   Status: ${data[`account${i}_${k}_st`]}\r`;
        }
    }
    let summary = `    *-- DETALLE DE STATUS DE PUERTOS DE SPLITTER --*

    *DEPURADOS:*       ${statusSummary["Depurado"]}
    *OCUPADOS:*        ${statusSummary["Ocupado"]}
    *ASEGURADOS:*      ${statusSummary["Asegurado"]} 
    *LIBRES:*          ${statusSummary["Libre"]}
    *FUSIONADOS:*      ${statusSummary["Fusionado"]}
    *EMPALMADOS:*      ${statusSummary["Empalmado"]}
    *SIN PIGTAIL:*     ${statusSummary["Sin Pigtail"]}
    *DAÑADOS:*         ${statusSummary["Dañado"]}
    *ATENUADO:*        ${statusSummary["Atenuado"]}

    *TOTALES:*         ${statusSummary["Total"]}`;

    script += `
    *--SCRIPT ${data["logType"] !== "SOPORTE" ? "DEPURACION" : "SOPORTE"} SCPE--*   
*FECHA: ${data["date"]}  HORA: ${data["hour"]}*
*${data["logType"]}-${data["logId"]}*
*No. EMPLEADO:* ${data["numEmpl"]}
*IDC:* ${data["nameEmpl"]}\r${data["releaseType"] !== "SOPORTE" ? `*TIPO DE DEPURACION:* ${data["releaseType"]}\r` : ""}
*PROOVEDOR:* ${data["provider"]}
*DISTRITO:* ${data["district"]}
*DIRECCION:* ${data["address"]}
*COORDENADAS:* ${data["coordinates"]}
*CLUSTER:* ${data["cluster"]}
*OLT:* ${data["olt"]}\r${alarmString !== "" ? "\r    *--DETALLE DE STATUS ONT--*\r" : ""}${alarmString}${accountString !== "" ? "\r    *--DETALLE DE PUERTOS DE SPLITTER--*\r" : ""}${accountString}
    *--COMENTARIOS ADICIONALES--*   
${data["comments"]}
    *--INGENIERO SCPE: ${user.name} *--*   

${accountString !== "" ? summary : ""}
`;
    document.querySelector("#script").innerHTML = script;
    $('#scriptModal').modal("show")
}