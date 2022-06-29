const { pool } = require('../index');

const get = function (user_id) {
  const getUsersGames = `
  select((
    select json_build_object(
      'id', $1,
      'steam_appid', g.steam_appid,
      'name', g.name,
      'developers', g.developers,
      'publishers', g.publishers,
      'short_description', g.short_description,
      'header_image', g.header_image,
      'release_date', g.release_date,
      'website', g.website,
      'required_age', g.required_age
    )from games g where g.id = gu.game_id
  ))from  game_user gu where gu.user_id = $1
`;
pool.query(getUsersGames, user_id)
}

const post = function (game_id, body) {
  const addGamesToCol = `
  insert into
  game_user (game_id, user_id, status, review, rating)
  values($1, $2, $3, $4, $5)
`;
}

const putStatus = function (body) {
  const changeStatus = `
  update game_user
  set status = $1
  where game_id = $2 and user_id = $3
`;
}

const putRatings = function (body) {
  const editRatingReview = `
  update game_user
  set
    rating = $1,
    review = $2
  where game_id = $3 and user_id = $4
`;
}

const deleteGame = function (body) {
  const removeGameFromCol = `
  delete from game_user where user_id = $1 and game_id = $2
`;
}

module.exports = {
  get: get,
  post: post,
  putStatus: putStatus,
  putRatings: putRatings,
  deleteGame: deleteGame
}