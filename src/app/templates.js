const vars = require('./vars');

exports.genAlarm = (spId,alarmId) => {
    return `
    <div class="form-group row alarm">
        <small for="alarm${spId}_${alarmId}" class="addedAlarm control-label form-text text-muted col-auto">Alarma ${alarmId}</small>
        <div class="col-sm-6 col-md-6 col-lg-5">
            <input type="text" class="addedAlarm form-control form-control-sm" id="alarm${spId}_${alarmId}">
        </div>
        <div class="col-sm-3 col-md-3 col-lg-2 mt-2 mt-sm-0 mt-md-0 mt-lg-0 mt-xl-0">
            <select class="addedAlarm form-control form-control-sm" id="alarm${spId}_${alarmId}_st">
                <option value="" selected=""></option>
                <option value="Alarmada">Alarmada</option>
                <option value="Apagada">Apagada</option>
            </select>                            
        </div>
        <div style="margin-top: 0.2rem" class="col-sm-1 col-md-1 col-lg-1">
            <button type="button" class="addedAlarm btn btn-danger btn-sm" onclick="deleteAlarm('${spId}','${alarmId}')">&times</button>
        </div>
    </div>
    `;
}

exports.genPorts = (spId,ports) => {
    let template = ``;
    for (i = 1; i < ports + 1; i++) {
        template += `
        <div class="form-group row">
            <small for="alarm1_2" class="control-label form-text text-muted col-auto">Puerto ${i}</small>
            <div class="col-sm-6 col-md-7 col-lg-5">
                <input type="text" class="form-control form-control-sm" id="account${spId}_${i}">
            </div>
            <div class="col-sm-3 col-md-3 col-lg-2">
                <select class="form-control form-control-sm mt-2 mt-sm-0 mt-md-0 mt-lg-0 mt-xl-0" id="account${spId}_${i}_st">
                    <option value="" selected=""></option>
                    <option value="Libre">Libre</option>
                    <option value="Ocupado">Ocupado</option>
                    <option value="Depurado">Depurado</option>
                    <option value="Asegurado">Asegurado</option>
                    <option value="Fusionado">Fusionado</option>
                    <option value="Empalmado">Empalmado</option>
                    <option value="Sin Pigtail">Sin Pigtail</option>
                    <option value="Dañado">Dañado</option>
                    <option value="Atenuado">Atenuado</option>
                </select>                             
            </div>
        </div>
        `;
    }
    return template;
}

