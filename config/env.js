let env = name => process.env[name];

module.exports = {

  mongodb: env('TECHPARTY_MONGODB'),

  node_env: env('NODE_ENV'),

  new_relic_license_key: env('NEW_RELIC_LICENSE_KEY'),

  email_name: env('TECHPARTY_EMAIL_NAME'),

  email_user: env('TECHPARTY_EMAIL_USER'),

  email_password: env('TECHPARTY_EMAIL_PASSWORD'),

};
