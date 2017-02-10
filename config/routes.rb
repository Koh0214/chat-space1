Rails.application.routes.draw do
  devise_for :users, defaults: { format: "json" }
  root 'groups#index', defaults: { format: "json" }
  resources :groups, only: [:new, :create, :edit, :update] do
    resources :messages, only: [:index, :create], defaults: { format: "json" }
  end
  resources :users, only: :index
end
