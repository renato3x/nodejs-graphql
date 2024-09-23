const knex = require('../../config/db')

module.exports = {
  async profiles(user) {
    return await knex('users')
      .join('users_profiles', 'users.id', '=', 'users_profiles.userId')
      .join('profiles', 'users_profiles.profileId', '=', 'profiles.id')
      .select('*')
      .where('users.id', user.id);
  },
  createdAt(user) {
    return user.createdAt.toString();
  }
}