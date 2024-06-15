const Community = require('./community.model')
const User = require('./user.model')
const Project = require('./project.model')
const Loan = require('./loan.model')

User.belongsTo(Community, {
    foreignKey: 'communityId',
    targetKey: 'id',
    as: 'community',
});
Community.hasMany(User, { foreignKey: 'communityId', as: 'users' });

Project.hasMany(Loan, { foreignKey: 'projectId' });
Loan.belongsTo(Project, { foreignKey: 'projectId' });

User.hasOne(Loan, { foreignKey: 'userId' });
Loan.belongsTo(User, { foreignKey: 'userId' });


module.exports = {
    Community,
    User,
    Project,
    Loan,
};