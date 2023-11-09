# frozen_string_literal: true

# Purpose: To handle the logic for the users controller.
module Api
  module V1
    # users
    class UsersController < ApplicationController
      before_action :authenticate_api_v1_user!

      # GET /users
      def index
        @users = User.all
        render json: @users.as_json(only: %i[id provider uid name image email updated_at created_at])
      end
    end
  end
end
