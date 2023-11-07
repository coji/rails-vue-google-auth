require 'googleauth'

class GoogleAuthController < DeviseTokenAuth::ApplicationController
  def google_auth
    # Googleのトークン検証

    user_data =
      begin
        Google::Auth::IDTokens.verify_oidc params[:id_token], aud: '3463389808-908bqc6ofbc7eu9lrs14k3sni46akauu.apps.googleusercontent.com'
      rescue => e
        logger.error e
        nil      
      end

    if user_data
      @user = User.find_or_initialize_by(provider: 'google', email: user_data['email'])
      @user.provider = 'google'
      @user.email = user_data['email']
      @user.uid = user_data['email']
      @user.name = user_data['name']
      @user.image= user_data['picture']
      @user.save

      # devise_token_authのトークンを生成
      @token = @user.create_token

      auth_header = @user.build_auth_headers(@token.token, @token.client)
      response.headers.merge!(auth_header)
      ### FIXME!!! ここでちゃんと client, access-token, uid 返してるのにそれつかって認証するとエラーになる。なんで〜

      # ユーザー情報とトークンをクライアントに送信
      render json: {
        data: @resource.as_json(except: [
          :tokens, :created_at, :updated_at
        ]),
      }
    else
      render json: { error: 'Google 認証エラー' }, status: :unprocessable_entity
    end
  end
end
