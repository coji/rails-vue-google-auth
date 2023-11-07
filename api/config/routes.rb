Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"


  devise_for :users
  devise_scope :user do
    post 'google_auth', to: 'google_auth#google_auth'
  end

  namespace :api do
    namespace :v1 do
      mount_devise_token_auth_for 'User', at: 'auth'
      resources :posts
    end
  end
end
