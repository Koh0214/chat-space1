Rails.application.routes.draw do
  devise_for :users, defaults: { format: "html" }
  root 'groups#index', defaults: { format: "html" }
  resources :groups, only: [:new, :create, :edit, :update] do
    resources :messages, only: [:index, :create], defaults: { format: "html" }
  end
  resources :users, only: :index
end
