// https://github.com/sequelize/sequelize
// https://blog.csdn.net/zjw0742/article/details/76861013
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const operatorsAliases = {
    $eq: Op.eq,
    $ne: Op.ne,
    $gte: Op.gte,
    $gt: Op.gt,
    $lte: Op.lte,
    $lt: Op.lt,
    $not: Op.not,
    $in: Op.in,
    $notIn: Op.notIn,
    $is: Op.is,
    $like: Op.like,
    $notLike: Op.notLike,
    $iLike: Op.iLike,
    $notILike: Op.notILike,
    $regexp: Op.regexp,
    $notRegexp: Op.notRegexp,
    $iRegexp: Op.iRegexp,
    $notIRegexp: Op.notIRegexp,
    $between: Op.between,
    $notBetween: Op.notBetween,
    $overlap: Op.overlap,
    $contains: Op.contains,
    $contained: Op.contained,
    $adjacent: Op.adjacent,
    $strictLeft: Op.strictLeft,
    $strictRight: Op.strictRight,
    $noExtendRight: Op.noExtendRight,
    $noExtendLeft: Op.noExtendLeft,
    $and: Op.and,
    $or: Op.or,
    $any: Op.any,
    $all: Op.all,
    $values: Op.values,
    $col: Op.col
};

// 连接数据库
const mysql = new Sequelize('database', 'user', 'password', {
    host: '127.0.0.1',
    port: '3306',
    dialect: 'mysql', //数据库类型
    pool: {           //数据库连接池
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    // 禁止强制创建表
    sync: {
        force: false
    },
    // 设置时区
    timezone: '+08:00',
    operatorsAliases: operatorsAliases,
    define: {
        // 不添加时间戳属性 (updatedAt, createdAt)
        timestamps: false,
        // 禁用修改表名; 默认情况下，sequelize将自动将所有传递的模型名称（define的第一个参数）转换为复数。
        freezeTableName: true
    },
    logging(...args) {
        // if benchmark enabled, log used
        const used = typeof args[1] === 'number' ? `[${args[1]}ms]` : '';
        console.info('[egg-sequelize]%s %s', used, args[0]);
    },
});

mysql.authenticate().then(() => {
    console.log('数据库连接成功，可以使用');
}).catch(err => {
    console.error('数据库连接失败:', err);
});

// 创建模型
const user = mysql.define('user', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'name'
    },
    gradeId : {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'grade_id'
    }
});

const grade = {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'name'
    },
}

//创建数据库
Sequelize.createSchema('schema', {}).then(rs => {

}).catch(err => {

});

// Sequelize.INTEGER   // 数值
// Sequelize.STRING    // 字符串

// 单个查询
user.find({where: {id: 1}});

// 过滤查询
user.findAll({where: {name: '1'}});

// 查询总数
user.count({
    where: {
        name: '1',
        type: {$in: [1]}
    }
});

// 修改
user.update({name: '2'}, {where: {id: 1}});

// 新建
user.create({name: 3});

// 一对多
// DataSource.belongsTo(User, {foreignKey: 'user_id'})

//　多对一
// DataSource.hasMany(DataGroup, {foreignKey: 'source_id', as: 'dataSources'})
