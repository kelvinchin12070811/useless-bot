# frozen_string_literal: true

# ======================================================================================================================
# This is a sample of environment variables configuration for development environment. To start the task, an env.rb
# file should be placed in the root of the project. A sample is located at the end of this file.
# ======================================================================================================================

ENV['BOT_TOKEN'] = '' # Discord bot API token, can get one from the discord development portal.
ENV['API_USERNAME'] = '' # Admin username of PocketBase.
ENV['API_PASSWORD'] = '' # Admin password of PocketBase.
ENV['DB_URL'] = 'http://localhost:8090' # PocketBase host URL, do not add trailing '/'.
ENV['TOKEN_EXPIRED_DURATION'] = '1209600' # Duration of the PocketBase barrier token expired. This is default value for

# ======================================================================================================================
# # Sample of environment variables configuration for development environment. This example using replacement apporach.
#
# require_relative('./env.sample')
#
# ENV['BOT_TOKEN'] = 'some token'
# ENV['API_USERNAME'] = 'test@tester.org'
# ENV['API_PASSWORD'] = 'password'
# ======================================================================================================================
