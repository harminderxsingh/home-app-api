const Community = require('./community.model')
const User = require('./user.model')

User.belongsTo(Community, {
    foreignKey: 'communityId',
    targetKey: 'id',
    as: 'community',
});
Community.hasMany(User, { foreignKey: 'communityId', as: 'users' });


module.exports = {
    Community,
    User,
};