Rails.application.routes.draw do
  # google 認証用のルーティング
  devise_for :users, skip: :all
  devise_scope :user do
    post 'api/v1/auth/google/sign_in', to: 'api/v1/google_auth#google_auth'
  end

  namespace :api do
    namespace :v1 do
      # 通常の devise_token_auth のルーティング
      mount_devise_token_auth_for 'User', at: 'auth'

      # 認証が必要なルーティング
      resources :posts
    end
  end
end
