# frozen_string_literal: true

require 'googleauth'

module Api
  module V1
    # Google認証用コントローラー
    class GoogleAuthController < DeviseTokenAuth::ApplicationController
      def sign_in
        user_data =
          Google::Auth::IDTokens.verify_oidc(
            params[:id_token],
            aud: '3463389808-908bqc6ofbc7eu9lrs14k3sni46akauu.apps.googleusercontent.com'
          )

        @user = User.find_or_initialize_by(provider: 'google', email: user_data['email'])
        @user.assign_attributes(uid: user_data['email'], name: user_data['name'], image: user_data['picture'])

        @token = @user.create_token
        auth_header = @user.update_auth_headers(@token.token, @token.client)
        response.headers.merge!(auth_header)

        render json: { data: @user.as_json(only: %i[id provider uid name image email created_at updated_at]) }
      rescue StandardError => e
        render json: { error: "Google 認証エラー: #{e}" }, status: :unprocessable_entity
      end
    end
  end
end
