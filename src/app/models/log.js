module.exports = (sequelize, type) => {
    return sequelize.define('log', {
        logType: type.STRING,
        logId: type.STRING,
        releaseType: type.STRING,
        date: type.STRING,
        hour: type.STRING,
        numEmpl: type.STRING,
        nameEmpl: type.STRING,
        provider: type.STRING,
        district: type.STRING,
        address: type.STRING,
        coordinates: type.STRING,
        cluster: type.STRING,
        olt: type.STRING,
        bw1: type.INTEGER,
        clients1: type.INTEGER,
        f1: type.INTEGER,
        s1: type.INTEGER,
        p1: type.INTEGER,
        ports1: type.INTEGER,
        alarm1_1: type.STRING,
        alarm1_1_st: type.STRING,
        alarm1_2: type.STRING,
        alarm1_2_st: type.STRING,
        alarm1_3: type.STRING,
        alarm1_3_st: type.STRING,
        alarm1_4: type.STRING,
        alarm1_4_st: type.STRING,
        alarm1_5: type.STRING,
        alarm1_5_st: type.STRING,
        alarm1_6: type.STRING,
        alarm1_6_st: type.STRING,
        alarm1_7: type.STRING,
        alarm1_6_st: type.STRING,
        alarm1_8: type.STRING,
        alarm1_8_st: type.STRING,
        alarm1_9: type.STRING,
        alarm1_9_st: type.STRING,
        alarm1_10: type.STRING,
        alarm1_10_st: type.STRING,
        account1_1: type.STRING,
        account1_1_st: type.STRING,
        account1_2: type.STRING,
        account1_2_st: type.STRING,
        account1_3: type.STRING,
        account1_3_st: type.STRING,
        account1_4: type.STRING,
        account1_4_st: type.STRING,
        account1_5: type.STRING,
        account1_5_st: type.STRING,
        account1_6: type.STRING,
        account1_6_st: type.STRING,
        account1_7: type.STRING,
        account1_7_st: type.STRING,
        account1_8: type.STRING,
        account1_8_st: type.STRING,
        account1_9: type.STRING,
        account1_9_st: type.STRING,
        account1_10: type.STRING,
        account1_10_st: type.STRING,
        account1_11: type.STRING,
        account1_11_st: type.STRING,
        account1_12: type.STRING,
        account1_12_st: type.STRING,
        account1_13: type.STRING,
        account1_13_st: type.STRING,
        account1_14: type.STRING,
        account1_14_st: type.STRING,
        account1_15: type.STRING,
        account1_15_st: type.STRING,
        account1_16: type.STRING,
        account1_16_st: type.STRING,
        bw2: type.INTEGER,
        clients2: type.INTEGER,
        f2: type.INTEGER,
        s2: type.INTEGER,
        p2: type.INTEGER,
        ports2: type.INTEGER,
        alarm2_1: type.STRING,
        alarm2_1_st: type.STRING,
        alarm2_2: type.STRING,
        alarm2_2_st: type.STRING,
        alarm2_3: type.STRING,
        alarm2_3_st: type.STRING,
        alarm2_4: type.STRING,
        alarm2_4_st: type.STRING,
        alarm2_5: type.STRING,
        alarm2_5_st: type.STRING,
        alarm2_6: type.STRING,
        alarm2_6_st: type.STRING,
        alarm2_7: type.STRING,
        alarm2_7_st: type.STRING,
        alarm2_8: type.STRING,
        alarm2_8_st: type.STRING,
        alarm2_9: type.STRING,
        alarm2_9_st: type.STRING,
        alarm2_10: type.STRING,
        alarm2_10_st: type.STRING,    
        account2_1: type.STRING,
        account2_1_st: type.STRING,
        account2_2: type.STRING,
        account2_2_st: type.STRING,
        account2_3: type.STRING,
        account2_3_st: type.STRING,
        account2_4: type.STRING,
        account2_4_st: type.STRING,
        account2_5: type.STRING,
        account2_5_st: type.STRING,
        account2_6: type.STRING,
        account2_6_st: type.STRING,
        account2_7: type.STRING,
        account2_7_st: type.STRING,
        account2_8: type.STRING,
        account2_8_st: type.STRING,
        account2_9: type.STRING,
        account2_9_st: type.STRING,
        account2_10: type.STRING,
        account2_10_st: type.STRING,
        account2_11: type.STRING,
        account2_11_st: type.STRING,
        account2_12: type.STRING,
        account2_12_st: type.STRING,
        account2_13: type.STRING,
        account2_13_st: type.STRING,
        account2_14: type.STRING,
        account2_14_st: type.STRING,
        account2_15: type.STRING,
        account2_15_st: type.STRING,
        account2_16: type.STRING,
        account2_16_st: type.STRING,
        comments: type.TEXT,
    });
}