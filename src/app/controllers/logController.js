const Sequelize = require('sequelize');
const { Log } = require('../models/index');

exports.createLog = async (newLog) => {
    const log = await Log.create(newLog);
    return log;
}

exports.getLogs = async () => {
    const logs = await Log.findAll({
        attributes: ['id','logType','logId','date','hour','releaseType'] 
    });
    return logs;
}

exports.getLog =  async (id) => {
    const log = await Log.findAll({
        where: {
            id: id
        }
    });
    return log[0];
}

exports.updateLog = async (id,update) => {
    let rawUpdate =  {
        logType: null,
        logId: null,
        releaseType: null,
        date: null,
        hour: null,
        numEmpl: null,
        nameEmpl: null,
        provider: null,
        district: null,
        address: null,
        coordinates: null,
        cluster: null,
        olt: null,
        bw1: null,
        clients1: null,
        f1: null,
        s1: null,
        p1: null,
        ports1: null,
        alarm1_1: null,
        alarm1_1_st: null,
        alarm1_2: null,
        alarm1_2_st: null,
        alarm1_3: null,
        alarm1_3_st: null,
        alarm1_4: null,
        alarm1_4_st: null,
        alarm1_5: null,
        alarm1_5_st: null,
        alarm1_6: null,
        alarm1_6_st: null,
        alarm1_7: null,
        alarm1_6_st: null,
        alarm1_8: null,
        alarm1_8_st: null,
        alarm1_9: null,
        alarm1_9_st: null,
        alarm1_10: null,
        alarm1_10_st: null,
        account1_1: null,
        account1_1_st: null,
        account1_2: null,
        account1_2_st: null,
        account1_3: null,
        account1_3_st: null,
        account1_4: null,
        account1_4_st: null,
        account1_5: null,
        account1_5_st: null,
        account1_6: null,
        account1_6_st: null,
        account1_7: null,
        account1_7_st: null,
        account1_8: null,
        account1_8_st: null,
        account1_9: null,
        account1_9_st: null,
        account1_10: null,
        account1_10_st: null,
        account1_11: null,
        account1_11_st: null,
        account1_12: null,
        account1_12_st: null,
        account1_13: null,
        account1_13_st: null,
        account1_14: null,
        account1_14_st: null,
        account1_15: null,
        account1_15_st: null,
        account1_16: null,
        account1_16_st: null,
        bw2: null,
        clients2: null,
        f2: null,
        s2: null,
        p2: null,
        ports2: null,
        alarm2_1: null,
        alarm2_1_st: null,
        alarm2_2: null,
        alarm2_2_st: null,
        alarm2_3: null,
        alarm2_3_st: null,
        alarm2_4: null,
        alarm2_4_st: null,
        alarm2_5: null,
        alarm2_5_st: null,
        alarm2_6: null,
        alarm2_6_st: null,
        alarm2_7: null,
        alarm2_7_st: null,
        alarm2_8: null,
        alarm2_8_st: null,
        alarm2_9: null,
        alarm2_9_st: null,
        alarm2_10: null,
        alarm2_10_st: null,    
        account2_1: null,
        account2_1_st: null,
        account2_2: null,
        account2_2_st: null,
        account2_3: null,
        account2_3_st: null,
        account2_4: null,
        account2_4_st: null,
        account2_5: null,
        account2_5_st: null,
        account2_6: null,
        account2_6_st: null,
        account2_7: null,
        account2_7_st: null,
        account2_8: null,
        account2_8_st: null,
        account2_9: null,
        account2_9_st: null,
        account2_10: null,
        account2_10_st: null,
        account2_11: null,
        account2_11_st: null,
        account2_12: null,
        account2_12_st: null,
        account2_13: null,
        account2_13_st: null,
        account2_14: null,
        account2_14_st: null,
        account2_15: null,
        account2_15_st: null,
        account2_16: null,
        account2_16_st: null,
        comments: null,
    };
    update = Object.assign(rawUpdate,update);
    await Log.update(update, {
        where: {
            id: id
        }
    });
}

exports.deleteLog = async (id) => {
    await Log.destroy({
        where: {
            id: id
        }
    });
}