exports.genSplitter = (spId) => {
    return `
        <div class="card my-1">
        <div  style="color: white;" class="card-header bg-secondary" id="sp${spId}Header" data-toggle="collapse" data-target="#sp${spId}" aria-expanded="false" aria-controls="sp${spId}">
            <div class="row mx-1 justify-content-between">
                <h5 class="mb-0">Splitter ${spId}</h5>
                <button class="btn btn-danger btn-sm" onclick="removeSplitter()"><img src="./img/trash_small.png" width="13px" height="15px"></button>
            </div>
        </div>

        <div id="sp${spId}" class="collapse" aria-labelledby="sp${spId}Header">
            <div class="card-body">
                <form class="row">
                    <div class="form-group col-sm-4 col-md-2 col-lg-2">
                        <small for="f${spId}" class="control-label form-text text-muted">F</small>
                        <select class="form-control form-control-sm" id="f${spId}">
                            <option selected=""></option>
                            <option value="0">0</option>
                            <option value="1">1</option>
                        </select> 
                    </div>
                    <div class="form-group col-sm-4 col-md-2 col-lg-2">
                        <small for="s${spId}" class="control-label form-text text-muted">S</small>
                        <select class="form-control form-control-sm" id="s${spId}">
                                <option selected=""></option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                                <option value="13">13</option>
                                <option value="14">14</option>
                                <option value="15">15</option>
                                <option value="16">16</option>
                                <option value="17">17</option>
                                <option value="18">18</option>
                        </select> 
                    </div>
                    <div class="form-group col-sm-2 col-md-2 col-lg-2">
                        <small for="p${spId}" class="control-label form-text text-muted">P</small>
                        <select class="form-control form-control-sm" id="p${spId}">
                            <option selected=""></option>
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            <option value="13">13</option>
                            <option value="14">14</option>
                            <option value="15">15</option>
                            <option value="16">16</option>
                        </select> 
                    </div>
                    <div class="form-group col-xs-6 col-sm-3 col-md-3 col-lg-2">
                        <small for="bw${spId}" class="control-label form-text text-muted">Ancho de Banda</small>
                        <input type="number" class="form-control form-control-sm" id="bw${spId}" min="0" step="1">
                    </div> 
                    <div class="form-group col-xs-6 col-sm-3 col-md-3 col-lg-2">
                        <small for="${spId}" class="control-label form-text text-muted">Clientes</small>
                        <input type="number" class="form-control form-control-sm" id="clients${spId}" min="0" step="1">
                    </div>
                </form>
                <hr class="my-2">
                <form  id="alarmForm${spId}">
                    <h5>Alarmas</h5> 
                    <!-- Alarma 1 -->
                    <div class="form-group row">
                        <small for="alarm${spId}_1" class="control-label form-text text-muted col-auto">Alarma 1</small>
                        <div class="col-sm-6 col-md-7 col-lg-5">
                            <input type="text" class="form-control form-control-sm" id="alarm${spId}_1">
                        </div>
                        <div class="col-sm-3 col-md-3 col-lg-2 mt-2 mt-sm-0 mt-md-0 mt-lg-0 mt-xl-0">
                            <select class="form-control form-control-sm" id="alarm${spId}_1_st">
                                <option value="" selected=""></option>
                                <option value="Alarmada">Alarmada</option>
                                <option value="Apagada">Apagada</option>
                            </select>                             
                        </div>
                    </div>
                    <!-- Alarma 2 -->
                    <div class="form-group row">
                        <small for="alarm${spId}_2" class="control-label form-text text-muted col-auto">Alarma 2</small>
                        <div class="col-sm-6 col-md-7 col-lg-5">
                            <input type="text" class="form-control form-control-sm" id="alarm${spId}_2">
                        </div>
                        <div class="col-sm-3 col-md-3 col-lg-2">
                            <select class="form-control form-control-sm mt-2 mt-sm-0 mt-md-0 mt-lg-0 mt-xl-0" id="alarm${spId}_2_st">
                                <option value="" selected=""></option>
                                <option value="Alarmada">Alarmada</option>
                                <option value="Apagada">Apagada</option>
                            </select>                             
                        </div>
                    </div>
                    <!-- Alarma 3 -->
                    <div class="form-group row">
                        <small for="alarm${spId}_2" class="control-label form-text text-muted col-auto">Alarma 3</small>
                        <div class="col-sm-6 col-md-7 col-lg-5">
                            <input type="text" class="form-control form-control-sm" id="alarm${spId}_3">
                        </div>
                        <div class="col-sm-3 col-md-3 col-lg-2">
                            <select class="form-control form-control-sm mt-2 mt-sm-0 mt-md-0 mt-lg-0 mt-xl-0" id="alarm${spId}_3_st">
                                <option value="" selected=""></option>
                                <option value="Alarmada">Alarmada</option>
                                <option value="Apagada">Apagada</option>
                            </select>                             
                        </div>
                    </div>
                </form>
                <div class="form-group row justify-content-center">
                    <button type="button" class="btn btn-success btn-sm" onclick="addAlarm('2')">+</button>
                </div>
                <hr class="my-2">
                <form>
                    <h5>Puertos</h5>
                    <div class="form-group row justify-content-center">
                        <div class="col-auto">
                            <select class="form-control form-control-sm mt-2 mt-sm-0 mt-md-0 mt-lg-0 mt-xl-0" id="ports${spId}" onchange="selectPorts('${spId}')">
                                <option value="" selected=""></option>
                                <option value="8">1:8</option>
                                <option value="16">1:16</option>
                            </select>                             
                        </div>
                    </div>
                    <div id="portsDiv${spId}"></div>
                </form>         
            </div>
        </div>
    </div>
    `;
}

exports.genProviders = () => {
    let template = "";
    for (let provider of vars.providers) {
        template += `<option value="${provider}">${provider}</option>`;
    }
    return template;
}

exports.genDistricts = () => {
    let template = "";
    for (let district of vars.districts) {
        template += `<option value="${district}">${district}</option>`;
    }
    return template;
}

exports.genClusters = () => {
    let template = "";
    for (let cluster of vars.clusters) {
        template += `<option value="${cluster}">${cluster}</option>`;
    }
    return template;
}